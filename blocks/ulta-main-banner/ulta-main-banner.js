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
        let text = element.textContent.trim();
        if (index === 0) {
          element.classList.add('ulta-banner-tagline');
          // Limitar a 50 caracteres el tagline
          if (text.length > 20) {
            element.textContent = `${text.substring(0, 20)}...`;
          }
        } else if (index === 1) {
          element.classList.add('ulta-banner-title');
          // Limitar a 100 caracteres el título
          if (text.length > 20) {
            element.textContent = `${text.substring(0, 20)}...`;
          }
        } else if (index === 2) {
          element.classList.add('ulta-banner-description');
          // Limitar a 200 caracteres la descripción
          if (text.length > 20) {
            element.textContent = `${text.substring(0, 20)}...`;
          }
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

    let buttonText = textElement.textContent.trim();
    // Limitar el texto del botón a 20 caracteres
    if (buttonText.length > 15) {
      buttonText = `${buttonText.substring(0, 15)}...`;
    }

    textElement.textContent = buttonText;

    textElement.classList.add('ulta-button-text');
    button.appendChild(textElement);

    moveInstrumentation(buttonContainer, button);
    buttonContainer.remove();

    contentWrapper.appendChild(button);
  }

  block.appendChild(contentWrapper);
}
