/**
 * @author    infinite Team
 * @copyright Copyright(c) 2025 infinite
 * @module    block/block-title
 */

import { h, render } from '@dropins/tools/preact.js';
import htm from '../../scripts/htm.js';

const html = htm.bind(h);

const titleBlock = ({
  blocktitle,
  blocktitleForId,
  blocktype,
  blockspan,
}) => html`
  ${blockspan === 'true'
    ? html`<span><${blocktype} id="${blocktitleForId}">${blocktitle}</${blocktype}></span>`
    : html`<${blocktype} id="${blocktitleForId}">${blocktitle}</${blocktype}>`}
`;

function getTextContent(el) {
  return el?.textContent?.trim() || '';
}

function getSlugFromText(el) {
  return el?.toLowerCase().replace(/\s+/g, '-') || '';
}

export default async function decorate(block) {
  const items = Array.from(block.children);
  const blockName = getTextContent(items.shift());
  const blocktitle = getTextContent(items.shift());
  const blocktitleForId = getSlugFromText(blocktitle);
  const blocktype = getTextContent(items.shift());
  const blockspan = getTextContent(items.shift());

  // temp block
  const tempWrapper = document.createElement('div');

  const app = html`
  <${titleBlock}
  blockName=${blockName}
  blocktitle=${blocktitle}
  blocktitleForId=${blocktitleForId}
  blocktype=${blocktype}
  blockspan=${blockspan}
  />`;

  // Render in the temporary wrapper
  render(app, tempWrapper);

  // Insert the content before the original block
  block.parentNode.insertBefore(tempWrapper.firstElementChild, block);

  // remove block
  block.remove();
}
