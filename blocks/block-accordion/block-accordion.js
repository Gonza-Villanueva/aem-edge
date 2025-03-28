import { h, render } from '@dropins/tools/preact.js';
import htm from '../../scripts/htm.js';

const html = htm.bind(h);
const accordionBlock = ({ accordionClass, accordionType, accordionTextUl }) => html`
  <div class="accordion ${accordionClass} ${accordionType}">
    <div class="accordion__content">
      ${accordionTextUl ? html`<ul dangerouslySetInnerHTML=${{ __html: accordionTextUl.innerHTML }} />` : ''}
    </div>
  </div>
`;

export default async function decorate(block) {
  const items = Array.from(block.children);
  const accordionClass = items.shift().textContent.trim().toLowerCase().replace(/,/g, ' ');
  const accordionType = items.shift().textContent.trim().toLowerCase().replace(/,/g, ' ');
  const accordionTextHtml = items.shift();
  const accordionTextelement = accordionTextHtml.querySelector('ul');
  const accordionTextUl = accordionTextelement?.cloneNode(true);

  block.innerHTML = '';

  const blockWrapperCloses = block.closest('.block-accordion-wrapper');
  const heading = blockWrapperCloses?.previousElementSibling?.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) {
    heading.classList = 'accordion__heading';
    heading.addEventListener('click', () => {
      blockWrapperCloses.classList.toggle('open');
    });
  }

  const app = html`
  <${accordionBlock}
  block=${block}
  accordionClass=${accordionClass}
  accordionType=${accordionType}
  accordionTextUl=${accordionTextUl}
  />`;

  render(app, block);
}
