import instance from './instance.js';

async function getCatalog() {
  try {
    const response = await instance.get('catalog');
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getCategoryById(id) {
  if (!id || typeof id !== 'string') return null;

  try {
    const response = await instance.get(`catalog/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export {getCatalog, getCategoryById};
