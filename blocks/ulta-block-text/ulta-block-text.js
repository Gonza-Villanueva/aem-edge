/* eslint-disable indent */
export default function decorate(block) {
    const items = Array.from(block.children);

    // Extraer los dos primeros divs
    const firstDiv = items[0];
    const secondDiv = items[1];

    // Verificar si los divs existen
    if (firstDiv && secondDiv) {
        // Obtener el valor de max-width del primer div (contenido de <p>)
        const maxWidthText = firstDiv.querySelector('p')?.textContent.trim();

        // Si el texto es un valor válido (como '584px'), aplicarlo al segundo div
        if (maxWidthText && /^[\d]+px$/.test(maxWidthText)) {
            secondDiv.style.maxWidth = maxWidthText;
            secondDiv.style.margin = '0 auto';
        }
    }

    // Limpiar el bloque original sin hacer más cambios
    block.innerHTML = '';
    block.appendChild(secondDiv);
    block.classList.add('ulta-block-text');
}
