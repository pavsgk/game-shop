import instance from './instance';

export async function getAllFilters() {
  try {
    const response = await instance.get('filters');
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getFiltersByType(type) {
  if (!type || typeof type !== 'string') return null;

  try {
    const response = await instance.get(`filters/${type}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
