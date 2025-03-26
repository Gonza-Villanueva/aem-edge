import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('ulta-banner');

  const [
    imageDesktopContainer,
    imageMobileContainer,
    contentContainer,
    buttonContainer,
  ] = block.children;

  if (imageDesktopContainer && imageMobileContainer) {
    imageDesktopContainer.classList.add('ulta-banner-wrapper');
    imageMobileContainer.classList.add('ulta-banner-wrapper');

    const imgDesktop = imageDesktopContainer.querySelector('img');
    const imgMobile = imageMobileContainer.querySelector('img');

    if (imgDesktop) {
      imgDesktop.classList.add('ulta-banner-img', 'ulta-banner-img-desktop');
    }
    if (imgMobile) {
      imgMobile.classList.add('ulta-banner-img', 'ulta-banner-img-mobile');
    }
  }

  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('ulta-banner-content');

  const textsContainer = document.createElement('div');
  textsContainer.classList.add('ulta-banner-texts');

  if (contentContainer) {
    const contentElements = Array.from(contentContainer.children);

    contentElements.forEach((element) => {
      const text = element.textContent.trim();
      if (text.startsWith('ulta-banner')) {
        contentWrapper.classList.add(text);
        element.remove();
      }
    });

    contentElements.forEach((element, index) => {
      if (element.isConnected) {
        if (index === 0) {
          element.classList.add('ulta-banner-tagline');
        } else if (index === 1) {
          element.classList.add('ulta-banner-title');
        } else if (index === 2) {
          element.classList.add('ulta-banner-description');
        }
        textsContainer.appendChild(element);
      }
    });
  }

  moveInstrumentation(contentContainer, textsContainer);
  contentContainer.remove();
  contentWrapper.appendChild(textsContainer);

  if (buttonContainer) {
    const [textElement, hrefElement] = buttonContainer.children;
    const buttonHref = hrefElement?.querySelector('p')?.textContent.trim();

    const button = document.createElement('a');
    button.href = buttonHref || '#';
    button.className = 'ulta-banner-button';

    textElement.classList.add('ulta-button-text');
    button.appendChild(textElement);

    moveInstrumentation(buttonContainer, button);
    buttonContainer.remove();

    contentWrapper.appendChild(button);
  }

  block.appendChild(contentWrapper);
}
