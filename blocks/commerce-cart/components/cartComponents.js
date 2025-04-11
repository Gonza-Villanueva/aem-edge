/**
 * @author    infinite Team
 * @copyright Copyright(c) 2025 infinite
 * @module    commerce-cart/components/cartComponents
 */

import { h } from '@dropins/tools/preact.js';
import htm from '../../../scripts/htm.js';
import { CustomButton } from '../../../design-system/atoms/customButton/CustomButton.js';

const html = htm.bind(h);

export function listBanner({
  blockColor,
  blockDescription,
  blockCTA,
  blockImage,
}) {
  return html`
    <div class="banner-list-wrapper" style="background-color: ${blockColor}">
      ${blockImage ? html`
        <div class="image-banner">
        <picture>
          <source type="image/webp" media="(max-width: 900px)" srcset="${blockImage.src}" />
          <source type="image/webp" srcset="${blockImage.src}" />
          <img loading="lazy" src="${blockImage.src}" alt="${blockDescription}" width="${blockImage.width}" height="${blockImage.height}"/>
        </picture>
      </div>
      ` : ''}
      </div>
      <div class="description-container">
        <p>${blockDescription}</p>
      </div>
      <div class="link-container">
        <a href="${blockCTA.href}" class="cart-banner-cta">
        ${blockCTA.label}
        </a>
      </div>
    </div>
  `;
}

export function CartBanner({
  blockColor,
  blockTitle,
  blockDescription,
  blockCTA,
  blockImage,
}) {
  return html`
    <div class="cart-banner-wrapper" style="background-color: ${blockColor}">
      ${blockImage ? html`
         <div class="image-banner">
          <picture>
            <source type="image/webp" media="(max-width: 900px)" srcset="${blockImage.src}" />
            <source type="image/webp" srcset="${blockImage.src}" />
            <img loading="lazy" src="${blockImage.src}" alt="${blockTitle}" width="${blockImage.width}" height="${blockImage.height}"/>
          </picture>
        </div>
       ` : ''}
      <div class="cart-banner-content">
        <h3>${blockTitle}</h3>
        <p>${blockDescription}</p>
        <a href="${blockCTA.href}" class="cart-banner-cta">
        ${blockCTA.label}
        </a>
      </div>
    </div>
  `;
}

export function CartInfo({ infoData }) {
  return html`
    <div class="cart-info-wrapper">
      <div class="cart-info-header">
        <h3>${infoData.title}</h3>
        <p>${infoData.lines[0]}</p>
      </div>
      <div class="cart-info-body">
        <div class="cart-info-body__content">
          <a href="${infoData.phoneHref}" title="${infoData.lines[1]}" class="info phone"><span>${infoData.lines[1]}</span></a>
          <a href="${infoData.phoneHref}" title="${infoData.lines[2]}" class="extra"><span>${infoData.lines[2]}</span></a>
        </div>
        <div class="cart-info-body__content">
          <a href="${infoData.cta.href}" title="${infoData.lines[3]}" class="info coms"><span>${infoData.lines[3]}</span></a>
        </div>
      </div>
    </div>
  `;
}

export function PayPalButton() {
  return html`
    <div class="paypal-button-wrapper">
      <${CustomButton} variant="primary paypal-button" size='large'>Pagar con</${CustomButton}>
    </div>
  `;
}

export function CancelCouponButton(i18n) {
  const handleClick = () => {
    const accordionToggle = document.querySelector('.cart-order-summary__coupons .dropin-accordion-section__flex');
    if (accordionToggle) {
      accordionToggle.click();
    }
  };

  return html`
      <${CustomButton}
        variant="tertiary cancel-button"
        size="medium"
        onClick=${handleClick}
      >
      ${i18n?.i18n?.Cart?.PriceSummary?.coupon?.buttonCancel}
      </${CustomButton}>
  `;
}

export function couponTitle(i18n) {
  return html`
      <label for="coupon" class="label required">
        ${i18n?.i18n.Cart?.PriceSummary?.coupon?.inner.title}<span>*</span>
      </label>
  `;
}
export function couponInputHelp(i18n) {
  return html`
      <span class="input-help">
      ${i18n?.i18n.Cart?.PriceSummary?.coupon?.help}
      </span>
  `;
}
