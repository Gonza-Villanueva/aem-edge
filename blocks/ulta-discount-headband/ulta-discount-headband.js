import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // console.log('Decorating ulta-discount-headband block', block);

  const items = Array.from(block.children);

  // Extraer valores desde los elementos
  const discountTextElement = items.shift(); // Texto del descuento
  const textColorElement = items.shift(); // Color del texto del descuento
  const discountCodeElement = items.shift(); // Texto del código de descuento
  const linkTextElement = items.shift(); // Texto del link
  const linkUrlElement = items.shift(); // URL del link
  const backgroundColorElement = items.shift(); // Color de fondo

  // Obtener valores directamente desde el contenido del AEM
  const discountText = discountTextElement?.innerHTML || '';
  const textColor = textColorElement?.textContent.trim() || '';
  const discountCode = discountCodeElement?.innerHTML || '';
  const linkText = linkTextElement?.innerHTML || '';
  const linkUrl = linkUrlElement?.querySelector('a')?.href || '';
  const backgroundColor = backgroundColorElement?.textContent.trim() || '';

  // Asignar el background color a la clase existente
  block.closest('.ulta-discount-headband-wrapper')?.style.setProperty('background-color', backgroundColor);

  // Crear el contenedor principal del cintillo de descuento
  const discountContent = document.createElement('div');
  discountContent.classList.add('ulta-discount-headband');
  discountContent.style.backgroundColor = backgroundColor;
  discountContent.style.color = textColor;

  // Manejo del texto del descuento
  const discountTextDiv = document.createElement('div');
  discountTextDiv.classList.add('ulta-discount-headband-text');
  discountTextDiv.style.color = textColor;
  discountTextDiv.innerHTML = discountText;
  moveInstrumentation(discountTextElement, discountTextDiv);

  // Manejo del código de descuento
  const discountCodeDiv = document.createElement('div');
  discountCodeDiv.classList.add('ulta-discount-headband-code');
  discountCodeDiv.innerHTML = discountCode;
  moveInstrumentation(discountCodeElement, discountCodeDiv);

  // Manejo del enlace
  const discountLink = document.createElement('a');
  discountLink.classList.add('ulta-discount-headband-link');
  discountLink.href = linkUrl;
  discountLink.innerHTML = linkText;
  moveInstrumentation(linkTextElement, discountLink);

  // Estructura final del bloque
  discountContent.appendChild(discountTextDiv);
  discountContent.appendChild(discountCodeDiv);
  discountContent.appendChild(discountLink);

  // Reemplazar el contenido original del bloque con la nueva estructura
  block.innerHTML = '';
  block.appendChild(discountContent);
}
