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

      // block-image
      const blockImage = 'block-image';
      const blockImageEnd = 'block-image-end';

      // Case 1: Universal Editor - blocks already structured with class .block-image
      [...col.querySelectorAll(`.${blockImage}`)].forEach((blockEl) => {
        if (!blockEl.closest(`.${blockImage}-wrapper`)) {
          const wrapper = document.createElement('div');
          wrapper.classList.add(`${blockImage}-wrapper`);
          blockEl.before(wrapper);
          wrapper.appendChild(blockEl);
          decorateBlockImage(blockEl);
        }
      });

      // Case 2: Plain HTML (direct editing)
      let i = 0;
      while (i < colChildren.length) {
        const currentIndex = i;
        const startIndex = colChildren.findIndex(
          (el, idx) => idx >= currentIndex && el.textContent.trim().toLowerCase() === blockImage,
        );

        const endIndex = colChildren.findIndex(
          (el, idx) => idx > startIndex && el.textContent.trim().toLowerCase() === blockImageEnd,
        );

        if (startIndex !== -1 && endIndex !== -1) {
          const imageNodes = colChildren.slice(startIndex, endIndex + 1);

          const outerWrapper = document.createElement('div');
          outerWrapper.classList.add(`${blockImage}-wrapper`);

          const innerWrapper = document.createElement('div');
          innerWrapper.classList.add(blockImage, 'block');

          imageNodes.forEach((node) => innerWrapper.appendChild(node.cloneNode(true)));
          outerWrapper.appendChild(innerWrapper);

          colChildren[startIndex].before(outerWrapper);
          imageNodes.forEach((node) => node.remove());

          decorateBlockImage(innerWrapper);

          colChildren = [...col.children];
          i = colChildren.indexOf(outerWrapper) + 1;
        } else {
          break;
        }
      }
    });
  });
}
