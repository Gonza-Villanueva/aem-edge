/**
 * @author    infinite Team
 * @copyright Copyright(c) 2025 infinite
 * @module    block/block-accordion
 */

import { h, render } from '@dropins/tools/preact.js';
import htm from '../../scripts/htm.js';

const html = htm.bind(h);

/**
 * Preact component to render the accordion structure
 * @param {Object} props
 * @param {string} props.accordionClass - Class names for additional styling
 * @param {string} props.accordionType - Type of accordion (e.g., desktop, mobile)
 * @param {HTMLElement|null} props.accordionTextUl - The <ul> element with accordion items
 * @returns {JSX.Element}
 */

const accordionBlock = ({ accordionClass, accordionType, accordionTextUl }) => html`
  <div class="accordion ${accordionClass} ${accordionType}">
    <div class="accordion-content">
      ${accordionTextUl ? html`<ul dangerouslySetInnerHTML=${{ __html: accordionTextUl.innerHTML }} />` : ''}
    </div>
  </div>
`;

/**
 * Utility function to extract and normalize text content from an element
 * Converts to lowercase and replaces commas with spaces
 * @param {Element} el
 * @returns {string}
 */
function getTextContent(el) {
  return el?.textContent?.trim().toLowerCase().replace(/,/g, ' ') || '';
}

/**
 * Utility to find the first <ul> element from a given container
 * @param {Element} container
 * @returns {HTMLUListElement|null}
 */
function findFirstUl(container) {
  return container?.querySelector?.('ul') || (container?.tagName === 'UL' ? container : null);
}

/**
 * Recursively find heading element (h1-h6) from previous siblings
 * @param {HTMLElement} wrapper - The element from which to start search
 * @returns {HTMLElement|null}
 */
function findAccordionHeading(wrapper) {
  let sibling = wrapper?.previousElementSibling;

  console.log(sibling);

  while (sibling) {
    // Check if it's already a heading
    if (sibling.tagName?.match(/^H[1-6]$/)) return sibling;

    // Otherwise, try to query inside it
    const nestedHeading = sibling.querySelector?.('h1, h2, h3, h4, h5, h6');
    if (nestedHeading) return nestedHeading;

    sibling = sibling.previousElementSibling;
  }

  return null;
}

/**
 * Main decorator function executed by Edge Delivery Services to render the accordion block
 * @param {HTMLElement} block - The DOM element representing the accordion block
 */
export default async function decorate(block) {
  const items = Array.from(block.children);
  const blockName = getTextContent(items.shift());
  const accordionClass = getTextContent(items.shift());
  const accordionType = getTextContent(items.shift());
  const accordionTextHtml = items.shift();
  const accordionTextelement = findFirstUl(accordionTextHtml);
  const accordionTextUl = accordionTextelement?.cloneNode(true);

  block.innerHTML = '';

  const blockWrapperCloses = block.closest('.block-accordion-wrapper');

  const heading = findAccordionHeading(blockWrapperCloses);

  if (heading) {
    heading.classList.add('accordion-heading', ...accordionType.split(' '));
    heading.addEventListener('click', () => {
      const accordionEl = blockWrapperCloses?.querySelector('.accordion');
      if (accordionEl) accordionEl.classList.toggle('open');
      heading.classList.toggle('open');
    });
  }

  const app = html`
  <${accordionBlock}
  block=${block}
  blockName=${blockName}
  accordionClass=${accordionClass}
  accordionType=${accordionType}
  accordionTextUl=${accordionTextUl}
  />`;

  render(app, block);
}
