import instance from './instance.js';

export async function getCatalog() {
  const {data} = await instance.get('catalog');
  return data;
}

export async function getCategoryById(id) {
  if (!id || typeof id !== 'string')
    throw new Error('arg "id" cannot be empty and should be a string');

  const {data} = await instance.get(`catalog/${id}`);
  return data;
}
