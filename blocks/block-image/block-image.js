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
  <img loading="lazy" src="${blockImageDesktop.src}" alt="${blockAltImage}" />
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
  console.log(items);
  const blockName = getTextContent(items.shift());
  const blockImageDesktop = getImageData(items.shift());

  let blockImageMobile = items.shift();
  console.log(blockImageMobile);
  if (blockImageMobile && isAImg(blockImageMobile) !== null) {
    blockImageMobile = getSrcOnWebply(blockImageMobile);
  } else {
    blockImageMobile = false;
  }

  const blockAltImage = getTextContent(items.shift());

  let blockHref = items.shift();
  if (blockHref && isAHref(blockHref) !== null) {
    blockHref = getHrefFromButton(blockHref);
  } else {
    blockHref = false;
  }

  const blockEnd = getTextContent(items.shift());

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
