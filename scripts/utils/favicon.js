import { getConfig, getMetadata } from '../ak.js';

(async function loadFavicon() {
  const { codeBase } = getConfig();
  const meta = getMetadata('favicon');
  const defaultIcon = `${codeBase}/images/dealer-cat-logo.png`;

  let iconHref;
  let appleHref;
  let manifestHref = `${codeBase}/img/favicons/favicon.webmanifest`;

  /* Plain name (no path) = multi-file bundle under /img/favicons/<name> */
  const useLegacyBundle = meta && !meta.includes('/') && !/^https?:/i.test(meta);

  if (useLegacyBundle) {
    const favBase = `${codeBase}/img/favicons/${meta}`;
    iconHref = `${favBase}.ico`;
    appleHref = `${favBase}-180.png`;
    manifestHref = `${favBase}.webmanifest`;
  } else {
    iconHref =
      /* Explicit URL or site path from metadata */
      meta && (meta.startsWith('http') || meta.startsWith('/'))
        ? (meta.startsWith('http') ? meta : `${codeBase}${meta}`)
        : defaultIcon;
    appleHref = iconHref;
  }

  const tags = `<link rel="apple-touch-icon" href="${appleHref}">
                <link rel="manifest" href="${manifestHref}">`;
  document.head.insertAdjacentHTML('beforeend', tags);

  const favicon = document.head.querySelector('link[href="data:,"]');
  if (favicon) {
    favicon.href = iconHref;
    if (iconHref.endsWith('.ico')) favicon.removeAttribute('type');
    else favicon.type = 'image/png';
  }
}());
