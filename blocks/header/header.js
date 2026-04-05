import { getConfig, getMetadata } from '../../scripts/ak.js';
import { loadFragment } from '../fragment/fragment.js';

const { locale } = getConfig();

const HEADER_PATH = '/fragments/nav/header';

const DEFAULT_NAV = [
  { label: 'Products', href: '/en_US/products/new/equipment.html' },
  { label: 'Industries', href: '/en_US/by-industry.html' },
  { label: 'Services & Support', href: '/en_US/support.html' },
  { label: 'Parts', href: '/en_US/products/new/parts.html' },
];

/* ------------------------------------------------------------------ */
/* Menu open/close helpers */
/* ------------------------------------------------------------------ */

function closeAllMenus(header) {
  header.querySelectorAll('.is-open').forEach((el) => el.classList.remove('is-open'));
}

function toggleMenu(el, header) {
  const isOpen = el.classList.contains('is-open');
  closeAllMenus(header);
  if (!isOpen) el.classList.add('is-open');
}

/* ------------------------------------------------------------------ */
/* Search */
/* ------------------------------------------------------------------ */

function buildSearch() {
  const wrap = document.createElement('div');
  wrap.className = 'header-search';

  wrap.innerHTML = `
    <button class="header-search-toggle" aria-label="Search" aria-expanded="false">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    </button>
    <form class="header-search-form" action="/search" method="get" role="search">
      <input type="search" name="q" placeholder="Search Cat.com" autocomplete="off" aria-label="Search">
      <button type="submit" aria-label="Submit search">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </button>
    </form>`;

  const toggle = wrap.querySelector('.header-search-toggle');
  const form = wrap.querySelector('.header-search-form');
  const input = wrap.querySelector('input');

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    wrap.classList.toggle('is-open', !expanded);
    if (!expanded) setTimeout(() => input.focus(), 50);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      wrap.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  return wrap;
}

/* ------------------------------------------------------------------ */
/* Top-row actions: Locator, Sign In, Hamburger */
/* ------------------------------------------------------------------ */

function buildLocator() {
  const a = document.createElement('a');
  a.className = 'header-action header-locator';
  a.href = '/en_US/dealer-locator.html';
  a.setAttribute('aria-label', 'Find a Dealer');
  a.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
    <span>Dealer Locator</span>`;
  return a;
}

function buildSignIn() {
  const a = document.createElement('a');
  a.className = 'header-action header-signin';
  a.href = 'https://www.cat.com/en_US/cat-login.html';
  a.setAttribute('aria-label', 'Sign In');
  a.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
    <span>Sign In</span>`;
  return a;
}

function buildHamburger(header) {
  const btn = document.createElement('button');
  btn.className = 'header-action header-hamburger';
  btn.setAttribute('aria-label', 'Open navigation menu');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = `
    <span></span>
    <span></span>
    <span></span>`;

  btn.addEventListener('click', () => {
    const isOpen = header.classList.toggle('nav-open');
    btn.setAttribute('aria-expanded', String(isOpen));
    btn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });

  return btn;
}

/* ------------------------------------------------------------------ */
/* Nav row */
/* ------------------------------------------------------------------ */

function buildNavItem(item, header) {
  const li = document.createElement('li');
  li.className = 'nav-item';

  const a = document.createElement('a');
  a.className = 'nav-link';
  a.href = item.href || '#';
  a.textContent = item.label;

  if (item.children?.length) {
    a.setAttribute('aria-haspopup', 'true');
    a.setAttribute('aria-expanded', 'false');

    const dropdown = document.createElement('ul');
    dropdown.className = 'nav-dropdown';
    item.children.forEach((child) => {
      const childLi = document.createElement('li');
      const childA = document.createElement('a');
      childA.href = child.href || '#';
      childA.textContent = child.label;
      childLi.append(childA);
      dropdown.append(childLi);
    });

    li.append(a, dropdown);

    a.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = li.classList.contains('is-open');
      closeAllMenus(header);
      if (!isOpen) {
        li.classList.add('is-open');
        a.setAttribute('aria-expanded', 'true');
      } else {
        a.setAttribute('aria-expanded', 'false');
      }
    });
  } else {
    li.append(a);
  }

  return li;
}

function buildNav(items, header) {
  const nav = document.createElement('nav');
  nav.className = 'header-nav';
  nav.setAttribute('aria-label', 'Main navigation');

  const ul = document.createElement('ul');
  ul.className = 'nav-list';
  items.forEach((item) => ul.append(buildNavItem(item, header)));
  nav.append(ul);
  return nav;
}

/* ------------------------------------------------------------------ */
/* Extract nav items from loaded fragment */
/* ------------------------------------------------------------------ */

function extractNavFromFragment(fragment) {
  const navItems = [];
  const links = fragment.querySelectorAll('nav > ul > li, .main-nav-list > li');
  if (links.length) {
    links.forEach((li) => {
      const a = li.querySelector(':scope > p > a, :scope > a');
      if (!a) return;
      const item = { label: a.textContent.trim(), href: a.href };
      const subLinks = li.querySelectorAll('ul a');
      if (subLinks.length) {
        item.children = [...subLinks].map((sub) => ({
          label: sub.textContent.trim(),
          href: sub.href,
        }));
      }
      navItems.push(item);
    });
  }
  return navItems.length ? navItems : null;
}

/* ------------------------------------------------------------------ */
/* Assemble full header */
/* ------------------------------------------------------------------ */

function buildHeader(el, navItems) {
  el.innerHTML = '';

  /* --- Top row --- */
  const topRow = document.createElement('div');
  topRow.className = 'header-top';

  const topInner = document.createElement('div');
  topInner.className = 'header-inner';

  // Logo
  const logoLink = document.createElement('a');
  logoLink.className = 'header-logo';
  logoLink.href = '/';
  logoLink.setAttribute('aria-label', 'Caterpillar - Home');
  logoLink.innerHTML = `<img src="https://s7d2.scene7.com/is/image/Caterpillar/CM20160629-33279-63115?fmt=png-alpha" alt="CAT" width="48" height="48">`;

  // Right-side tools
  const tools = document.createElement('div');
  tools.className = 'header-tools';
  tools.append(buildSearch(), buildLocator(), buildSignIn(), buildHamburger(el));

  topInner.append(logoLink, tools);
  topRow.append(topInner);

  /* --- Nav row --- */
  const navRow = document.createElement('div');
  navRow.className = 'header-nav-row';

  const navInner = document.createElement('div');
  navInner.className = 'header-inner';
  navInner.append(buildNav(navItems, el));
  navRow.append(navInner);

  el.append(topRow, navRow);

  // Close menus on outside click
  document.addEventListener('click', (e) => {
    if (!el.contains(e.target)) closeAllMenus(el);
  });
}

/* ------------------------------------------------------------------ */
/* Init */
/* ------------------------------------------------------------------ */

export default async function init(el) {
  const headerMeta = getMetadata('header');
  if (headerMeta === 'off') {
    document.body.classList.add('no-header');
    el.remove();
    return;
  }

  const path = headerMeta || HEADER_PATH;
  let navItems = DEFAULT_NAV;

  try {
    const fragment = await loadFragment(`${locale.prefix}${path}`);
    const extracted = extractNavFromFragment(fragment);
    if (extracted) navItems = extracted;
  } catch {
    // Fragment not available — use default nav items
  }

  buildHeader(el, navItems);
}
