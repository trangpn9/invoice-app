import { AxiosError } from 'axios';

import * as request from '../../utils/request';
import { CREATE_INVOICE_URL } from '../../utils/constants';

export const createInvoice = async (accessToken: string | null, orgToken: string | null = null, payload: any) => {
  const AuthStr = 'Bearer ' + accessToken;

  try {
    const response = await request.post(CREATE_INVOICE_URL, payload, {
      headers: {
        Authorization: AuthStr,
        'org-token': orgToken,
        'Content-Type': 'application/json',      
      },
    });
    console.log('create service: ', response);

    return response;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return error.response.status;
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
