import {getAllProducts} from './products.js';

export async function parseProductsKeys() {
  const exclude = [
    'name',
    'title',
    'imageUrls',
    'description',
    '__v',
    'date',

    'currentPrice',
    'previousPrice',
    'itemNo',
    '_id',
  ];

  const products = await getAllProducts();
  const result = {};
  products.forEach((product) => {
    for (const [key, value] of Object.entries(product)) {
      if (exclude.includes(key)) continue;
      if (!result.hasOwnProperty(key)) result[key] = [];
      if (Array.isArray(value)) {
        result[key] = [...new Set([...result[key], ...value])];
      } else {
        if (!result[key].includes(value)) result[key].push(value);
      }
    }
  });

  return result;
}
