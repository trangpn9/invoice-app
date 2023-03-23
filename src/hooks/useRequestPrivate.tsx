import { useEffect } from 'react';

import { requestPrivate } from '../utils/request';
import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';

const useRequestPrivate = () => {
  const refresh = useRefreshToken();
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const requestIntercept = requestPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
          config.headers['org-token'] = auth.orgToken;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = requestPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAuth = await refresh();
          setAuth(() => ({ ...auth, accessToken: newAuth?.accessToken, orgToken: newAuth?.orgToken }));
          prevRequest.headers['Authorization'] = `Bearer ${newAuth?.accessToken}`;
          prevRequest.headers['org-token'] = newAuth?.orgToken;

          return requestPrivate(prevRequest);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      requestPrivate.interceptors.request.eject(requestIntercept);
      requestPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth.accessToken, refresh]);

  return requestPrivate;
};

export default useRequestPrivate;
