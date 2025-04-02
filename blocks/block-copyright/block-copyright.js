/**
 * @author    infinite Team
 * @copyright Copyright(c) 2025 infinite
 * @module    block/block-copyright
 */

import { h, render } from '@dropins/tools/preact.js';
import htm from '../../scripts/htm.js';

const html = htm.bind(h);

const copyrightBlock = ({ copyrightText, copyrightTextUl }) => html`
  <div id="copyright" class="copyright-text">
    ${copyrightText}
  </div>
  <div class="copyright-links">
    ${copyrightTextUl ? html`<ul dangerouslySetInnerHTML=${{ __html: copyrightTextUl.innerHTML }} />` : ''}
  </div>
`;

function getTextContent(el) {
  return el?.textContent?.trim().replace(/,/g, ' ') || '';
}

/**
 * Utility to find the first <ul> element from a given container
 * @param {Element} container
 * @returns {HTMLUListElement|null}
 */
function findFirstUl(container) {
  return container?.querySelector?.('ul') || (container?.tagName === 'UL' ? container : null);
}

export default async function decorate(block) {
  const items = Array.from(block.children);
  const blockName = getTextContent(items.shift());
  const copyrightText = getTextContent(items.shift());
  const copyrightTextHtml = items.shift();
  const copyrightTextelement = findFirstUl(copyrightTextHtml);
  const copyrightTextUl = copyrightTextelement?.cloneNode(true);

  block.innerHTML = '';

  const app = html`
  <${copyrightBlock}
  block=${block}
  blockName=${blockName}
  copyrightText=${copyrightText}
  copyrightTextUl=${copyrightTextUl}
  />`;

  render(app, block);
}
