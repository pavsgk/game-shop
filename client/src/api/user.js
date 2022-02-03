import instance from './instance.js';

export async function getToken(loginOrEmail, password) {
  if (!loginOrEmail || !password)
    throw new Error('arg. "loginOrEmail" and "password" cannot be empty');

  const {data} = await instance.post('customers/login', {
    loginOrEmail,
    password,
  });

  return data.token;
}

export async function getUserData() {
  const {data} = await instance.get('/customers/customer');
  return {
    ...data,
    token: instance.defaults.headers.common['Authorization'],
  };
}

export function setAuthToken(token) {
  if (token) {
    instance.defaults.headers.common['Authorization'] = token;
  } else {
    delete instance.defaults.headers.common['Authorization'];
  }
}
