// utils/api.ts
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API = axios.create({
  baseURL: 'http://172.20.10.6:5000/api',
});
// const API = axios.create({
//   baseURL: 'http://localhost:5000/api',
// });


API.interceptors.request.use(async (req) => {
  const token = await SecureStore.getItemAsync('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
