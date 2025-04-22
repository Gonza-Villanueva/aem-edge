/* eslint-disable no-unused-vars */
import { h, Fragment, Component, render } from '@dropins/tools/preact.js';
import htm from '../../../scripts/htm.js';
import { renderPrice } from '../../../scripts/commerce.js';
import { Button } from '@dropins/tools/components.js';
import createModal from '../../atoms/customModal/customModal.js';
import { CustomMessage } from '../../atoms/customMessage/customMessage.js';
import ProductOptionsModal from './customProductCardOptionsModal.js';

const html = htm.bind(h);

let modalOptions;
let modalOptionsContainer;

/**
 * Displays a modal with the provided content.
 * @param {Object} content - The content to render inside the modal.
 */
const showModalOption = async (content) => {
  modalOptionsContainer = document.createElement('div');
  render(h(content.type, content.props), modalOptionsContainer);

  modalOptions = await createModal([modalOptionsContainer], 'slide', 'right');
  modalOptions.showModal();
};

/**
 * Removes the currently displayed modal if any.
 */
const removeModalOption = () => {
  if (!modalOptions) return;
  modalOptions.removeModal();
  modalOptions = null;
  modalOptionsContainer = null;
};

/**
 * Component representing the product card.
 * @extends Component
 */
class ProductCard extends Component {
  /**
   * Creates an instance of ProductCard.
   * @param {Object} props - The properties passed to the component.
   */
  constructor(props) {
    super(props);

    this.formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    this.state = {
      isMobile: window.innerWidth < 900,
      showMessage: false,
      messageType: 'success',
      messageDescription: '',
    };

    this.handleResize = this.handleResize.bind(this);
    this.showMessage = this.showMessage.bind(this);
  }

  /**
   * Sets up the resize event listener on mount.
   */
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  /**
   * Cleans up the resize event listener on unmount.
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  /**
   * Handles window resize and updates the mobile state.
   */
  handleResize() {
    this.setState({ isMobile: window.innerWidth < 900 });
  }

  /**
   * Displays a temporary message (success, error, etc.).
   * @param {'success' | 'error' | 'info' | 'warning'} type - The type of message.
   * @param {string} description - The description to show in the message.
   */
  showMessage(type, description) {
    this.setState({
      showMessage: true,
      messageType: type,
      messageDescription: description,
    });

    setTimeout(() => {
      this.setState({ showMessage: false });
    }, 10000);
  }

