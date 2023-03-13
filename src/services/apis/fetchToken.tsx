import { AxiosError } from 'axios';

import * as request from './../../utils/request';

import { FETCH_TOKEN_URL } from '../../utils/constants';

export const fetchToken = async (payload: {}) => {
  try {
    const data = await request.post(FETCH_TOKEN_URL, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    // console.log(JSON.stringify(response?.data));
    // console.log(JSON.stringify(data));
    const accessToken = data?.access_token;
    const refreshToken = data?.refresh_token;
    const expiresIn = data?.expires_in;
    return { accessToken, refreshToken, expiresIn };
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
      return error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
      // return error.request;
      // To do handle error resquest
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
      const { message } = error;
      return { message };
    }
  }
};
