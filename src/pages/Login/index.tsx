import React, { useEffect, useState } from 'react';
import './style.scss';
import Logo from '../../assets/img/logo.svg';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';

import { IFormLogin } from '../../utils/models';
import useAuth from '../../hooks/useAuth';
import {
  DASHBOARD_PATH,
  REACT_APP_CLIENT_ID,
  REACT_APP_CLIENT_SECRET,
  REGEX_VALIDATE_EMAIL,
} from '../../utils/constants';
import { fetchToken } from '../../services/apis/fetchToken';
import { getUserProfile } from '../../services/apis/getUserProfile';
import Loading from '../../components/Loading';

function Login(): React.ReactElement {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, signin } = useAuth();
  const [errLogin, setErrLogin] = useState<string | null>(null);

  // Set variable store pathname before come to login page
  let from = location.state?.from?.pathname || DASHBOARD_PATH;

  // register react hook form
  const {
    register,
    formState,
    formState: { errors, dirtyFields },
    handleSubmit,
    watch,
  } = useForm<IFormLogin>({ mode: 'onChange' });

  const reUsername = register('username', {
    required: { value: true, message: 'Email is required!' },
    maxLength: { value: 120, message: 'Max length 120 character!' },
    pattern: {
      value: REGEX_VALIDATE_EMAIL,
      message: 'Invalid email address!',
    },
  });

  const rePassword = register('password', {
    required: { value: true, message: 'Password is required!' },
    maxLength: { value: 30, message: 'Max length 30 character!' },
  });

  // const email = watch("email");

  // Check auth to action redirect to pathname before come to login page
  useEffect(() => {
    if (auth.user) return navigate(from, { replace: true });
  }, []);

  const handleSignin: SubmitHandler<IFormLogin> = async ({ username, password }) => {
    setIsLoading(true);

    const payload = {
      username,
      password,
      client_id: REACT_APP_CLIENT_ID,
      client_secret: REACT_APP_CLIENT_SECRET,
      grant_type: 'password',
      scope: 'openid',
    };

    try {
      // Call API fetch Access Token
      const fetchTokenService: any = await fetchToken(payload);
      if (fetchTokenService.accessToken) {
        const { accessToken } = fetchTokenService;

        // Call API get user profile with Access Token
        const getUSerProfileService: any = await getUserProfile(accessToken);
        if (getUSerProfileService.status.code === '000000' && getUSerProfileService.data) {
          const orgToken = getUSerProfileService.data.memberships[0].token;
          // Call function signin from AuthContext and navigate to before URL
          signin(username, accessToken, orgToken, () => {
            navigate(from, { replace: true });
            // console.log("Check Pathname: ", location);
          });
        } else {
          setErrLogin(JSON.stringify(getUSerProfileService));
        }
      } else if (fetchTokenService.error_description) {
        setErrLogin(fetchTokenService.error_description);
      } else {
        setErrLogin(fetchTokenService.message);
      }
    } catch (error) {
      console.log('Error: ', error);
    }

    setIsLoading(false);
  };

  return (
    <main className="form-signin w-100 text-center position-absolute top-50 start-50 translate-middle">
      <img src={Logo} alt="Logo" width="130" />
      <h1 className="h3 mb-3 fw-normal">
        Hi, 101 Digital.
        <br />
        Please signin!
      </h1>

      <form onSubmit={handleSubmit(handleSignin)}>
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="txtEmail"
            placeholder="name@example.com"
            {...reUsername}
            disabled={isLoading}
          />
          <label htmlFor="txtEmail">Email address</label>
          {errors.username && <div className="text-danger">{errors.username.message}</div>}
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="txtPassword"
            placeholder="Password"
            {...rePassword}
            disabled={isLoading}
          />
          <label htmlFor="txtPassword">Password</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={isLoading}>
          {isLoading && <Loading />}
          {!isLoading && 'Signin'}
        </button>
        {errLogin && <p className="text-danger m-2">{errLogin}</p>}
        <p className="mt-5 mb-3 text-muted">&copy; 2023</p>
      </form>
    </main>
  );
}

export default Login;
