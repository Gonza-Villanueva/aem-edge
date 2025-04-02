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

function injectBlock({
  col,
  colChildren,
  blockName,
  blockStartText = blockName,
  blockEndText = `${blockName}-end`,
  decorator,
}) {
  // Universal Editor - bloques ya estructurados
  [...col.querySelectorAll(`.${blockName}`)].forEach((blockEl) => {
    if (!blockEl.closest(`.${blockName}-wrapper`)) {
      const wrapper = document.createElement('div');
      wrapper.classList.add(`${blockName}-wrapper`);
      blockEl.before(wrapper);
      wrapper.appendChild(blockEl);
      decorator(blockEl);
    }
  });

  // HTML Plano - detectar por texto entre start/end
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

      nodes.forEach((node) => innerWrapper.appendChild(node.cloneNode(true)));
      outerWrapper.appendChild(innerWrapper);

      colChildren[startIndex].before(outerWrapper);
      nodes.forEach((node) => node.remove());

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
      let colChildren = [...col.children];

      // block-accordion
      const blockAccordion = 'block-accordion';
      const startIndexAccordion = colChildren.findIndex((el) => el.tagName === 'P' && el.textContent.trim().toLowerCase() === blockAccordion);
      // Case 1: Detect accordion block declared via <p> with text "block-accordion"
      if (startIndexAccordion !== -1) {
        const ulIndex = colChildren.findIndex((el, i) => el.tagName === 'UL' && i > startIndexAccordion);

        if (ulIndex !== -1) {
          const accordionNodes = colChildren.slice(startIndexAccordion, ulIndex + 1);
          const outerWrapper = document.createElement('div');
          outerWrapper.classList.add(`${blockAccordion}-wrapper`);
          const innerWrapper = document.createElement('div');
          innerWrapper.classList.add(blockAccordion, 'block');
          accordionNodes.forEach((node) => innerWrapper.appendChild(node.cloneNode(true)));
          outerWrapper.appendChild(innerWrapper);
          accordionNodes[0].before(outerWrapper);
          accordionNodes.forEach((node) => node.remove());
          decorateBlockAccordion(innerWrapper);
        }
      } else {
        // Case 2: Already structured accordion block without wrapper
        const accordionBlockEl = col.querySelector(`.${blockAccordion}`);
        if (accordionBlockEl && !accordionBlockEl.closest('.block-accordion-wrapper')) {
          const wrapper = document.createElement('div');
          wrapper.classList.add('block-accordion-wrapper');
          accordionBlockEl.before(wrapper);
          wrapper.appendChild(accordionBlockEl);
          decorateBlockAccordion(accordionBlockEl);
        }
      }

      injectBlock({
        col,
        colChildren,
        blockName: 'block-image',
        decorator: decorateBlockImage,
      });

      injectBlock({
        col,
        colChildren,
        blockName: 'block-title',
        decorator: decorateBlockTitle,
      });
    });
  });
}
