import { events } from '@dropins/tools/event-bus.js';
import { render as provider } from '@dropins/storefront-cart/render.js';
import * as Cart from '@dropins/storefront-cart/api.js';

import { h, render as Prender } from '@dropins/tools/preact.js';

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
import htm from '../../scripts/htm.js';

// Utils
import {
  extractNodesBetweenMarkers,
  getTextContent,
  isAImg,
  getImageData,
  isAHref,
  getHrefFromButton,
  formatPrice,
} from './utils/cartDomUtils.js';

import {
  createEmptySummary,
  setupCartPriceListeners,
  createNewSummary,
  AddTextToDeleteItemCart,
} from './utils/cartSummaryUtils.js';

// Components
import {
  CartBanner,
  CartInfo,
  PayPalButton,
  CancelCouponButton,
  couponTitle,
  couponInputHelp,
} from './components/cartComponents.js';

// Initializers
import '../../scripts/initializers/cart.js';
import { readBlockConfig, fetchPlaceholders } from '../../scripts/aem.js';
import { rootLink } from '../../scripts/scripts.js';

const html = htm.bind(h);

export default async function decorate(block) {
  // Configuration
  const {
    'hide-heading': hideHeading = 'false',
    'hide-footer': hideFooter = 'false',
    'max-items': maxItems,
    'hide-attributes': hideAttributes = '',
    'enable-item-quantity-update': enableUpdateItemQuantity = 'true',
    'enable-item-remove': enableRemoveItem = 'true',
    'enable-estimate-shipping': enableEstimateShipping = 'true',
    'start-shopping-url': startShoppingURL = '/',
    'checkout-url': checkoutURL = '/checkout',
  } = readBlockConfig(block);

  // placeholders i18n
  const i18n = await fetchPlaceholders();
  const cart = Cart.getCartDataFromCache();
  const isEmptyCart = isCartEmpty(cart);

  // Layout
  const fragment = document.createRange().createContextualFragment(`
    <div class="cart__wrapper">
      <div class="cart__left-column">
        <div class="cart__list-banner"></div>
        <div class="cart__list"></div>
      </div>
      <div class="cart__right-column">
        <div class="cart__order-summary"></div>
        <div class="cart__order-summary-empty"></div>
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
  const $summaryEmpty = fragment.querySelector('.cart__order-summary-empty');
  const $emptyCart = fragment.querySelector('.cart__empty-cart');
  const $giftOptions = fragment.querySelector('.cart__gift-options');
  const $cartInformation = fragment.querySelector('.cart__information');
  const $cartBanner = fragment.querySelector('.cart__banner');

  // commerce-cart-banner
  const bannerContent = extractNodesBetweenMarkers(
    block,
    'commerce-cart-banner',
    'commerce-cart-banner-end',
  );
  const $sideBanner = $cartBanner;
  if (!Array.isArray(bannerContent) && bannerContent && $sideBanner) {
    const renderedBanner = bannerContent.cloneNode(true);
    renderedBanner.classList.add('fake-block');
    const renderTargetBanner = document.createElement('div');
    $sideBanner.appendChild(renderedBanner);
    $sideBanner.appendChild(renderTargetBanner);

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
        blockImage = getImageData(nextItem);
        items.shift();
      } else if (getTextContent(nextItem) === 'commerce-cart-banner-end') {
        blockEnd = getTextContent(items.shift());
      } else {
        const text = getTextContent(items.shift());
        if (!blockTitle) {
          blockTitle = text;
        } else if (!blockDescription) {
          blockDescription = text;
        }
      }
    }

    const SectorCartBannerApp = html`
    <${CartBanner}
    blockName=${blockName}
    blockColor=${blockColor}
    blockTitle=${blockTitle}
    blockDescription=${blockDescription}
    blockCTA=${blockCTA}
    blockImage=${blockImage}
    blockEnd=${blockEnd}
    />`;

    Prender(SectorCartBannerApp, renderTargetBanner);
  }

  // commerce-cart-info
  const infoContent = extractNodesBetweenMarkers(
    block,
    'commerce-cart-info',
    'commerce-cart-info-end',
  );
  const $sideInfo = $cartInformation;

  if (!Array.isArray(infoContent) && infoContent && $sideInfo) {
    const renderedInfo = infoContent.cloneNode(true);
    renderedInfo.classList.add('fake-block');
    const renderTargetInfo = document.createElement('div');
    $sideInfo.appendChild(renderedInfo);
    $sideInfo.appendChild(renderTargetInfo);

    const infoItems = Array.from(infoContent.children);
    const infoBlockName = getTextContent(infoItems.shift());

    const infoData = {
      title: '',
      lines: [],
      phone: '',
      phoneHref: '',
      cta: null,
    };
    while (infoItems.length) {
      const next = infoItems[0];
      const text = getTextContent(next);

      if (text === 'commerce-cart-info-end') {
        infoItems.shift();
      } else if (isAHref(next)) {
        const a = next.querySelector('a');
        const href = getHrefFromButton(next);
        const label = a?.textContent?.trim();
        infoData.cta = { href, label };
        infoItems.shift();
      } else {
        if (!infoData.title) {
          infoData.title = text;
        } else if (text.startsWith('tel:')) {
          infoData.phoneHref = text;
          infoData.phone = text.replace('tel:', '');
        } else {
          infoData.lines.push(text);
        }

        infoItems.shift();
      }
    }

    const SectorCartInfoApp = html`
    <${CartInfo}
    infoBlockName=${infoBlockName}
    infoData=${infoData}
    />`;

    Prender(SectorCartInfoApp, renderTargetInfo);
  }

  block.innerHTML = '';
  block.appendChild(fragment);

  // Toggle Empty Cart
  function toggleEmptyCart(state) {
    if (state) {
      $wrapper.setAttribute('show', '');
      $emptyCart.setAttribute('hidden', '');
      $summary.setAttribute('hidden', '');
      $summaryEmpty.removeAttribute('hidden');
    } else {
      $wrapper.removeAttribute('hidden');
      $emptyCart.setAttribute('hidden', '');
      $summary.removeAttribute('hidden');
      $summaryEmpty.setAttribute('hidden', '');
    }
  }

  toggleEmptyCart(isEmptyCart);

  // Render Containers
  await Promise.all([
    // Cart List
    provider.render(CartSummaryList, {
      hideHeading: hideHeading === 'true',
      hideFooter: hideFooter === 'true',
      routeProduct: (product) => rootLink(`/products/${product.url.urlKey}/${product.topLevelSku}`),
      routeEmptyCartCTA: startShoppingURL
        ? () => rootLink(startShoppingURL)
        : undefined,
      maxItems: parseInt(maxItems, 10) || undefined,
      attributesToHide: hideAttributes
        .split(',')
        .map((attr) => attr.trim().toLowerCase()),
      enableUpdateItemQuantity: enableUpdateItemQuantity === 'true',
      enableRemoveItem: enableRemoveItem === 'true',
      quantityType: 'dropdown',
      dropdownOptions: [
        { value: '1', text: '1' },
        { value: '2', text: '2' },
        { value: '3', text: '3' },
        { value: '4', text: '4' },
        { value: '5', text: '5' },
        { value: '6', text: '6' },
        { value: '7', text: '7' },
        { value: '8', text: '8' },
        { value: '9', text: '9' },
        { value: '10', text: '10' },
      ],
      slots: {
        Footer: (ctx) => {
          // discount
          const discounted = ctx.item?.discounted;
          if (discounted) {
            // price
            const priceValue = ctx.item?.price?.value;
            const priceCurrency = ctx.item?.price?.currency;
            const priceUnitFormated = formatPrice(priceValue, priceCurrency);
            const originalPriceWrapper = document.createElement('div');
            originalPriceWrapper.classList.add('product-unit-price');
            originalPriceWrapper.innerText = `1x${priceUnitFormated}`;
            ctx.appendChild(originalPriceWrapper);

            // apply discount
            const discountApplyWrapper = document.createElement('div');
            discountApplyWrapper.classList.add('product-discount-apply');
            discountApplyWrapper.innerText = 'Descuento aplicado';
            ctx.appendChild(discountApplyWrapper);
          }
        },
        ProductAttributes: (ctx) => {
          // product attr Brand
          const productAttrs = ctx.item?.productAttributes;
          productAttrs.forEach((attr) => {
            if (attr.code === 'Ulta Marca') {
              if (attr.selected_options) {
                const selectedOptions = attr.selected_options
                  .filter((option) => option.label.trim() !== '')
                  .map((option) => option.label)
                  .join(', ');

                if (selectedOptions) {
                  const productAttribute = document.createElement('div');
                  productAttribute.classList.add('product-brand');
                  productAttribute.innerText = `${selectedOptions}`;
                  ctx.appendChild(productAttribute);
                }
              } else if (attr.value) {
                const productAttribute = document.createElement('div');
                productAttribute.classList.add('product-brand');
                productAttribute.innerText = `${attr.value}`;
                ctx.appendChild(productAttribute);
              }
            }
          });
        },
        EmptyCart: (ctx) => {
          // Runs on mount
          const emptyCart = document.createElement('div');
          emptyCart.innerText = 'Your cart is empty';
          ctx.appendChild(emptyCart);
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

  // summary cartList button delete text
  AddTextToDeleteItemCart(i18n);

  // move cuppons to cart-order-summary__primary
  const SectorCupons = document.querySelector('.cart-order-summary__content .cart-order-summary__coupons');
  const summaryPrimary = document.querySelector('.cart__order-summary');
  if (SectorCupons && summaryPrimary) {
    summaryPrimary.appendChild(SectorCupons);
  }

  // NOTE: This button is a PayPal iframe on ulta.com
  const SectorCheckoutButton = document.querySelector('.cart-order-summary__entry.cart-order-summary__primaryAction');
  if (SectorCheckoutButton) {
    const temp = document.createElement('div');
    SectorCheckoutButton.appendChild(temp);
    Prender(html`<${PayPalButton} />`, temp);
    setTimeout(() => {
      const onlyChild = temp.firstElementChild;
      if (onlyChild) temp.replaceWith(onlyChild);
    });
  }

  // add Cancel button for cupons
  const couponAccordion = document.querySelector('.cart-order-summary__coupons .dropin-accordion-section__content-container');
  if (couponAccordion) {
    const observer = new MutationObserver(() => {
      const targetContainer = document.querySelector('.coupon-code-form__action');
      const accordionToggle = document.querySelector('.dropin-accordion-section__flex[aria-label^="Close"]');

      if (accordionToggle && targetContainer) {
        // 1. Add Cancel Button
        if (!targetContainer.querySelector('.cancel-button')) {
          const tempButton = document.createElement('div');
          tempButton.classList.add('cancel-button');
          targetContainer.appendChild(tempButton);

          Prender(html`<${CancelCouponButton} i18n=${i18n}/>`, tempButton);

          const onlyChildButton = tempButton.firstElementChild;
          onlyChildButton.classList.add('cancel-button');
          tempButton.replaceWith(onlyChildButton);
        }

        // 2. Add Coupon Title
        const targetContainerTitle = targetContainer.querySelector('.dropin-input-label-container');
        if (targetContainerTitle && !targetContainerTitle.querySelector('.coupon-label')) {
          const tempTitle = document.createElement('div');
          tempTitle.classList.add('coupon-label');
          targetContainerTitle.prepend(tempTitle);

          Prender(html`<${couponTitle} i18n=${i18n}/>`, tempTitle);

          const onlyChildTitle = tempTitle.firstElementChild;
          onlyChildTitle.classList.add('coupon-label');
          tempTitle.replaceWith(onlyChildTitle);
        }

        // 3. Add Coupon Help Text
        const targetContainerHelp = targetContainer.querySelector('.dropin-input-label-container');
        if (targetContainerHelp && !targetContainerHelp.querySelector('.coupon-help')) {
          const tempHelp = document.createElement('div');
          tempHelp.classList.add('coupon-help');
          targetContainerHelp.appendChild(tempHelp);

          Prender(html`<${couponInputHelp} i18n=${i18n}/>`, tempHelp);

          const onlyChildHelp = tempHelp.firstElementChild;
          onlyChildHelp.classList.add('coupon-help');
          tempHelp.replaceWith(onlyChildHelp);
        }
      }
    });

    observer.observe(document.querySelector('.cart-order-summary__coupons'), {
      childList: true,
      subtree: true,
    });
  }

  // cart summary empty
  const SectorSummaryEmpty = document.querySelector('.cart__order-summary-empty');
  if (SectorSummaryEmpty) {
    const temp = document.createElement('div');
    SectorSummaryEmpty.appendChild(temp);
    const emptySummaryVNode = createEmptySummary(i18n);
    Prender(emptySummaryVNode, temp);
    setTimeout(() => {
      const onlyChild = temp.firstElementChild;
      if (onlyChild) temp.replaceWith(onlyChild);
    });
  }

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

  // Setup listeners for prices and products counts
  setupCartPriceListeners(i18n);
  createNewSummary(cart, i18n, false);

  return Promise.resolve();
}

function isCartEmpty(cart) {
  return cart ? cart.totalQuantity < 1 : true;
}
