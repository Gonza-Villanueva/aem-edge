// components/MainBanner.js
// @ts-ignore
import { h } from '@dropins/tools/preact.js';
import htm from '../../../scripts/htm.js';
import { CustomButton } from '../../design-system/atoms/customButton/CustomButton.js';

const html = htm.bind(h);

export const MainBanner = ({
  imageDesktop,
  imageMobile,
  imageDesktopWidth,
  imageDesktopHeight,
  imageAlt,
  highlightText,
  tagline,
  title,
  description,
  buttonText,
  buttonLink,
  styleDesktop,
  styleMobile,
}) => html`
    <section className="main-banner">
      <picture className="main-banner__image">
        <source srcset=${imageMobile} media="(max-width: 900px)" />
        <img loading="lazy" src=${imageDesktop} alt=${imageAlt} height="${imageDesktopHeight}" width="${imageDesktopWidth}" />
      </picture>

      <div className=${`main-banner__content ${styleDesktop} ${styleMobile}`}>
        ${highlightText && html`<p className="main-banner__highlight">${highlightText}</p>`}
        ${tagline && html`<p className="main-banner__tagline">${tagline}</p>`}
        ${title && html`<h2 className="main-banner__title">${title}</h2>`}
        ${description && html`<p className="main-banner__description">${description}</p>`}
        ${buttonText && buttonLink && html`
            <${CustomButton}
              variant="primary"
              size="medium"
              href=${buttonLink}
            >
              ${buttonText}
            </${CustomButton}>
          `}
      </div>
    </section>
  `;

export default MainBanner;
