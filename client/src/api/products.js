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
