import axios from 'axios';

const useUrl = process.env.REACT_APP_API_URL || 'https://game-shop-fe30.herokuapp.com/api/';

const instance = axios.create({
  baseURL: useUrl,
});

// const localBaseUrl = 'http://localhost:5000/api/';
// const remoteBaseUrl = 'https://game-shop-fe30.herokuapp.com/api/';

// const instance = axios.create({
//   baseURL: remoteBaseUrl,
// });

(async () => {
  try {
    await fetch(process.env.REACT_APP_API_URL)
      .then(({status}) => status === 200 ? instance.defaults.baseURL = process.env.REACT_APP_API_URL : null); 
  } catch {
    instance.defaults.baseURL = 'https://game-shop-fe30.herokuapp.com/api/';
  }
})()

export default instance;
