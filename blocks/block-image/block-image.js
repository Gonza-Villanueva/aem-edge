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
<a href="${blockHref}">
<picture>
  ${blockImageMobile
    ? html`
        <source type="image/webp" media="(max-width: 900px)" srcset="${blockImageMobile}" />`
    : html`
        <source type="image/webp" media="(max-width: 900px)" srcset="${blockImageDesktop}" />`}
  <source type="image/webp" srcset="${blockImageDesktop}" />
  <img loading="lazy" src="${blockImageDesktop}" alt="${blockAltImage}" />
</picture>
</a>`
    : html`
<picture>
  ${blockImageMobile
    ? html`
        <source type="image/webp" media="(max-width: 900px)" srcset="${blockImageMobile}" />`
    : html`
        <source type="image/webp" media="(max-width: 900px)" srcset="${blockImageDesktop}" />`}
  <source type="image/webp" srcset="${blockImageDesktop}" />
  <img loading="lazy" src="${blockImageDesktop}" alt="${blockAltImage}" />
</picture>`}
`;

function isAImg(elem) {
  const image = elem.querySelector('div picture img');
  return image;
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
  const blockImageDesktop = getSrcOnWebply(items.shift());

  let blockImageMobile = items.shift();
  if (isAImg(blockImageMobile) !== null) {
    blockImageMobile = getSrcOnWebply(blockImageMobile);
  } else {
    blockImageMobile = false;
  }

  const blockAltImage = getTextContent(items.shift());

  let blockHref = items.shift();
  if (isAHref(blockHref) !== null) {
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
