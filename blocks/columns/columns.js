import decorateBlockAccordion from '../block-accordion/block-accordion.js';

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
      const blockAccordion = 'block-accordion';
      // Decorate block-accordion if present
      const startIndex = colChildren.findIndex((el) => el.tagName === 'P' && el.textContent.trim().toLowerCase() === blockAccordion);

      if (startIndex !== -1) {
        const ulIndex = colChildren.findIndex((el, i) => el.tagName === 'UL' && i > startIndex);

        if (ulIndex !== -1) {
          const accordionNodes = colChildren.slice(startIndex, ulIndex + 1);

          // Crear wrapper externo
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
        const accordionBlockEl = col.querySelector(`.${blockAccordion}`);
        if (accordionBlockEl && !accordionBlockEl.closest('.block-accordion-wrapper')) {
          const wrapper = document.createElement('div');
          wrapper.classList.add('block-accordion-wrapper');
          accordionBlockEl.before(wrapper);
          wrapper.appendChild(accordionBlockEl);

          decorateBlockAccordion(accordionBlockEl);
        }
      }
    });
  });
}
