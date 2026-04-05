import { getConfig, getMetadata } from '../../scripts/ak.js';
import { loadFragment } from '../fragment/fragment.js';

const { locale } = getConfig();

const HEADER_PATH = '/fragments/nav/header';

const DEFAULT_NAV = [
  {
    label: 'Products',
    href: '/en_US/products.html',
    megaMenu: [
      {
        label: 'Equipment',
        href: '/en_US/products/new/equipment.html',
        links: [
          { label: 'All Equipment', href: '/en_US/products/new/equipment.html' },
          { label: 'Articulated Trucks', href: '/en_US/products/new/equipment/articulated-trucks.html' },
          { label: 'Asphalt Pavers', href: '/en_US/products/new/equipment/asphalt-pavers.html' },
          { label: 'Backhoe Loaders', href: '/en_US/products/new/equipment/backhoe-loaders.html' },
          { label: 'Cold Planers', href: '/en_US/products/new/equipment/cold-planers.html' },
          { label: 'Compactors', href: '/en_US/products/new/equipment/compactors.html' },
          { label: 'Dozers', href: '/en_US/products/new/equipment/dozers.html' },
          { label: 'Draglines', href: '/en_US/products/new/equipment/draglines.html' },
          { label: 'Electric Rope Shovels', href: '/en_US/products/new/equipment/electric-rope-shovels.html' },
          { label: 'Excavators', href: '/en_US/products/new/equipment/excavators.html' },
          { label: 'Forest Machines', href: '/en_US/products/new/equipment/forest-machines.html' },
          { label: 'Hydraulic Mining Shovels', href: '/en_US/products/new/equipment/hydraulic-mining-shovels.html' },
          { label: 'Industrial Loaders', href: '/en_US/products/new/equipment/industrial-loaders.html' },
          { label: 'Material Handlers', href: '/en_US/products/new/equipment/material-handlers.html' },
          { label: 'Motor Graders', href: '/en_US/products/new/equipment/motor-graders.html' },
          { label: 'Off-Highway Trucks', href: '/en_US/products/new/equipment/off-highway-trucks.html' },
          { label: 'Pipelayers', href: '/en_US/products/new/equipment/pipelayers.html' },
          { label: 'Road Reclaimers', href: '/en_US/products/new/equipment/road-reclaimers.html' },
          { label: 'Skid Steer & Compact Track Loaders', href: '/en_US/products/new/equipment/skid-steer-loaders.html' },
          { label: 'Telehandlers', href: '/en_US/products/new/equipment/telehandlers.html' },
          { label: 'Track Loaders', href: '/en_US/products/new/equipment/track-loaders.html' },
          { label: 'Underground - Hard Rock', href: '/en_US/products/new/equipment/underground-hard-rock.html' },
          { label: 'Wheel Loaders', href: '/en_US/products/new/equipment/wheel-loaders.html' },
          { label: 'Used Equipment', href: '/en_US/used-equipment.html' },
          { label: 'Rental Equipment', href: '/en_US/rental-equipment.html' },
          { label: 'Technology', href: '/en_US/support/technology.html' },
        ],
      },
      {
        label: 'Power Systems',
        href: '/en_US/products/new/power-systems.html',
        links: [
          { label: 'All Power Systems', href: '/en_US/products/new/power-systems.html' },
          { label: 'Electric Power', href: '/en_US/products/new/power-systems/electric-power.html' },
          { label: 'Gas & Diesel Gensets', href: '/en_US/products/new/power-systems/generator-sets.html' },
          { label: 'Industrial Diesel & Gas Engines', href: '/en_US/products/new/power-systems/industrial-diesel-gas-engines.html' },
          { label: 'Marine', href: '/en_US/products/new/power-systems/marine.html' },
          { label: 'Oil & Gas', href: '/en_US/products/new/power-systems/oil-gas.html' },
          { label: 'Rail', href: '/en_US/products/new/power-systems/rail.html' },
          { label: 'Truck Engines', href: '/en_US/products/new/power-systems/truck-engines.html' },
        ],
      },
      {
        label: 'Attachments',
        href: '/en_US/products/new/attachments.html',
        links: [
          { label: 'All Attachments', href: '/en_US/products/new/attachments.html' },
          { label: 'Backhoe Buckets', href: '/en_US/products/new/attachments/backhoe-buckets.html' },
          { label: 'Compaction Plates', href: '/en_US/products/new/attachments/compaction.html' },
          { label: 'Couplers', href: '/en_US/products/new/attachments/couplers.html' },
          { label: 'Forks & Pallet Forks', href: '/en_US/products/new/attachments/forks.html' },
          { label: 'Grapples', href: '/en_US/products/new/attachments/grapples.html' },
          { label: 'Hammers', href: '/en_US/products/new/attachments/hammers.html' },
          { label: 'Loader Buckets', href: '/en_US/products/new/attachments/loader-buckets.html' },
          { label: 'Rippers', href: '/en_US/products/new/attachments/rippers.html' },
          { label: 'Thumbs', href: '/en_US/products/new/attachments/thumbs.html' },
        ],
      },
      {
        label: 'Parts',
        href: '/en_US/products/new/parts.html',
        links: [
          { label: 'All Parts', href: '/en_US/products/new/parts.html' },
          { label: 'New Cat Parts', href: '/en_US/support/maintenance/cat-parts/new-cat-parts.html' },
          { label: 'Cat Reman', href: '/en_US/support/maintenance/cat-parts/cat-reman.html' },
          { label: 'Maintenance & Repair Parts', href: '/en_US/support/maintenance/cat-parts/maintenance-repair.html' },
          { label: 'Ground Engaging Tools', href: '/en_US/products/new/parts/ground-engaging-tools.html' },
          { label: 'Filters & Fluids', href: '/en_US/support/maintenance/cat-parts/filters-fluids.html' },
          { label: 'CAT Merchandise', href: '/en_US/merchandise.html' },
        ],
      },
    ],
  },
  {
    label: 'Industries',
    href: '/en_US/by-industry.html',
    megaMenu: [
      {
        label: 'Construction',
        href: '/en_US/by-industry/construction.html',
        links: [
          { label: 'Building Construction', href: '/en_US/by-industry/building-construction.html' },
          { label: 'General Construction', href: '/en_US/by-industry/general-construction.html' },
          { label: 'Heavy Construction', href: '/en_US/by-industry/heavy-construction.html' },
          { label: 'Road Building', href: '/en_US/by-industry/road-building.html' },
          { label: 'Tunneling', href: '/en_US/by-industry/tunneling.html' },
        ],
      },
      {
        label: 'Mining',
        href: '/en_US/by-industry/mining.html',
        links: [
          { label: 'Coal Mining', href: '/en_US/by-industry/coal.html' },
          { label: 'Hard Rock Mining', href: '/en_US/by-industry/hard-rock-mining.html' },
          { label: 'Oil Sands', href: '/en_US/by-industry/oil-sands.html' },
          { label: 'Quarry & Aggregates', href: '/en_US/by-industry/quarry-aggregates.html' },
        ],
      },
      {
        label: 'Energy & Transportation',
        href: '/en_US/by-industry/energy-transportation.html',
        links: [
          { label: 'Electric Power', href: '/en_US/by-industry/electric-power.html' },
          { label: 'Marine', href: '/en_US/by-industry/marine.html' },
          { label: 'Oil & Gas', href: '/en_US/by-industry/oil-and-gas.html' },
          { label: 'Rail', href: '/en_US/by-industry/rail.html' },
        ],
      },
      {
        label: 'Other Industries',
        href: '/en_US/by-industry.html',
        links: [
          { label: 'Agriculture', href: '/en_US/by-industry/agriculture.html' },
          { label: 'Forestry', href: '/en_US/by-industry/forestry.html' },
          { label: 'Government', href: '/en_US/by-industry/government.html' },
          { label: 'Landscaping', href: '/en_US/by-industry/landscaping.html' },
          { label: 'Paving', href: '/en_US/by-industry/paving.html' },
          { label: 'Waste', href: '/en_US/by-industry/waste.html' },
        ],
      },
    ],
  },
  {
    label: 'Services & Support',
    href: '/en_US/support.html',
    megaMenu: [
      {
        label: 'Financial',
        href: '/en_US/support/financing.html',
        links: [
          { label: 'Cat Financial', href: '/en_US/support/financing.html' },
          { label: 'Extended Protection', href: '/en_US/support/maintenance/extended-protection.html' },
          { label: 'Parts & Service Agreements', href: '/en_US/support/maintenance/parts-service-agreements.html' },
        ],
      },
      {
        label: 'Maintenance',
        href: '/en_US/support/maintenance.html',
        links: [
          { label: 'Maintenance & Repairs', href: '/en_US/support/maintenance.html' },
          { label: 'Rebuilds & Upgrades', href: '/en_US/support/maintenance/rebuilds-upgrades.html' },
          { label: 'Machine Monitoring', href: '/en_US/support/technology/machine-monitoring.html' },
          { label: 'Filters & Fluids', href: '/en_US/support/maintenance/cat-parts/filters-fluids.html' },
        ],
      },
      {
        label: 'Expert Solutions',
        href: '/en_US/support/consulting.html',
        links: [
          { label: 'Consulting & Expert Solutions', href: '/en_US/support/consulting.html' },
          { label: 'Technology Solutions', href: '/en_US/support/technology.html' },
          { label: 'Safety Solutions', href: '/en_US/support/safety.html' },
        ],
      },
      {
        label: 'Training',
        href: '/en_US/support/training.html',
        links: [
          { label: 'Cat Training', href: '/en_US/support/training.html' },
          { label: 'Operator Training', href: '/en_US/support/training/operator-training.html' },
          { label: 'Service Technician Training', href: '/en_US/support/training/service-technician.html' },
          { label: 'Safety Training', href: '/en_US/support/training/safety.html' },
        ],
      },
    ],
  },
  {
    label: 'Parts',
    href: '/en_US/products/new/parts.html',
    megaMenu: [
      {
        label: 'Buy Parts',
        href: '/en_US/products/new/parts.html',
        links: [
          { label: 'All Parts', href: '/en_US/products/new/parts.html' },
          { label: 'New Cat Parts', href: '/en_US/support/maintenance/cat-parts/new-cat-parts.html' },
          { label: 'Cat Reman', href: '/en_US/support/maintenance/cat-parts/cat-reman.html' },
          { label: 'Ground Engaging Tools', href: '/en_US/products/new/parts/ground-engaging-tools.html' },
          { label: 'Filters & Fluids', href: '/en_US/support/maintenance/cat-parts/filters-fluids.html' },
          { label: 'Undercarriage', href: '/en_US/products/new/parts/undercarriage.html' },
        ],
      },
      {
        label: 'Equipment',
        href: '/en_US/used-equipment.html',
        links: [
          { label: 'Used Equipment', href: '/en_US/used-equipment.html' },
          { label: 'Rental Equipment', href: '/en_US/rental-equipment.html' },
        ],
      },
      {
        label: 'Support',
        href: '/en_US/support/maintenance.html',
        links: [
          { label: 'Maintenance & Repair', href: '/en_US/support/maintenance.html' },
          { label: 'Parts & Service Agreements', href: '/en_US/support/maintenance/parts-service-agreements.html' },
          { label: 'Find a Dealer', href: '/en_US/dealer-locator.html' },
        ],
      },
    ],
  },
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

function buildLocator(header) {
  const wrap = document.createElement('div');
  wrap.className = 'header-action header-locator';

  const btn = document.createElement('button');
  btn.setAttribute('aria-label', 'Find a Dealer');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
    <span>Dealer Locator</span>`;

  const flyout = document.createElement('div');
  flyout.className = 'header-locator-flyout';
  flyout.setAttribute('aria-hidden', 'true');

  const flyoutInner = document.createElement('div');
  flyoutInner.className = 'header-locator-flyout-inner';
  flyout.append(flyoutInner);

  wrap.append(btn, flyout);

  let loaded = false;
  const { codeBase } = getConfig();

  btn.addEventListener('click', () => {
    const isOpen = wrap.classList.contains('is-open');
    // Close all other menus
    header.querySelectorAll('.is-open').forEach((el) => {
      if (el !== wrap) el.classList.remove('is-open');
    });
    wrap.classList.toggle('is-open', !isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));
    flyout.setAttribute('aria-hidden', String(isOpen));

    if (!isOpen && !loaded) {
      loaded = true;
      const script = document.createElement('script');
      script.src = `${codeBase}/deps/cat-dealer-locator.js`;
      script.onload = () => {
        if (window.CATDealerLocator) {
          window.CATDealerLocator.mount(flyoutInner, {
            onDealerSelect: (dealer) => {
              wrap.classList.remove('is-open');
              btn.setAttribute('aria-expanded', 'false');
              flyout.setAttribute('aria-hidden', 'true');
            },
          });
        }
      };
      document.head.append(script);
    }
  });

  return wrap;
}

function buildSignIn(header) {
  const wrap = document.createElement('div');
  wrap.className = 'header-action header-signin';

  const btn = document.createElement('button');
  btn.setAttribute('aria-label', 'Sign In');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
    <span>Sign In</span>`;

  const flyout = document.createElement('div');
  flyout.className = 'header-signin-flyout';
  flyout.setAttribute('aria-hidden', 'true');

  const flyoutInner = document.createElement('div');
  flyoutInner.className = 'header-signin-flyout-inner';
  flyout.append(flyoutInner);

  wrap.append(btn, flyout);

  let loaded = false;
  const { codeBase } = getConfig();

  btn.addEventListener('click', () => {
    const isOpen = wrap.classList.contains('is-open');
    header.querySelectorAll('.is-open').forEach((el) => {
      if (el !== wrap) el.classList.remove('is-open');
    });
    wrap.classList.toggle('is-open', !isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));
    flyout.setAttribute('aria-hidden', String(isOpen));

    if (!isOpen && !loaded) {
      loaded = true;
      const script = document.createElement('script');
      script.src = `${codeBase}/deps/cat-account.js`;
      script.onload = () => {
        if (window.CATAccount) {
          window.CATAccount.mount(flyoutInner, {
            user: null,
            onLogin: async (creds) => {
              // Placeholder — wire to real auth if available
              console.log('Login attempted', creds);
            },
            onLogout: () => {
              console.log('Logged out');
            },
          });
        }
      };
      document.head.append(script);
    }
  });

  return wrap;
}

