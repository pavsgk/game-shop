import instance from './instance.js';

export async function getSliderItems() {
  const {data} = await instance.get('slides');
  return data;
}
