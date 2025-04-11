/**
 * @author    infinite Team
 * @copyright Copyright(c) 2025 infinite
 * @module    commerce-cart/utils/cartSummaryUtils
 */

import { events } from '@dropins/tools/event-bus.js';
import { h, render as Prender } from '@dropins/tools/preact.js';
import htm from '../../../scripts/htm.js';
import { formatPrice } from './cartDomUtils.js';

const html = htm.bind(h);

export function createNewSummary(cart, i18n, update) {
  // subtotal label
  const count = cart?.totalQuantity || 0;
  const rawLabelSubtotal = i18n?.Cart?.PriceSummary?.subTotal?.label;
  const labelSubtotal = rawLabelSubtotal.replace('{count}', count);
  // subtotal price
  const SubtotalPrice = cart?.subtotal?.includingTax?.value || 0.00;
  const SubtotalCurrency = cart?.subtotal?.includingTax?.currency || 'USD';
  const Subtotal = formatPrice(SubtotalPrice, SubtotalCurrency);
  // total
  const totalPrice = cart?.total?.includingTax?.value || 0.00;
  const totalCurrency = cart?.total?.includingTax?.currency || 'USD';
  const total = formatPrice(totalPrice, totalCurrency);

  const summaryNode = html`
        <div class="cart-order-summary__entry">
            <span class="cart-order-summary__label">${labelSubtotal}</span>
            <span class="cart-order-summary__price">${Subtotal}</span>
        </div>
        <div class="cart-estimate-shipping">
            <span class="cart-estimate-shipping__label"> ${i18n?.Cart?.EstimateShipping?.estimatedDestination} </span>
            <span class="cart-estimate-shipping__price"> ${i18n?.Cart?.PriceSummary?.taxToBeDetermined} </span>
        </div>
        ${cart.appliedDiscounts?.map((discount) => html`
            <div class="cart-order-summary__entry cart-order-summary__discount">
                <span class="cart-order-summary__label">${discount.label}</span>
                <span class="cart-order-summary__price">
                    - ${formatPrice(discount.amount?.value, discount.amount?.currency)}
                </span>
            </div>
        `) || null}
        <div class="cart-order-summary__entry cart-order-summary__total">
            <span class="cart-order-summary__label">${i18n?.Cart?.PriceSummary?.total?.estimated}</span>
            <span class="cart-order-summary__price">${total}</span>
        </div>
    `;

  const containerSelector = '.cart-order-summary__content';
  const wrapperClass = 'summary-wrapper';

  if (!update) {
    const wrapper = document.createElement('div');
    wrapper.className = wrapperClass;
    document.querySelector(containerSelector)?.prepend(wrapper);
  }

  const wrapper = document.querySelector(`${containerSelector} .${wrapperClass}`);
  if (wrapper) {
    Prender(summaryNode, wrapper);
  }
}

// add text to button delete on cartlist
export function AddTextToDeleteItemCart(i18n) {
  const deleteText = i18n?.Cart?.CartItem?.button?.delete;
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const nodesToCheck = [
        ...mutation.addedNodes,
        ...(mutation.type === 'attributes' ? [mutation.target] : []),
        ...Array.from(mutation.target.children || []),
      ];

      nodesToCheck.forEach((node) => {
        if (node.nodeType !== 1) return;

        const buttons = node.matches('.dropin-cart-item__remove')
          ? [node]
          : Array.from(node.querySelectorAll('.dropin-cart-item__remove'));

        buttons.forEach((btn) => {
          if (!btn.querySelector('.remove-text')) {
            const textSpan = document.createElement('span');
            textSpan.className = 'remove-text';
            textSpan.textContent = deleteText;
            btn.innerHTML = '';
            btn.appendChild(textSpan);
          }
        });
      });
    });
  });

  const cartContainer = document.querySelector('.dropin-cart-list__wrapper') || document.body;

  observer.observe(cartContainer, {
    childList: true,
    subtree: true,
    attributes: false,
  });

  document.querySelectorAll('.dropin-cart-item__remove').forEach((btn) => {
    if (!btn.querySelector('.remove-text')) {
      btn.innerHTML = `<span class="remove-text">${deleteText}</span>`;
    }
  });

  return observer;
}

export function createEmptySummary(i18n) {
  const count = 0;
  const CartPriceSummarysubTotallabel = i18n?.Cart?.PriceSummary?.subTotal?.label;
  const CartPriceSummarysubTotallabellabel = CartPriceSummarysubTotallabel.replace('{count}', count);
  const value = formatPrice(0.00, 'USD');

  return html`
    <div class="cart__order-summary dropin-design">
      <div data-testid="cart-order-summary" class="cart-order-summary cart-order-summary__primary">
          <div class="cart-order-summary__heading">
              <div class="cart-order-summary__heading-text">
                  ${i18n?.Cart?.PriceSummary?.orderSummary}
              </div>
              <hr role="separator" class="dropin-divider dropin-divider--primary cart-order-summary__divider-primary">
          </div>
          <div class="cart-order-summary__content">
              <div class="cart-order-summary__entry cart-order-summary__subTotal">
                  <span class="cart-order-summary__label">
                      ${CartPriceSummarysubTotallabellabel}
                  </span>
                  <span data-testid="subtotal" class="dropin-price
                  dropin-price--default
                  dropin-price--small
                  dropin-price--bold
                  cart-order-summary__price">
                      ${value}
                  </span>
              </div>
              <div data-slot="EstimateShipping" class="cart-order-summary__shipping">
                  <div data-slot-html-element="div">
                      <div class="dropin-design">
                          <div data-testid="estimate-shipping" class="cart-estimate-shipping">
                              <span class="cart-estimate-shipping__label">
                                  ${i18n?.Cart?.EstimateShipping?.estimatedDestination}
                              </span>
                              <span class="cart-estimate-shipping__price">
                                  ${i18n?.Cart?.PriceSummary?.taxToBeDetermined}
                              </span>
                          </div>
                      </div>
                  </div>
              </div>
              <div data-testid="total-content" class="cart-order-summary__entry cart-order-summary__total cart-order-summary__total--padded">
                  <span class="cart-order-summary__label cart-order-summary__label--bold">
                      ${i18n?.Cart?.PriceSummary?.total?.estimated}
                  </span>
                  <span data-testid="total-including-tax-actual" class="dropin-price
                  dropin-price--default
                  dropin-price--small
                  dropin-price--bold
                  cart-order-summary__price
                  cart-order-summary__price--bold">
                    ${value}
                  </span>
              </div>
              <div class="cart-order-summary__entry cart-order-summary__primaryAction">
                  <a role="link" href="/checkout" data-testid="checkout-button" tabindex="0"
                  class="dropin-button
                  dropin-button--medium
                  dropin-button--primary
                  dropin-button--primary--disabled">
                      <span>
                          ${i18n?.Cart?.PriceSummary?.checkout}
                      </span>
                  </a>
              </div>
          </div>
      </div>
    </div>
  `;
}

export function setupCartPriceListeners(i18n) {
  events.on('cart/updated', (cart) => {
    createNewSummary(cart, i18n, true);
  });
}
