import { fetchToken } from '../services/apis/fetchToken';
import { getUserProfile } from '../services/apis/getUserProfile';
import { GET_USER_PROFILE_URL, REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } from '../utils/constants';
import { IAuth } from '../utils/models';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const payload = {
    username: 'dung+octopus4@101digital.io',
    password: 'Abc@123456',
    client_id: REACT_APP_CLIENT_ID,
    client_secret: REACT_APP_CLIENT_SECRET,
    grant_type: 'password',
    scope: 'openid',
  };

  const refresh = async () => {
    // Call API fetch Access Token
    const fetchTokenService: any = await fetchToken(payload);
    if (fetchTokenService.accessToken) {
      const { accessToken } = fetchTokenService;

      // Call API get user profile with Access Token
      const getUSerProfileService: any = await getUserProfile(GET_USER_PROFILE_URL, accessToken);
      if (getUSerProfileService.status.code === '000000' && getUSerProfileService.data) {
        const orgToken = getUSerProfileService.data.memberships[0].token;
        // Call function signin from AuthContext and navigate to before URL

        setAuth((pre: IAuth) => ({ ...pre, accessToken, orgToken }));
        console.log('new accessToken: ', accessToken);
        console.log('new orgToken: ', orgToken);

        return { accessToken, orgToken };
      }
    }
  };

  return refresh;
};

export default useRefreshToken;
