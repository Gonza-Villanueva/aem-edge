import { h } from '@dropins/tools/preact.js';
import htm from '../../../scripts/htm.js';

const html = htm.bind(h);

/**
 * Component representing the pagination controls.
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.pages - The total number of pages.
 * @param {number} props.currentPage - The current page number.
 * @param {Array} props.pageSizeOptions - The available page size options.
 * @param {number} props.currentPageSize - The current page size.
 * @param {boolean} props.loading - Whether the component is in loading state.
 * @param {Function} props.onPageChange - The function to call when the page changes.
 * @param {Function} props.onPageSizeChange - The function to call when the page size changes.
 * @returns {JSX.Element} The rendered component.
 */


function Pagination({ pages, currentPage, pageSizeOptions, currentPageSize, loading, onPageChange, onPageSizeChange  }) {
  if (loading) {
    return html`<div class="dropin-pagination shimmer"></div>`;
  }

  const handlePageChange = (page) => {
    if (page > 0 && page <= pages) {
      onPageChange(page);
    }
  };

  return html`
  <div class="pagination">
      <div class="pagination__navigation">
        <button
          type="button"
          data-testid="prev-button"
          class="pagination__arrow pagination__arrow--backward"
          disabled=${currentPage === 1}
          onClick=${() => handlePageChange(currentPage - 1)}
        >
        </button>
        <ul class="pagination__list">
          ${Array.from({ length: pages }, (_, i) => i + 1).map((page) => html`
            <li
              data-testid=${`pagination__list-item--${page}`}
              class=${`pagination__list-item pagination__list-item--${page} ${currentPage === page ? 'pagination__list-item--active' : ''}`}
            >
              <button type="button" data-testid=${`set-page-button-${page}`} onClick=${() => handlePageChange(page)}>
                ${page}
              </button>
            </li>
          `)}
        </ul>
        <button
          type="button"
          data-testid="next-button"
          class="pagination__arrow pagination__arrow--forward"
          disabled=${currentPage === pages}
          onClick=${() => handlePageChange(currentPage + 1)}
        >
        </button>
      </div>
      <div class="pagination__control">
        <label for="select-pagesize">Mostrar</label>
        <select id="select-pagesize" name="pageSize" value=${currentPageSize} onChange=${(e) => onPageSizeChange(parseInt(e.target.value, 12))}>
          ${pageSizeOptions.map((size) => html`<option value=${size}>${size}</option>`)}
        </select>
        <label for="select-pagesize">por página</label>
      </div>
    </div>`;
}

export default Pagination;
