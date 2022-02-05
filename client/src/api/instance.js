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

// fetch(localBaseUrl)
//   .then(({status}) => (status === 200 ? (instance.defaults.baseURL = localBaseUrl) : null))
//   .catch((err) => console.log('localhost unreachable, switching to Heroku'));

export default instance;
