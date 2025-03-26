import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  console.log('Decorating cart-purchase-banner block', block);

  const items = Array.from(block.children);

  // Extraer valores desde los elementos
  const imageBannerElement = items.shift(); // Imagen del Banner
  const textColorElement = items.shift(); // Color del background
  const descriptionElement = items.shift(); // Descripción
  const linkTextElement = items.shift(); // Texto del link
  const linkUrlElement = items.shift(); // URL del link
  const logoArrowElement = items.shift(); // Imagen del logo de la flecha

  // Obtener valores directamente desde el contenido del AEM
  const imageBannerSrc = imageBannerElement?.querySelector('img')?.src || '';
  const backgroundColor = textColorElement?.textContent.trim() || ''; // Usar el color para el fondo
  const description = descriptionElement?.innerHTML || '';
  const linkText = linkTextElement?.innerHTML || '';
  const linkUrl = linkUrlElement?.querySelector('a')?.href || '';
  const logoArrowSrc = logoArrowElement?.querySelector('img')?.src || '';

  // Depuración: Verificar si el color de fondo tiene un valor correcto
  console.log('backgroundColor:', backgroundColor);

  // Crear el contenedor principal del banner
  const bannerContent = document.createElement('div');
  bannerContent.classList.add('cart-purchase-banner');
  bannerContent.style.backgroundColor = backgroundColor;

  // Crear un contenedor para la imagen y la descripción
  const imageAndDescriptionContainer = document.createElement('div');
  imageAndDescriptionContainer.classList.add('cart-purchase-banner-image-description-container');

  // Manejo de la imagen del banner
  if (imageBannerSrc) {
    const bannerImage = document.createElement('img');
    bannerImage.classList.add('cart-purchase-banner-image');
    bannerImage.src = imageBannerSrc;
    moveInstrumentation(imageBannerElement, bannerImage);
    imageAndDescriptionContainer.appendChild(bannerImage); // Añadir imagen al contenedor
  }

  // Manejo de la descripción
  if (description) {
    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('cart-purchase-banner-description');
    descriptionDiv.innerHTML = description;
    moveInstrumentation(descriptionElement, descriptionDiv);
    imageAndDescriptionContainer.appendChild(descriptionDiv); // Añadir descripción al contenedor
  }

  // Añadir el contenedor de imagen y descripción al contenido del banner
  bannerContent.appendChild(imageAndDescriptionContainer);

  // Manejo del enlace
  if (linkUrl) {
    const bannerLink = document.createElement('a');
    bannerLink.classList.add('cart-purchase-banner-link');
    bannerLink.href = linkUrl;
    // Agregar el texto del enlace dentro del enlace
    const linkTextDiv = document.createElement('div');
    linkTextDiv.innerHTML = linkText;
    bannerLink.appendChild(linkTextDiv);

    // Manejo de la imagen de la flecha dentro del enlace
    if (logoArrowSrc) {
      const logoArrowImage = document.createElement('img');
      logoArrowImage.classList.add('cart-purchase-banner-arrow');
      logoArrowImage.src = logoArrowSrc;
      moveInstrumentation(logoArrowElement, logoArrowImage);
      bannerLink.appendChild(logoArrowImage); // Añadir la flecha al enlace
    }

    moveInstrumentation(linkTextElement, bannerLink);
    bannerContent.appendChild(bannerLink);
  }

  // Reemplazar el contenido original del bloque con la nueva estructura
  block.innerHTML = '';
  block.appendChild(bannerContent);
}
