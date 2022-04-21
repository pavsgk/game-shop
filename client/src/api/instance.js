import axios from 'axios';

const useUrl = process.env.REACT_APP_API_URL || 'https://game-shop-fe30.herokuapp.com/api/';

const instance = axios.create({
  baseURL: useUrl,
});

(async () => {
  try {
    await fetch(process.env.REACT_APP_API_URL).then(({status}) =>
      status === 200 ? (instance.defaults.baseURL = process.env.REACT_APP_API_URL) : null,
    );
  } catch {
    instance.defaults.baseURL = 'https://game-shop-fe30.herokuapp.com/api/';
  }
})();

// instance.interceptors.request.use(req => {
//   const recursive = (obj) => {
//     for (const [key, val] in Object.entries(obj)) {
//       if (typeof obj[key] === 'object' && obj[key] !== null) {
//         if (key === 'imageUrls') {
//           delete obj[key];
//         } else {
//           recursive(obj[key]);
//         }
//       }
//     }
//     return obj;
//   }
//   try {
//   const newPayload = JSON.parse(req.data);
//   console.log(newPayload);
//   } catch {}
//   return req;
// })

instance.interceptors.response.use(async (res) => {
  const prefix =
    'https://script.google.com/macros/s/AKfycbyg5R0eaQEFi079LZnWWuXPh9eI2TLhEAyj0_3DPLlINTyNBGf4WbeQQSiMQ7M9cuo7/exec?id=';
  console.log(res.data);
  if (res.data.imageUrls) {
    const images = await Promise.all(
      res.data.imageUrls.map((e) => {
        if (!e.includes('google')) return Promise.resolve({data: `(${e})`});
        return axios.get(prefix + e.slice(e.lastIndexOf('=') + 1));
      }),
    );
    res.data.imageUrls = images.map(({data}) => data.slice(1, -1));
    return res;
  }

  if (Array.isArray(res.data) || typeof res.data === 'object') {
    const layer = res.data?.products ? res.data.products : res.data;
    const faceImagesToLoad = [];
    if (!layer[0]?.imageUrls) return res;
    layer.forEach((el) => {
      if (!el.imageUrls[0].includes('google')) {
        faceImagesToLoad.push(Promise.resolve({data: `(${el.imageUrls[0]})`}));
        return;
      }
      const faceImageId = el.imageUrls[0].slice(el.imageUrls[0].lastIndexOf('=') + 1);
      faceImagesToLoad.push(axios.get(prefix + faceImageId));
    });
    const faceImages = await Promise.all(faceImagesToLoad);
    faceImages.forEach((el, index) => {
      layer[index].imageUrls[0] = el.data.slice(1, -1);
    });
  }

  return res;
});

export default instance;
