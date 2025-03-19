/**
 * @copyright   Copyright © 2025 - Infinite
 * @author      Infinite Team
 * @category    blocks
 * @module      blocks/ulta-products-carousel
 */

/* global Swiper */
import { moveInstrumentation } from '../../scripts/scripts.js';

// URL of the products JSON (this will change when connected to GraphQL)
const jsonURL2 = '../../scripts/products.json';
const jsonURL = 'https://author-p34631-e1321407.adobeaemcloud.com/content/dam/learning-wysiwyg-con-edge-delivery-services/json/products.json';

fetch('https://author-p34631-e1321407.adobeaemcloud.com/content/dam/learning-wysiwyg-con-edge-delivery-services/json/products.json', {
  credentials: 'include'
})
.then(response => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
})
.then(data => console.log(data))
.catch(error => console.error('Error fetching the JSON:', error));

/**
 * Creates an element with a specific type and transfers the content from the original.
 *
 * @param {string} tag - HTML tag of the new element.
 * @param {HTMLElement} originalElement - Original element from which the content will be extracted.
 * @returns {HTMLElement} - New element with the transferred content.
 */
function createElementWithContent(tag, originalElement) {
  const newElement = document.createElement(tag);
  if (originalElement) {
    if (originalElement.textContent.trim()) {
      newElement.textContent = originalElement.textContent.trim();
    }
    moveInstrumentation(originalElement, newElement);
  }
  return newElement;
}

export default async function decorate(block) {
  // ---------- header ----------

  // Get the block elements
  const items = Array.from(block.children);
  const titleElement = items.shift();
  const descriptionElement = items.shift();
  const tagsElement = items.shift();

  // extract tags
  const dataTags = Array.from(tagsElement.querySelectorAll('p'));
  let selectedTags = [];
  let blockButtonText = '';

  // If there is at least one <p>, the first one is always the tags
  if (dataTags.length > 0) {
    selectedTags = dataTags[0].textContent.trim().split(',').map((tag) => tag.trim());
  }

  // If there is a second <p>, that is the button and only takes the text
  if (dataTags.length > 1) {
    blockButtonText = dataTags[1].textContent.trim();
  }

  // Create the header container
  const headerContainer = document.createElement('div');
  headerContainer.classList.add('ulta-products-carousel-header');

  // Create elements with the reusable function
  const titleHeader = createElementWithContent('h2', titleElement);
  const descriptionHeader = createElementWithContent('p', descriptionElement);

  // Get the products from the JSON
  const response = await fetch(jsonURL);
  const data = await response.json();
  const { products } = data;

  // Filter products that contain at least one of the selected tags
  const filteredProducts = selectedTags.length > 0
    ? products.filter((product) => product.tag.some((tag) => selectedTags.includes(tag)))
    : [];

  // Create the span for the product counter
  const productCount = filteredProducts.length;
  const productCountHeader = document.createElement('span');
  productCountHeader.textContent = `${productCount} artículos`;

  // Add elements to the header container
  headerContainer.appendChild(titleHeader);
  headerContainer.appendChild(descriptionHeader);
  headerContainer.appendChild(productCountHeader);

  // ---------- Swiper ----------

  // Create Swiper container
  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('ulta-products-carousel-swiper', 'swiper');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('ulta-products-carousel-wrapper', 'swiper-wrapper');

  swiperContainer.appendChild(swiperWrapper);

  const createNavButton = (className, imgAlt) => {
    const button = document.createElement('div');
    button.classList.add('ulta-products-carousel-button', className, `swiper-button-${className.split('-')[2]}`);
    button.innerHTML = `<img src="https://author-p34631-e1321407.adobeaemcloud.com/content/dam/learning-wysiwyg-con-edge-delivery-services/icons/arrow.svg" alt="${imgAlt}" class="ulta-products-carousel-arrow">`;
    return button;
  };

  const prevButton = createNavButton('ulta-products-carousel-button-prev', 'Previous');
  const nextButton = createNavButton('ulta-products-carousel-button-next', 'Next');

  // ---------- Products ----------
  filteredProducts.forEach((product) => {
    // Create container for each product
    const slide = document.createElement('div');
    slide.classList.add('ulta-products-slide', 'swiper-slide');

    // Create variables for product data
    const {
      img,
      name,
      badge,
      wishlist,
      tag,
      brand,
      ranking,
      wishlistLink,
      wishlistAdded,
      linkPdp,
      colorVariation,
      rankingComment,
      normalPrice,
      specialPrice,
      promo,
      addToCartLink,
    } = product;

    // Calculate ranking points
    const maxRank = 5;
    const rankPoints = (ranking / 100) * maxRank;

    // Internal structure of the product
    slide.innerHTML = `
      <div class="ulta-product">
        <a href="${linkPdp}" class="ulta-product-link">
            <div class="ulta-product-image">
              <img src="${img}" alt="${name}" class="ulta-product-img">
              ${badge ? `<img src="${badge}" alt="Badge" class="ulta-product-badge">` : ''}
              ${wishlist ? `<a href="${wishlistLink}" class="ulta-product-wishlist-button ${wishlistAdded ? 'remove' : ''}" ></a>` : ''}
              ${tag.length > 0 ? `
                  <div class="ulta-tag-container">
                      ${tag.map((t) => `<div class="ulta-tag">${t}</div>`).join('')}
                  </div>
              ` : ''}
              ${colorVariation > 0 ? `
                <div class="ulta-color-variation">${colorVariation} colores</div>
              ` : ''}
            </div>
        </a>
        <div class="ulta-product-info">
            ${brand ? `<div class="ulta-product-brand">${brand}</div>` : ''}
            <a href="${linkPdp}" class="ulta-product-name">${name}</a>
            ${ranking ? `<div class="ulta-product-stars-wrapper">
                <div class="ulta-product-stars" style="--rating: ${ranking}%;"></div>
                <div class="ulta-product-stars-points">${rankPoints}</div>
                <div class="ulta-product-stars-comments">(${rankingComment})</div>
              </div>
            ` : ''}
            <div class="ulta-product-price">
              ${specialPrice ? `
                <div class="ulta-product-price-special">$${specialPrice}</div>
                <div class="ulta-product-price-normal">$${normalPrice}</div>
              ` : `
                <div class="ulta-product-price-normal">$${normalPrice}</div>
              `}
            </div>
            ${promo ? `<div class="ulta-product-promo">${promo}</div>` : ''}
        </div>
        ${blockButtonText ? `<a class="ulta-product-button" href="${addToCartLink}">${blockButtonText}</a>` : ''}
      </div>
      `;

    swiperWrapper.appendChild(slide);
  });

  // ---------- Append ----------

  // Empty the original content of the block
  block.innerHTML = '';

  // Insert the headerContainer into the block
  block.append(headerContainer, prevButton, swiperContainer, nextButton);

  // ---------- init swiper ----------

  // Initialize Swiper
  function initializeSwiper() {
    if (typeof Swiper !== 'undefined') {
      return new Swiper('.ulta-products-carousel-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        navigation: {
          nextEl: '.ulta-products-carousel-button-next',
          prevEl: '.ulta-products-carousel-button-prev',
        },
      });
    }
    return null;
  }

  initializeSwiper();
}
