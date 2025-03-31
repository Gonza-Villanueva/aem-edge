/**
 * @author    infinite Team
 * @copyright Copyright(c) 2025 infinite
 * @module    block/columns
 */

/**
 * Main decorator function for the "columns" block
 * @param {HTMLElement} block - The DOM element representing the columns block
 */
import decorateBlockAccordion from '../block-accordion/block-accordion.js';
import decorateBlockImage from '../block-image/block-image.js';

export default async function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }

      const colChildren = [...col.children];

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
      const startIndexImage = colChildren.findIndex((el) => el.tagName === 'P' && el.textContent.trim().toLowerCase() === blockImage);
      // Case 1: Detect image block declared via <p> with text "block-image"
      if (startIndexImage !== -1) {
        const imageNodes = colChildren.slice(startIndexImage);
        const outerWrapper = document.createElement('div');
        outerWrapper.classList.add(`${blockImage}-wrapper`);
        const innerWrapper = document.createElement('div');
        innerWrapper.classList.add(blockImage, 'block');
        imageNodes.forEach((node) => innerWrapper.appendChild(node.cloneNode(true)));
        outerWrapper.appendChild(innerWrapper);
        imageNodes[0].before(outerWrapper);
        imageNodes.forEach((node) => node.remove());
        decorateBlockImage(innerWrapper);
      } else {
        // Case 2: Already structured image block without wrapper
        const imageBlockEl = col.querySelector(`.${blockImage}`);
        if (imageBlockEl && !imageBlockEl.closest('.block-image-wrapper')) {
          const wrapper = document.createElement('div');
          wrapper.classList.add('block-image-wrapper');
          imageBlockEl.before(wrapper);
          wrapper.appendChild(imageBlockEl);
          decorateBlockImage(imageBlockEl);
        }
      }
    });
  });
}
