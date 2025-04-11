/**
 * @author    infinite Team
 * @copyright Copyright(c) 2025 infinite
 * @module    commerce-cart/utils/cartDomUtils
 */

/**
 * Extracts DOM nodes between two marker strings within a container
 * @param {HTMLElement} container - The parent element to search within
 * @param {string} startMarker - The starting marker text to look for
 * @param {string} endMarker - The ending marker text to look for
 * @returns {HTMLElement|Array} Returns the wrapper element containing nodes between markers,
 *                              or empty array if not found
 */
export function extractNodesBetweenMarkers(container, startMarker, endMarker) {
  const blockWrapper = Array.from(container.querySelectorAll(':scope > div')).find((div) => {
    const text = div.textContent;
    return text.includes(startMarker) && text.includes(endMarker);
  });
  if (!blockWrapper) {
    return [];
  }
  return blockWrapper;
}

/**
 * Safely gets trimmed text content from an element
 * @param {HTMLElement|null|undefined} el - The DOM element to extract text from
 * @returns {string} The trimmed text content, or empty string if element is null/undefined
 */
export function getTextContent(el) {
  return el?.textContent?.trim() || '';
}

/**
 * Checks if an element contains an image structure (div > picture > img)
 * @param {HTMLElement} elem - The element to check
 * @returns {boolean} True if the element contains an image, false otherwise
 */
export function isAImg(elem) {
  const image = elem.querySelector('div picture img');
  return image;
}

/**
 * Extracts image data from an element containing an image structure
 * @param {HTMLElement} elem - The element containing the image
 * @returns {Object|null} Returns an object with image data (src, width, height) or null image found
 * @property {string} src - The image source URL (converts png to webp format)
 * @property {string|number} width - The image width from attribute or natural width
 * @property {string|number} height - The image height from attribute or natural height
 */
export function getImageData(elem) {
  const img = elem.querySelector('div picture img');
  if (!img) return null;

  return {
    src: img.getAttribute('src')?.replace('format=png', 'format=webply'),
    width: img.getAttribute('width') || img.naturalWidth || '',
    height: img.getAttribute('height') || img.naturalHeight || '',
  };
}

/**
 * Checks if an element contains a link structure (div > a)
 * @param {HTMLElement} elem - The element to check
 * @returns {boolean} True if the element contains a link, false otherwise
 */
export function isAHref(elem) {
  const href = elem.querySelector('div a');
  return href;
}

/**
 * Extracts href attribute from a button/link structure (div > a)
 * @param {HTMLElement} elem - The element containing the link
 * @returns {string} The href value of the link
 * @throws {Error} Will throw if the link structure is not found
 */
export function getHrefFromButton(elem) {
  const butonHref = elem.querySelector('div a').getAttribute('href');
  return butonHref;
}

export function formatPrice(amount, currency) {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
