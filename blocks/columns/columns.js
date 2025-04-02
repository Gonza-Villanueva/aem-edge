/**
 * @author    infinite Team
 * @copyright Copyright(c) 2025 infinite
 * @module    block/columns
 */

/* eslint-disable max-len */

/**
 * Main decorator function for the "columns" block
 * @param {HTMLElement} block - The DOM element representing the columns block
 */
import decorateBlockAccordion from '../block-accordion/block-accordion.js';
import decorateBlockImage from '../block-image/block-image.js';
import decorateBlockTitle from '../block-title/block-title.js';

/**
 * Injects and decorates custom blocks inside a column, supporting both
 * pre-structured blocks (Universal Editor) and plain HTML blocks defined
 * with textual markers (e.g., "block-name" and "block-name-end"). These are
 * necessary for functionality, remember to add them in their respective JSON.
 *
 * @function injectBlock
 * @param {Object} params - Function parameters.
 * @param {HTMLElement} params.col - The column element being processed.
 * @param {HTMLElement[]} params.colChildren - Array of child elements inside the column.
 * @param {string} params.blockName - The base name of the block (e.g., 'block-image').
 * @param {string} [params.blockStartText=blockName] - Text marker that indicates the start of the block.
 * @param {string} [params.blockEndText=`${blockName}-end`] - Text marker that indicates the end of the block.
 * @param {Function} params.decorator - Decorator function to call after wrapping and inserting the block.
 * @returns {HTMLElement[]} Updated list of child elements in the column.
 *
 * @example
 * injectBlock({
 *   col,
 *   colChildren,
 *   blockName: 'block-image',
 *   decorator: decorateBlockImage,
 * });
 */
function injectBlock({
  col,
  colChildren,
  blockName,
  blockStartText = blockName,
  blockEndText = `${blockName}-end`,
  decorator,
}) {
  // Universal Editor - pre-structured blocks
  [...col.querySelectorAll(`.${blockName}`)].forEach((blockEl) => {
    if (!blockEl.closest(`.${blockName}-wrapper`)) {
      const wrapper = document.createElement('div');
      wrapper.classList.add(`${blockName}-wrapper`);
      blockEl.before(wrapper);
      wrapper.appendChild(blockEl);
      console.log(wrapper);
      decorator(blockEl);
    }
  });

  // Plain HTML - detect by text between start/end
  let i = 0;
  while (i < colChildren.length) {
    const currentIndex = i;
    const startIndex = colChildren.findIndex(
      (el, idx) => idx >= currentIndex && el.textContent.trim().toLowerCase() === blockStartText,
    );

    const endIndex = colChildren.findIndex(
      (el, idx) => idx > startIndex && el.textContent.trim().toLowerCase() === blockEndText,
    );

    if (startIndex !== -1 && endIndex !== -1) {
      const nodes = colChildren.slice(startIndex, endIndex + 1);

      const outerWrapper = document.createElement('div');
      outerWrapper.classList.add(`${blockName}-wrapper`);

      const innerWrapper = document.createElement('div');
      innerWrapper.classList.add(blockName, 'block');
      innerWrapper.setAttribute('data-block-name', blockName);
      innerWrapper.setAttribute('data-block-status', 'loaded');

      nodes.forEach((node) => innerWrapper.appendChild(node.cloneNode(true)));
      outerWrapper.appendChild(innerWrapper);

      colChildren[startIndex].before(outerWrapper);
      nodes.forEach((node) => node.remove());

      console.log(outerWrapper);

      decorator(innerWrapper);

      // eslint-disable-next-line no-param-reassign
      colChildren = [...col.children];
      i = colChildren.indexOf(outerWrapper) + 1;
    } else {
      break;
    }
  }

  return colChildren;
}

export default async function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      // eslint-disable-next-line prefer-const
      let colChildren = [...col.children];

      // the order of injectBlock affects the final render, if you make accordion
      // generate before title, title will still be an AEM Block element
      injectBlock({
        col,
        colChildren,
        blockName: 'block-title',
        decorator: decorateBlockTitle,
      });

      // injectBlock({
      //   col,
      //   colChildren,
      //   blockName: 'block-image',
      //   decorator: decorateBlockImage,
      // });

      // injectBlock({
      //   col,
      //   colChildren,
      //   blockName: 'block-accordion',
      //   decorator: decorateBlockAccordion,
      // });
    });
  });
}
