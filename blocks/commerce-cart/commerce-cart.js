import { events } from '@dropins/tools/event-bus.js';
import { render as provider } from '@dropins/storefront-cart/render.js';
import * as Cart from '@dropins/storefront-cart/api.js';

import { h, render as Prender } from '@dropins/tools/preact.js';
import htm from '../../scripts/htm.js';

const html = htm.bind(h);

// Dropin Containers
import CartSummaryList from '@dropins/storefront-cart/containers/CartSummaryList.js';
import OrderSummary from '@dropins/storefront-cart/containers/OrderSummary.js';
import EstimateShipping from '@dropins/storefront-cart/containers/EstimateShipping.js';
import EmptyCart from '@dropins/storefront-cart/containers/EmptyCart.js';
import Coupons from '@dropins/storefront-cart/containers/Coupons.js';
import GiftCards from '@dropins/storefront-cart/containers/GiftCards.js';
import GiftOptions from '@dropins/storefront-cart/containers/GiftOptions.js';

// API
import { publishShoppingCartViewEvent } from '@dropins/storefront-cart/api.js';

// Initializers
import '../../scripts/initializers/cart.js';

import { readBlockConfig } from '../../scripts/aem.js';
import { rootLink } from '../../scripts/scripts.js';

export default async function decorate(block) {
  // Configuration
  const {
    'hide-heading': hideHeading = 'false',
    'max-items': maxItems,
    'hide-attributes': hideAttributes = '',
    'enable-item-quantity-update': enableUpdateItemQuantity = 'true',
    'enable-item-remove': enableRemoveItem = 'true',
    'enable-estimate-shipping': enableEstimateShipping = 'true',
    'start-shopping-url': startShoppingURL = '/',
    'checkout-url': checkoutURL = '/checkout',
  } = readBlockConfig(block);

  const cart = Cart.getCartDataFromCache();

  // const isEmptyCart = isCartEmpty(cart);
  const isEmptyCart = false;

  // Layout
  const fragment = document.createRange().createContextualFragment(`
    <div class="cart__wrapper">
      <div class="cart__left-column">
        <div class="cart__list"></div>
      </div>
      <div class="cart__right-column">
        <div class="cart__order-summary"></div>
        <div class="cart__gift-options"></div>
        <div class="cart__banner"></div>
        <div class="cart__information"></div>
      </div>
    </div>

    <div class="cart__empty-cart"></div>
  `);

  const $wrapper = fragment.querySelector('.cart__wrapper');
  const $list = fragment.querySelector('.cart__list');
  const $summary = fragment.querySelector('.cart__order-summary');
  const $emptyCart = fragment.querySelector('.cart__empty-cart');
  const $giftOptions = fragment.querySelector('.cart__gift-options');

  function extractNodesBetweenMarkers(container, startMarker, endMarker) {
    const blockWrapper = Array.from(container.querySelectorAll(':scope > div')).find((div) => {
      const text = div.textContent;
      return text.includes(startMarker) && text.includes(endMarker);
    });
    if (!blockWrapper) {
      return [];
    }
    return blockWrapper;
  }

  function getTextContent(el) {
    return el?.textContent?.trim() || '';
  }

  function isAImg(elem) {
    const image = elem.querySelector('div picture img');
    return image;
  }

  function getImageData(elem) {
    const img = elem.querySelector('div picture img');
    if (!img) return null;

    return {
      src: img.getAttribute('src')?.replace('format=png', 'format=webply'),
      width: img.getAttribute('width') || img.naturalWidth || '',
      height: img.getAttribute('height') || img.naturalHeight || '',
    };
  }

  function isAHref(elem) {
    const href = elem.querySelector('div a');
    return href;
  }

  function getHrefFromButton(elem) {
    const butonHref = elem.querySelector('div a').getAttribute('href');
    return butonHref;
  }

  // commerce-cart-banner
  const bannerContent = extractNodesBetweenMarkers(
    block,
    'commerce-cart-banner',
    'commerce-cart-banner-end',
  );
  const $sideBanner = fragment.querySelector('.cart__banner');

  if (bannerContent && $sideBanner) {
    const items = Array.from(bannerContent.children);
    const blockName = getTextContent(items.shift());

    let blockColor = '';
    let blockTitle = '';
    let blockDescription = '';
    let blockCTA = null;
    let blockImage = null;
    let blockEnd = '';

    while (items.length) {
      const nextItem = items[0];

      if (isAHref(nextItem)) {
        const btn = nextItem.querySelector('a');
        const href = getHrefFromButton(nextItem);
        const label = btn?.textContent?.trim();
  
        if (label?.startsWith('#')) {
          blockColor = label;
          items.shift();
        } else {
          blockCTA = { href, label };
          items.shift();
        }
      } else if (isAImg(nextItem)) {
        blockImage = getImageData(nextItem); // debe devolver { src, width, height }
        items.shift();
      } else if (getTextContent(nextItem) === 'commerce-cart-banner-end') {
        blockEnd = getTextContent(items.shift());
      } else {
        const text = getTextContent(items.shift());
        if (!blockTitle) {
          blockTitle = text;
        } else {
          blockDescription = text;
        }
      }
    }
  
    // 🔧 Construcción manual del banner
    const wrapper = document.createElement('div');
    wrapper.className = 'cart-banner-wrapper';
    wrapper.style.backgroundColor = blockColor;
  
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'image-banner';
  
    const picture = document.createElement('picture');
  
    const sourceMobile = document.createElement('source');
    sourceMobile.type = 'image/webp';
    sourceMobile.media = '(max-width: 900px)';
    sourceMobile.srcset = blockImage.src;
  
    const sourceDesktop = document.createElement('source');
    sourceDesktop.type = 'image/webp';
    sourceDesktop.srcset = blockImage.src;
  
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.src = blockImage.src;
    img.alt = blockTitle;
    img.width = blockImage.width;
    img.height = blockImage.height;
  
    picture.appendChild(sourceMobile);
    picture.appendChild(sourceDesktop);
    picture.appendChild(img);
    imageWrapper.appendChild(picture);
    wrapper.appendChild(imageWrapper);
  
    const content = document.createElement('div');
    content.className = 'cart-banner-content';
  
    const title = document.createElement('h3');
    title.textContent = blockTitle;
  
    const desc = document.createElement('p');
    desc.textContent = blockDescription;
  
    const cta = document.createElement('a');
    cta.href = blockCTA.href;
    cta.className = 'cart-banner-cta';
    cta.textContent = blockCTA.label;
  
    content.appendChild(title);
    content.appendChild(desc);
    content.appendChild(cta);
  
    wrapper.appendChild(content);
  
    // Clonamos el contenido para no perder edición original
    $sideBanner.appendChild(wrapper);
  }

  // commerce-cart-info
  // const infoContent = extractNodesBetweenMarkers(
  //   block,
  //   'commerce-cart-info',
  //   'commerce-cart-info-end',
  // );
  // const sideInfo = document.querySelector('.cart__information');
  // if (infoContent && sideInfo) {
  //   sideInfo.append(sideInfo);
  // }

  block.innerHTML = '';
  block.appendChild(fragment);

  // Toggle Empty Cart
  function toggleEmptyCart(state) {
    if (state) {
      $wrapper.setAttribute('hidden', '');
      $emptyCart.removeAttribute('hidden');
    } else {
      $wrapper.removeAttribute('hidden');
      $emptyCart.setAttribute('hidden', '');
    }
  }

  // toggleEmptyCart(isEmptyCart);

  // Render Containers
  await Promise.all([
    // Cart List
    provider.render(CartSummaryList, {
      hideHeading: hideHeading === 'true',
      routeProduct: (product) => rootLink(`/products/${product.url.urlKey}/${product.topLevelSku}`),
      routeEmptyCartCTA: startShoppingURL ? () => rootLink(startShoppingURL) : undefined,
      maxItems: parseInt(maxItems, 10) || undefined,
      attributesToHide: hideAttributes
        .split(',')
        .map((attr) => attr.trim().toLowerCase()),
      enableUpdateItemQuantity: enableUpdateItemQuantity === 'true',
      enableRemoveItem: enableRemoveItem === 'true',
      slots: {
        Footer: (ctx) => {
          const giftOptions = document.createElement('div');

          provider.render(GiftOptions, {
            item: ctx.item,
            view: 'product',
            dataSource: 'cart',
            handleItemsLoading: ctx.handleItemsLoading,
            handleItemsError: ctx.handleItemsError,
            onItemUpdate: ctx.onItemUpdate,
          })(giftOptions);

          ctx.appendChild(giftOptions);
        },
      },
    })($list),

    // Order Summary
    provider.render(OrderSummary, {
      routeProduct: (product) => rootLink(`/products/${product.url.urlKey}/${product.topLevelSku}`),
      routeCheckout: checkoutURL ? () => rootLink(checkoutURL) : undefined,
      slots: {
        EstimateShipping: async (ctx) => {
          if (enableEstimateShipping === 'true') {
            const wrapper = document.createElement('div');
            await provider.render(EstimateShipping, {})(wrapper);
            ctx.replaceWith(wrapper);
          }
        },
        Coupons: (ctx) => {
          const coupons = document.createElement('div');

          provider.render(Coupons)(coupons);

          ctx.appendChild(coupons);
        },
        GiftCards: (ctx) => {
          const giftCards = document.createElement('div');

          provider.render(GiftCards)(giftCards);

          ctx.appendChild(giftCards);
        },
      },
    })($summary),

    // Empty Cart
    provider.render(EmptyCart, {
      routeCTA: startShoppingURL ? () => rootLink(startShoppingURL) : undefined,
    })($emptyCart),

    provider.render(GiftOptions, {
      view: 'order',
      dataSource: 'cart',
    })($giftOptions),
  ]);

  let cartViewEventPublished = false;
  // Events
  events.on(
    'cart/data',
    (payload) => {
      toggleEmptyCart(isCartEmpty(payload));

      if (!cartViewEventPublished) {
        cartViewEventPublished = true;
        publishShoppingCartViewEvent();
      }
    },
    { eager: true },
  );

  return Promise.resolve();
}

function isCartEmpty(cart) {
  return cart ? cart.totalQuantity < 1 : true;
}
