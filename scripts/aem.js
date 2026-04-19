/**
 * Shim to provide aem.js exports expected by the form block.
 * This project uses ak.js (AuthorKit) instead of the standard aem.js.
 */
import { loadStyle } from './ak.js';

export function loadCSS(href) {
  return loadStyle(href);
}

export function createOptimizedPicture(src, alt = '', eager = false, breakpoints = [{ media: '(min-width: 600px)', width: '2000' }, { width: '750' }]) {
  const url = new URL(src, window.location.href);
  const picture = document.createElement('picture');
  breakpoints.forEach((br) => {
    const source = document.createElement('source');
    if (br.media) source.setAttribute('media', br.media);
    source.setAttribute('type', 'image/webp');
    source.setAttribute('srcset', `${url.pathname}?width=${br.width}&format=webply&optimize=medium`);
    picture.appendChild(source);
  });
  const img = document.createElement('img');
  img.setAttribute('loading', eager ? 'eager' : 'lazy');
  img.setAttribute('alt', alt);
  img.setAttribute('src', `${url.pathname}?width=${breakpoints[breakpoints.length - 1].width}&format=png&optimize=medium`);
  picture.appendChild(img);
  return picture;
}