  /**
   * Renders the product card component.
   * @param {Object} props - The properties passed to the component.
   * @param {Array} props.products - The list of products to display.
   * @param {Object} props.secondLastProduct - The reference to the second last product element.
   * @param {boolean} props.loading - Whether the component is in loading state.
   * @param {number} props.currentPageSize - The current page size.
   * @param {string} props.linkPdp - The link to the product detail page.
   * @param {string} props.img - The URL of the product image.
   * @param {string} props.name - The name of the product.
   * @param {string} [props.badge] - The URL of the badge image (optional).
   * @param {boolean} [props.wishlist] - Whether the product is in the wishlist (optional).
   * @param {string} [props.wishlistLink] - The link to the wishlist (optional).
   * @param {boolean} [props.wishlistAdded] - Whether the product is added to the wishlist (optional).
   * @param {Array} [props.tag] - The list of tags for the product (optional).
   * @param {number} [props.colorVariation] - The number of color variations (optional).
   * @param {string} [props.brand] - The brand of the product (optional).
   * @param {number} [props.ranking] - The ranking percentage of the product (optional).
   * @param {number} [props.rankPoints] - The ranking points of the product (optional).
   * @param {number} [props.rankingComment] - The number of ranking comments (optional).
   * @param {number} [props.specialPrice] - The special price of the product (optional).
   * @param {number} props.normalPrice - The normal price of the product.
   * @param {string} [props.promo] - The promotional text for the product (optional).
   * @param {string} [props.blockButtonText] - The text for the block button (optional).
   * @param {string} [props.addToCartLink] - The link to add the product to the cart (optional).
   * @param {Object} props.labels - Labels to translate.
   * @returns {JSX.Element} The rendered component.
   */
  render({
    products, secondLastProduct, loading, currentPageSize, linkPdp = '', img = '', name = '', badge = '', wishlist = false, wishlistLink = '', wishlistAdded = false, colorVariation = 0, brand = '', ranking = 50, rankPoints = 3, rankingComment = 2, specialPrice = 0, normalPrice = 0, promo = '', blockButtonText = '', addToCartLink = '', labels
  }) {
    const { showMessage, messageType, messageDescription } = this.state;

    if (loading) {
      return html`<div class="product-list product-list--loading"></div>`;
    }

    const addToCart = async (product) => {
      try {
        const { addProductsToCart } = await import('@dropins/storefront-cart/api.js');

        const payload = [{
          sku: product.sku,
          quantity: 1,
          virtual: product.productType === 'virtual' || false,
          productType: product.__typename?.toLowerCase() || 'simple',
        }];

        await addProductsToCart(payload);
        this.showMessage('success', labels?.PLP?.AddToCart?.Message?.Success);
      } catch (error) {
        this.showMessage('error', labels?.PLP?.AddToCart?.Message?.Error);
      }
    };

    const addToWishlist = async (product) => {
      try {
        const isLoggedIn = window?.CustomerData?.isLoggedIn;

        if (!isLoggedIn) {
          window.location.href = `/login?redirect_url=${encodeURIComponent(window.location.href)}`;
          return;
        }

        const values = { sku: product.sku };

        if (values?.sku) {
          const wishlist = await import('../../scripts/wishlist/api.js');
          await wishlist.addToWishlist(values.sku);

          this.showMessage('success', labels?.PLP?.Wishlist?.Message?.Success);
        }
      } catch (error) {
        this.showMessage('error', labels?.PLP?.Wishlist?.Message?.Error);
      }
    };

    return html`
      ${showMessage && html`
        <${CustomMessage}
          type=${messageType}
          variant="snackbar"
          description=${messageDescription}
          showCloseButton=${true}
          onClose=${() => this.setState({ showMessage: false })}
        />
      `}

      ${products.items.map((product, index) => {
        const imageUrl = product.images && product.images.length > 0 ? product.images[0].url : img;
        const colorOption = product.options && product.options.find(option => option.id === "ulta_color");
        const linkPdp = '/products/' + product.urlKey + '/' + product.sku;

        // Labels - Placeholders
        const labelButtonAddtoCartMobile = labels?.PLP?.ProductCard?.Button?.AddToCartMobile;
        const labelButtonAddtoCart = labels?.PLP?.ProductCard?.Button?.AddToCart;
        const labelButtonOptions = labels?.PLP?.ProductCard?.Button?.Options;
        const labelButtonWishlist = labels?.ProductCard?.Button?.Wishlist;
        const labelColorTag = labels?.ProductCard?.ColorTag?.label;

        // Calculate ranking points
        const maxRank = 5;
        const rankPoints = (ranking / 100) * maxRank;

        return html`
          <div class="product-card" ref=${index === products.items.length - 2 ? secondLastProduct : null}>
            <${Button}
              variant="icon"
              className=${`product-card__wishlist-button ${product.wishlistAdded ? 'product-card__wishlist-button--remove' : ''}`}
              onClick=${() => addToWishlist(product)}
              aria-label="${labelButtonWishlist}"
            />
            <a href=${product.url || linkPdp} class="product-card__link">
              <div class="product-card__image-container">
                <img src=${imageUrl} alt=${product.name || name} class="product-card__image" />
                ${product.badge || badge ? html`
                  <img src=${product.badge || badge} alt="Badge" class="product-card__badge" />` : ''
                }
                <div class="product-card__tag-container">
                  ${Array.isArray(product.tag) ? product.tag.map((t) => html`<div class="product-card__tag">${t}</div>`) : ''}
                </div>
                ${colorOption && colorOption.values && colorOption.values.length > 0
                  ? html`
                    <div class="product-card__color-variation">${colorOption.values.length} ${labelColorTag}</div>` : ''
                }
              </div>
            </a>
            <div class="product-card__info">
              <div class="product-card__brand">
                ${(product.attributes?.find(attr => attr.name === 'ulta_marca')?.value) || brand}
              </div>
              <a href=${product.url || linkPdp} class="product-card__name">${product.name || name}</a>
              <div class="product-card__stars-wrapper">
                ${product.ranking || ranking ? html`
                  <div class="product-card__stars" style="--rating: ${product.ranking || ranking}%;"></div>
                  <div class="product-card__stars-points">${product.rankPoints || rankPoints}</div>
                  <div class="product-card__stars-comments">(${product.rankingComment || rankingComment})</div>
                ` : ''}
              </div>
              <div class="product-card__price">
                ${renderPrice(product, this.formatter.format, html, Fragment)}
              </div>
              <div class="product-card__promo">
                ${product.promo || promo ? html`
                  <span>${product.promo || promo}</span>
                ` : ''}
              </div>
            </div>
            <div class="product-card__button">
              ${product.options && product.options.length > 0 
                ? html`
                  <${Button} variant="secondary" onClick=${ async () => {
                    const content = h(ProductOptionsModal, {
                      product,
                      onAddToCart: async (variant) => {
                        const { addProductsToCart } = await import('@dropins/storefront-cart/api.js');
                        await addProductsToCart([{
                          sku: variant.sku,
                          quantity: 1,
                          productType: 'simple',
                          virtual: false
                        }]);
                      },
                      labels
                    });
                    await showModalOption(content);
                  }}>${labelButtonOptions}</${Button}>`
                : html`<${Button} variant="primary" onClick=${() => addToCart(product)}>${this.state.isMobile ? labelButtonAddtoCartMobile : labelButtonAddtoCart}</${Button}>`
              }
            </div>
          </div>
        `;
      })}`;
  }
}

export default ProductCard;
