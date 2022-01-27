import instance from './instance.js';

async function getAllProducts() {
  try {
    const response = await instance.get('products');
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export {getAllProducts};
