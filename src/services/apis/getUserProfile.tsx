import { AxiosError } from 'axios';

import * as request from './../../utils/request';
import { GET_USER_PROFILE_URL } from '../../utils/constants';

export const getUserProfile = async (accessToken: string | null, params = {}) => {
  const AuthStr = 'Bearer ' + accessToken;

  try {
    const { data, paging, status } = await request.get(GET_USER_PROFILE_URL, {
      headers: { Authorization: AuthStr },
      params,
    });
    // console.log(JSON.stringify(data));
    return { data, paging, status };
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
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
