import instance from './instance.js';

export async function getAllProducts() {
  const response = await instance.get('products');
  return response.data;
}

export async function getProduct(itemNo) {
  const type = typeof itemNo;
  if (!itemNo || (type !== 'string' && type !== 'number'))
    throw new Error('arg. "itemNo" cannot be empty + type: string or number');

  const {data} = await instance.get(`products/${itemNo}`);
  return data;
}

export async function getFilteredProducts(querystring) {
  let query = '';
  if (typeof querystring === 'object') {
    for (const [key, value] of Object.entries(querystring)) {
      if (Array.isArray(value)) {
        if (!value.length) continue;
        query += `${key}=${value.join(',')}&`;
      } else {
        if (value) query += `${key}=${value}&`;
      }
    }
  } else {
    query = querystring;
  }

  if (query[query.length - 1] === '&') query = query.slice(0, -1);

  const {data} = await instance.get(`products/filter?${query}`);
  return data;
}
