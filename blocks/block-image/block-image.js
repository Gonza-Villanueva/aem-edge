/**
 * @author    infinite Team
 * @copyright Copyright(c) 2025 infinite
 * @module    block/block-accordion
 */

import { h, render } from '@dropins/tools/preact.js';
import htm from '../../scripts/htm.js';

const html = htm.bind(h);

const imageBlock = ({ blockImageDesktop, blockImageMobile }) => html`
  <picture>
    ${blockImageMobile ? html`<source type="image/webp" media="(min-width: 900px)" srcset="${blockImageDesktop}">` : ''}
    <source type="image/webp" srcset="${blockImageDesktop}">
    <img loading="lazy" src="${blockImageDesktop}" alt="">
  </picture>
  -----------
`;

function getSrcOnWebply(elem) {
  let imgSrc = elem.querySelector('div picture img').getAttribute('src');
  imgSrc = imgSrc.replace('format=png', 'format=webply');
  return imgSrc;
}

export default async function decorate(block) {
  const items = Array.from(block.children);
  console.log(items);
  const blockImageDesktop = getSrcOnWebply(items.shift());
  console.log(blockImageDesktop);
  const blockImageMobile = getSrcOnWebply(items.shift());

  const app = html`
  <${imageBlock}
  block=${block}
  blockImageDesktop=${blockImageDesktop}
  blockImageMobile=${blockImageMobile}
  />`;

  render(app, block);
}
