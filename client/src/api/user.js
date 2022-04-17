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

export async function createNewUser(newCustomer) {
  if (!newCustomer) throw new Error('arg. "newCustomer" cannot be empty');

  return await instance.post('/customers', newCustomer);
}

export async function updateUser(updatedCustomer) {
  if (!updatedCustomer) throw new Error('arg. "updatedCustomer" cannot be empty');

  return await instance.put('/customers', updatedCustomer);
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
