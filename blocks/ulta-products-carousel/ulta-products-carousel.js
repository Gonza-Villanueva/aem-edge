/**
 * @copyright   Copyright © 2025 - Infinite
 * @author      Infinite Team
 * @category    ulta-products-carousel
 * @module      blocks/ulta-products-carousel
 */

import { moveInstrumentation } from '../../scripts/scripts.js';

// URL del JSON de productos (esto cambiará cuando se conecte con GraphQL)
const jsonURL = 'products.json';

export default async function decorate(block) {
  console.log(block);

  const response = await fetch(jsonURL);
  const data = await response.json();
  const { products } = data;

  console.log(products);
}
