export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 2) return;

  // Row 0: page title + tabs
  const headerRow = rows[0];
  const titleCell = headerRow.children[0];
  const tabsCell = headerRow.children[1];

  const header = document.createElement('div');
  header.className = 'inventory-header';

  const titleArea = document.createElement('div');
  titleArea.className = 'inventory-title-area';
  const title = document.createElement('h2');
  title.className = 'inventory-title';
  title.textContent = titleCell?.textContent?.trim() || 'Inventory';
  titleArea.append(title);

  // Tabs from comma-separated values
  const tabNav = document.createElement('div');
  tabNav.className = 'inventory-tabs';
  const tabNames = tabsCell?.textContent?.trim().split(',').map((t) => t.trim()) || ['New', 'Used', 'Rental'];
  const params = new URLSearchParams(window.location.search);
  const activeCondition = params.get('condition') || 'new';

  tabNames.forEach((name) => {
    const tab = document.createElement('a');
    tab.className = `inventory-tab${name.toLowerCase() === activeCondition ? ' active' : ''}`;
    tab.textContent = name;
    const url = new URL(window.location.href);
    url.searchParams.set('condition', name.toLowerCase());
    tab.href = url.toString();
    tabNav.append(tab);
  });

  header.append(titleArea, tabNav);

  // Row 1: subtitle + configure link
  const subtitleRow = rows[1];
  const subtitle = document.createElement('div');
  subtitle.className = 'inventory-subtitle-bar';
  const subtitleText = document.createElement('h3');
  subtitleText.className = 'inventory-subtitle';
  subtitleText.textContent = subtitleRow?.children[0]?.textContent?.trim() || '';
  subtitle.append(subtitleText);

  const configLink = subtitleRow?.children[1]?.querySelector('a');
  if (configLink) {
    configLink.className = 'inventory-configure-btn';
    subtitle.append(configLink);
  }

  // Row 2: filter sidebar content
  const filterRow = rows[2];
  const sidebar = document.createElement('aside');
  sidebar.className = 'inventory-sidebar';
  if (filterRow?.children[0]) {
    sidebar.append(...filterRow.children[0].childNodes);
  }

  // Remaining rows: product cards
  const grid = document.createElement('div');
  grid.className = 'inventory-grid';

  // Info bar
  const infoBar = document.createElement('div');
  infoBar.className = 'inventory-info-bar';
  const matchCount = rows.length - 3;
  infoBar.innerHTML = `<span>Showing ${matchCount} matches near 53703</span><span>Sort By: Distance <span class="sort-arrow">&#8964;</span></span>`;
  grid.append(infoBar);

  const cardGrid = document.createElement('div');
  cardGrid.className = 'inventory-card-grid';

  for (let i = 3; i < rows.length; i += 1) {
    const row = rows[i];
    const card = document.createElement('div');
    card.className = 'inventory-card';

    const imgCell = row.children[0];
    const dataCell = row.children[1];

    if (imgCell) {
      const imgWrap = document.createElement('div');
      imgWrap.className = 'inventory-card-image';
      imgWrap.append(...imgCell.childNodes);
      card.append(imgWrap);
    }

    if (dataCell) {
      const body = document.createElement('div');
      body.className = 'inventory-card-body';
      body.append(...dataCell.childNodes);
      card.append(body);
    }

    cardGrid.append(card);
  }

  grid.append(cardGrid);

  // Assemble layout
  const content = document.createElement('div');
  content.className = 'inventory-content';
  content.append(sidebar, grid);

  block.textContent = '';
  block.append(header, subtitle, content);
}
