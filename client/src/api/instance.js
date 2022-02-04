import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:5000/api/',
  baseURL: 'https://game-shop-fe30.herokuapp.com/api/',
  timeout: 3000,
});

export default instance;
