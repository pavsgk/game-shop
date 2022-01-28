import instance from './instance.js';

export async function getCatalog() {
  try {
    const {data} = await instance.get('catalog');
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getCategoryById(id) {
  if (!id || typeof id !== 'string')
    throw new Error('arg "id" cannot be empty and should be a string');

  try {
    const {data} = await instance.get(`catalog/${id}`);
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
