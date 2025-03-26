import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const items = Array.from(block.children);

  // Extraer el título del bloque
  const titleElement = items.shift();
  const blockTitleText = titleElement?.innerHTML.trim();

  // Crear contenedor principal
  const container = document.createElement('div');
  container.classList.add('ulta-corporate-commitments-container');

  // Crear el título del bloque
  const titleContainer = document.createElement('div');
  titleContainer.classList.add('ulta-corporate-commitments-header');

  const titleH2 = document.createElement('h3');
  titleH2.innerHTML = blockTitleText;
  moveInstrumentation(titleElement, titleH2);
  titleContainer.appendChild(titleH2);

  // Contenedor de los compromisos
  const commitmentsWrapper = document.createElement('div');
  commitmentsWrapper.classList.add('ulta-corporate-commitments-wrapper');

  // Iterar sobre los elementos restantes (cada compromiso)
  items.forEach((item) => {
    const imgElement = item.querySelector('img');
    const imgSrc = imgElement?.src || '';
    const imgAlt = imgElement?.alt || 'Corporate Commitment Image';

    // Extraer título y descripción sin modificar el contenido richText
    const textDivs = Array.from(item.children).filter((div) => div.querySelector('p') || div.querySelector('a'));

    const titleDiv = textDivs[0] || null;
    const descriptionDiv = textDivs[1] || null;
    const buttonParagraph = textDivs[2]?.querySelector('p') || null;
    const linkElement = item.querySelector('a');
    const linkUrl = linkElement?.href || '#';

    // Crear estructura de cada compromiso
    const commitmentItem = document.createElement('div');
    commitmentItem.classList.add('ulta-corporate-commitment');

    // Imagen
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('ulta-corporate-commitment-image');

    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = imgAlt;
    moveInstrumentation(imgElement, img);
    imageContainer.appendChild(img);

    // Información del compromiso
    const infoContainer = document.createElement('div');
    infoContainer.classList.add('ulta-corporate-commitment-info');

    // Título (conservando richText)
    if (titleDiv) {
      const title = document.createElement('div');
      title.classList.add('ulta-corporate-commitment-title');
      title.innerHTML = titleDiv.innerHTML;
      moveInstrumentation(titleDiv, title);
      infoContainer.appendChild(title);
    }

    // Descripción (conservando richText)
    if (descriptionDiv) {
      const description = document.createElement('div');
      description.classList.add('ulta-corporate-commitment-description');
      description.innerHTML = descriptionDiv.innerHTML;
      moveInstrumentation(descriptionDiv, description);
      infoContainer.appendChild(description);
    }

    // Botón
    const button = document.createElement('a');
    button.classList.add('ulta-corporate-commitment-button');
    button.href = linkUrl;

    const buttonTextElement = document.createElement('p');
    buttonTextElement.textContent = buttonParagraph?.textContent.trim() || '';
    moveInstrumentation(buttonParagraph, buttonTextElement);

    button.appendChild(buttonTextElement);
    infoContainer.appendChild(button);

    // Estructura final del compromiso
    commitmentItem.appendChild(imageContainer);
    commitmentItem.appendChild(infoContainer);

    moveInstrumentation(item, commitmentItem);

    commitmentsWrapper.appendChild(commitmentItem);
  });

  // Armar la estructura final
  container.appendChild(titleContainer);
  container.appendChild(commitmentsWrapper);
  block.innerHTML = '';
  block.appendChild(container);
  block.classList.add('ulta-corporate-commitments');
}
