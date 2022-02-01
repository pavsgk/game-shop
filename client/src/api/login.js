import instance from './instance.js';

const guest = {
  token: '',
  firstName: '',
  lastName: '',
  login: '',
  email: '',
  telephone: '',
  avaratUrl: '',
  isAdmin: false,
  IsAuthorized: false,
};

export async function getToken(loginOrEmail, password) {
  if (!loginOrEmail || !password)
    throw new Error('arg. "loginOrEmail" and "password" cannot be empty');

  const {data} = await instance.post('customers/login', {
    loginOrEmail,
    password,
  });

  return data.token;
}

export async function getCustomer() {
  if (!instance.defaults.headers.common['Authorization']) return guest;
  const {data} = await instance.get('/customers/customer');
  return data;
}

export function setAuthToken(token) {
  if (token) {
    instance.defaults.headers.common['Authorization'] = token;
  } else {
    delete instance.defaults.headers.common['Authorization'];
  }
}
