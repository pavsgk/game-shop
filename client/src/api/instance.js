import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/',
  timeout: 3000,
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded'
  // }
});

export default instance;
