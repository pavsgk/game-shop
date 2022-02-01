import instance from './instance.js';

export async function getAllFilters() {
  try {
    const {data} = await instance.get('filters');
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getFiltersByType(type) {
  if (!type || typeof type !== 'string')
    throw new Error('arg "type" cannot be empty and should be a string');

  try {
    const {data} = await instance.get(`filters/${type}`);
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getFiltersTree() {
  try {
    const {data} = await instance.get('filters');
    const result = {};
    data.forEach(({type, name}) => {
      if (!result[type]) result[type] = [];
      if (!result[type].includes(name)) result[type].push(name);
    });

    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}
