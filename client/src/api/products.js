import instance from './instance.js';

export async function getAllProducts() {
  try {
    const response = await instance.get('products');
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getProduct(itemNo) {
  const type = typeof itemNo;
  if (!itemNo || (type !== 'string' && type !== 'number'))
    throw new Error('arg. "itemNo" cannot be empty + type: string or number');

  try {
    const {data} = await instance.get(`products/${itemNo}`);
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
