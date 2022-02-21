import instance from './instance.js';

export async function placeOrder(body) {
  const responce = await instance.post('orders', body).catch(console.log);
  return responce;
}
