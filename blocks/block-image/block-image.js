/**
 * @author    infinite Team
 * @copyright Copyright(c) 2025 infinite
 * @module    block/block-image
 */

import { h, render } from '@dropins/tools/preact.js';
import htm from '../../scripts/htm.js';

const html = htm.bind(h);

const imageBlock = ({
  blockImageDesktop,
  blockImageMobile,
  blockAltImage,
  blockHref,
}) => html`
${blockHref
    ? html`
<a href="${blockHref}" aria-label="${blockAltImage}">
<picture>
  ${blockImageMobile
    ? html`
        <source type="image/webp" media="(max-width: 900px)" srcset="${blockImageMobile}" />`
    : html`
        <source type="image/webp" media="(max-width: 900px)" srcset="${blockImageDesktop.src}" />`}
  <source type="image/webp" srcset="${blockImageDesktop.src}" />
  <img loading="lazy" src="${blockImageDesktop.src}" alt="${blockAltImage}" width="${blockImageDesktop.width}" height="${blockImageDesktop.height}"/>
</picture>
</a>`
    : html`
<picture>
  ${blockImageMobile
    ? html`
        <source type="image/webp" media="(max-width: 900px)" srcset="${blockImageMobile}" />`
    : html`
        <source type="image/webp" media="(max-width: 900px)" srcset="${blockImageDesktop.src}" />`}
  <source type="image/webp" srcset="${blockImageDesktop.src}" />
  <img loading="lazy" src="${blockImageDesktop.src}" alt="${blockAltImage}" width="${blockImageDesktop.width}" height="${blockImageDesktop.height}" />
</picture>`}
`;

function isAImg(elem) {
  const image = elem.querySelector('div picture img');
  return image;
}

function getImageData(elem) {
  const img = elem.querySelector('div picture img');
  if (!img) return null;

  return {
    src: img.getAttribute('src')?.replace('format=png', 'format=webply'),
    width: img.getAttribute('width') || '',
    height: img.getAttribute('height') || '',
  };
}

function getSrcOnWebply(elem) {
  let imgSrc = elem.querySelector('div picture img').getAttribute('src');
  imgSrc = imgSrc.replace('format=png', 'format=webply');
  return imgSrc;
}

function getTextContent(el) {
  return el?.textContent?.trim().toLowerCase().replace(/,/g, ' ') || '';
}

function isAHref(elem) {
  const href = elem.querySelector('div a');
  return href;
}

function getHrefFromButton(elem) {
  const butonHref = elem.querySelector('div a').getAttribute('href');
  return butonHref;
}

export default async function decorate(block) {
  const items = Array.from(block.children);
  const blockName = getTextContent(items.shift());
  const blockImageDesktop = getImageData(items.shift());

  let blockImageMobile = null;
  let customWidth = 0;
  let customHeight = 0;
  let blockAltImage = '';
  let blockHref = null;
  let blockEnd = '';

  while (items.length) {
    const nextItem = items[0];

    if (isAImg(nextItem)) {
      blockImageMobile = getSrcOnWebply(items.shift());
    } else if (isAHref(nextItem)) {
      blockHref = getHrefFromButton(items.shift());
    } else if (getTextContent(nextItem) === 'block-image-end') {
      blockEnd = getTextContent(items.shift());
    } else if (!Number.isNaN(parseInt(getTextContent(nextItem), 10))) {
      const num = parseInt(getTextContent(items.shift()), 10);
      if (!customWidth) {
        customWidth = num;
      } else {
        customHeight = num;
      }
    } else {
      blockAltImage = getTextContent(items.shift());
    }
  }

  if (customWidth !== 0) blockImageDesktop.width = customWidth;
  if (customHeight !== 0) blockImageDesktop.height = customHeight;

  block.innerHTML = '';

  const app = html`
  <${imageBlock}
  block=${block}
  blockName=${blockName}
  blockImageDesktop=${blockImageDesktop}
  blockImageMobile=${blockImageMobile}
  blockAltImage=${blockAltImage}
  blockHref=${blockHref}
  blockEnd=${blockEnd}
  />`;

  render(app, block);
}