function buildGlobalMenuBtn() {
  const btn = document.createElement('button');
  btn.className = 'header-action header-global-menu-btn';
  btn.setAttribute('aria-label', 'Open global menu');
  btn.innerHTML = `
    <span></span>
    <span></span>
    <span></span>`;

  const { codeBase } = getConfig();
  let menuInstance = null;

  btn.addEventListener('click', () => {
    if (menuInstance) {
      menuInstance.toggle();
      return;
    }
    const script = document.createElement('script');
    script.src = `${codeBase}/deps/cat-global-menu.js`;
    script.onload = () => {
      if (window.CATGlobalMenu) {
        menuInstance = window.CATGlobalMenu.mount({
          onClose: () => btn.setAttribute('aria-expanded', 'false'),
        });
        menuInstance.open();
        btn.setAttribute('aria-expanded', 'true');
      }
    };
    document.head.append(script);
  });

  return btn;
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

function buildMegaMenu(sections) {
  const mega = document.createElement('div');
  mega.className = 'nav-mega';
  mega.setAttribute('aria-hidden', 'true');

  const inner = document.createElement('div');
  inner.className = 'nav-mega-inner';

  const sidebar = document.createElement('ul');
  sidebar.className = 'nav-mega-sidebar';

  const panelsWrap = document.createElement('div');
  panelsWrap.className = 'nav-mega-panels';

  sections.forEach((section, idx) => {
    const sideItem = document.createElement('li');
    if (idx === 0) sideItem.classList.add('is-active');

    const sideLink = document.createElement('a');
    sideLink.href = section.href || '#';
    sideLink.textContent = section.label;
    sideLink.addEventListener('click', (e) => e.preventDefault());
    sideItem.append(sideLink);
    sidebar.append(sideItem);

    const panel = document.createElement('div');
    panel.className = 'nav-mega-panel';
    if (idx === 0) panel.classList.add('is-active');

    const ul = document.createElement('ul');
    (section.links || []).forEach((link) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = link.href || '#';
      a.textContent = link.label;
      li.append(a);
      ul.append(li);
    });
    panel.append(ul);
    panelsWrap.append(panel);

    sideItem.addEventListener('mouseenter', () => {
      sidebar.querySelectorAll('li').forEach((el) => el.classList.remove('is-active'));
      panelsWrap.querySelectorAll('.nav-mega-panel').forEach((el) => el.classList.remove('is-active'));
      sideItem.classList.add('is-active');
      panel.classList.add('is-active');
    });
  });

  inner.append(sidebar, panelsWrap);
  mega.append(inner);
  return mega;
}

function buildNavItem(item, header) {
  const li = document.createElement('li');
  li.className = 'nav-item';

  const a = document.createElement('a');
  a.className = 'nav-link';
  a.href = item.href || '#';
  a.textContent = item.label;

  if (item.megaMenu?.length) {
    a.setAttribute('aria-haspopup', 'true');
    a.setAttribute('aria-expanded', 'false');

    const mega = buildMegaMenu(item.megaMenu);
    li.append(a, mega);

    a.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = li.classList.contains('is-open');
      closeAllMenus(header);
      if (!isOpen) {
        li.classList.add('is-open');
        a.setAttribute('aria-expanded', 'true');
        mega.setAttribute('aria-hidden', 'false');
      } else {
        a.setAttribute('aria-expanded', 'false');
        mega.setAttribute('aria-hidden', 'true');
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
  tools.append(buildSearch(), buildLocator(el), buildSignIn(el), buildGlobalMenuBtn(), buildHamburger(el));

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
