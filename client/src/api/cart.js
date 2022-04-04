import instance from './instance.js';
import {getFromLS, removeFromLS, saveToLS} from '../utils/localStorage';

export async function requestThePresenceOfTheCartOnTheServer() {
  const {data} = await instance.get('cart');
  return data;
}

export async function requestToUpdateCartFromLs() {
  const updatedCart = {products: getFromLS('cart')};
  const {data} = await instance.put('cart', updatedCart);
  return data;
}

export async function requestToAddMoreThanOneProductsToTheCart(cartItem) {
  const updatedCart = {products: cartItem};
  const {data} = await instance.put('cart', updatedCart);
  return data;
}

export async function requestAddProductToTheCart(_id) {
  return await instance.put(`cart/${_id}`);
}

export async function requestToDecreaseProductQuantity(_id) {
  return await instance.delete(`cart/product/${_id}`);
}

export async function requestToDeleteProductFromTheCart(_id) {
  return await instance.delete(`cart/${_id}`);
}

export async function requestToDeleteCart() {
  return await instance.delete(`cart`);
}
