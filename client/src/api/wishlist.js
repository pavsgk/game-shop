import instance from './instance.js';

export async function getWishedProducts() {
  const {data} = await instance.get('wishlist');
  return data.products;
}

export async function addProductToWishlist(itemNo) {
  const {data} = await instance.put(`/wishlist/${itemNo}`);
  return data.products;
}

export async function removeProductFromWishlist(itemNo) {
  const {data} = await instance.delete(`wishlist/${itemNo}`);
  return data.products;
}
