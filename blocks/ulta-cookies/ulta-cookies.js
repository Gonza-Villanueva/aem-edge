import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const items = Array.from(block.children);

  // Extraer el color de fondo del primer elemento
  const backgroundElement = items.shift();
  let backgroundColor = '000000'; // Color por defecto

  if (backgroundElement) {
    let colorText = backgroundElement.textContent.trim() || '000000';

    // Asegurar que el color comience con '#'
    if (!colorText.startsWith('#')) {
      colorText = `#${colorText}`;
    }

    backgroundColor = colorText; // Asignar el color procesado
  }

  // Identificar los demás elementos en el bloque
  const cookieTextElement = items.shift(); // Segundo div (Texto de cookies)
  const acceptButtonElement = items.shift(); // Tercer div (Botón "Aceptar todas las cookies")

  // Crear el contenedor principal del banner de cookies
  const cookieContent = document.createElement('div');
  cookieContent.classList.add('ulta-cookies-content');
  cookieContent.style.backgroundColor = backgroundColor; // Aplicar color dinámico

  // Crear el botón de cierre con la imagen de la "X"
  const closeButton = document.createElement('button');
  closeButton.classList.add('ulta-cookies-close');
  closeButton.setAttribute('aria-label', 'Cerrar');

  const closeIcon = document.createElement('img');
  closeIcon.src = 'https://author-p34631-e1321407.adobeaemcloud.com/content/dam/learning-wysiwyg-con-edge-delivery-services/icons/X.svg';
  closeIcon.alt = 'Cerrar';
  closeIcon.classList.add('ulta-cookies-close-icon');

  closeButton.appendChild(closeIcon);

  // Manejo del texto de cookies
  const cookieTextDiv = document.createElement('div');
  cookieTextDiv.classList.add('ulta-cookies-text');

  if (cookieTextElement) {
    cookieTextDiv.innerHTML = cookieTextElement.innerHTML;
    moveInstrumentation(cookieTextElement, cookieTextDiv);
  }

  // Manejo del botón de aceptación como un <a> con texto adentro
  const acceptButtonLink = document.createElement('a');
  acceptButtonLink.classList.add('ulta-cookies-accept');
  acceptButtonLink.href = '#'; // Puedes cambiar esto si hay una URL específica

  if (acceptButtonElement) {
    acceptButtonLink.innerHTML = acceptButtonElement.innerHTML;
    moveInstrumentation(acceptButtonElement, acceptButtonLink);
  } else {
    acceptButtonLink.textContent = 'ACEPTAR TODAS LAS COOKIES';
  }

  // Estructura final del bloque
  cookieContent.appendChild(closeButton);
  cookieContent.appendChild(cookieTextDiv);
  cookieContent.appendChild(acceptButtonLink);

  // Reemplazar el contenido original del bloque con la nueva estructura
  block.innerHTML = '';
  block.appendChild(cookieContent);

  // Agregar evento para cerrar el banner
  closeButton.addEventListener('click', () => {
    cookieContent.style.display = 'none';
  });
}
