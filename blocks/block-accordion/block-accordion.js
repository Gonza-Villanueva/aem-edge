import { h, render } from '@dropins/tools/preact.js';
import htm from '../../scripts/htm.js';

const html = htm.bind(h);
const accordionBlock = ({ accordionClass, accordionType, accordionTextUl }) => html`
  <div class="accordion ${accordionClass} ${accordionType}">
    <div class="accordion-content">
      ${accordionTextUl ? html`<ul dangerouslySetInnerHTML=${{ __html: accordionTextUl.innerHTML }} />` : ''}
    </div>
  </div>
`;

function getTextContent(el) {
  return el?.textContent?.trim().toLowerCase().replace(/,/g, ' ') || '';
}

function findFirstUl(container) {
  return container?.querySelector?.('ul') || (container?.tagName === 'UL' ? container : null);
}

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
  let heading = blockWrapperCloses?.previousElementSibling;

  if (!heading.tagName?.match(/^H[1-6]$/)) {
    heading = heading.querySelector?.('h1, h2, h3, h4, h5, h6');
  }

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
