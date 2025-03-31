/**
 * @author    infinite Team
 * @copyright Copyright(c) 2025 infinite
 * @module    block/block-accordion
 */

import { h, render } from '@dropins/tools/preact.js';
import htm from '../../scripts/htm.js';

const html = htm.bind(h);

const imageBlock = ({ blockImageDesktop }) => html`
  <picture>
    <source type="image/webp" media="(max-width: 900px)" srcset="${blockImageDesktop}">
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

  const app = html`
  <${imageBlock}
  block=${block}
  blockImageDesktop=${blockImageDesktop}
  />`;

  render(app, block);
}
