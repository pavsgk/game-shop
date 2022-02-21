import instance from './instance.js';

export async function createRequestOnTheServer(products) {
  console.log(products, 'prod');
  return await instance.post('cart', products);
}

export async function requestThePresenceOfTheCartOnTheServer(products) {
  return await instance.get('cart');
}

export async function requestAddProductToTheCart(_id) {
  console.log(_id);
  return await instance.put(`cart/${_id}`);
}

export async function requestToDecreaseProductQuantity(_id) {
  console.log(_id);
  return await instance.delete(`cart/product/${_id}`);
}

export async function requestToDeleteProductFromTheCart(_id) {
  console.log(_id);
  return await instance.delete(`cart/${_id}`);
}
