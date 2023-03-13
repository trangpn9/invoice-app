import { AxiosError } from 'axios';

import * as request from '../../utils/request';
import { GET_INVOICES_URL } from '../../utils/constants';

export const fetchInvoices = async (accessToken: string | null, orgToken: string | null = null, params: any) => {
  const AuthStr = 'Bearer ' + accessToken;

  try {
    const { data, paging, status } = await request.get(GET_INVOICES_URL, {
      headers: { Authorization: AuthStr, 'org-token': orgToken },
      params,
    });
    // console.log(JSON.stringify(data));
    return { data, paging, status };
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log('error.response.data: ', error.response);
      return error.response.status;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log('error request fetch invoice: ', error.request);
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
