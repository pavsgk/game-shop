import instance from './instance.js';

export async function getAllFilters() {
  const {data} = await instance.get('filters');
  return data;
}

export async function getFiltersByType(type) {
  if (!type || typeof type !== 'string')
    throw new Error('arg "type" cannot be empty and should be a string');

  const {data} = await instance.get(`filters/${type}`);
  return data;
}

export async function getFiltersTree() {
  const {data} = await instance.get('filters');
  const result = {};

  data.forEach(({type, name}) => {
    if (!result[type]) result[type] = [];
    if (!result[type].includes(name)) result[type].push(name);
  });
  return result;
}
