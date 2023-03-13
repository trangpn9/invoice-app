/** Custom instance of axios */
import axios from 'axios';
import { BASE_URL } from './constants';

const request = axios.create({
  baseURL: BASE_URL,
});

export const requestPrivate = axios.create({
  withCredentials: true,
  baseURL: BASE_URL, 
});

export const post = async (path: string, payload: {}, options: {}) => {
  const response = await request.post(path, payload, options);
  return response.data;
};

export const get = async (path: string, options: {}) => {
  const response = await request.get(path, options);
  return response.data;
};

export const getPrivate = async (path: string, options: {}) => {
  const response = await requestPrivate.get(path, options);
  return response.data;
};

export const postPrivate = async (path: string, payload: {}, options: {}) => {
  const response = await request.post(path, payload, options);
  return response.data;
};

export default request;
