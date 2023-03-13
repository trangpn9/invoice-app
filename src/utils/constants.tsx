// Config constants for API
// config Base URL using when call api
export const BASE_URL = 'https://sandbox.101digital.io';
// config feth Access Token URL
export const FETCH_TOKEN_URL = '/token?tenantDomain=carbon.super';
// get user profile URL
export const GET_USER_PROFILE_URL = '/membership-service/1.2.0/users/me';
// get invoices URL
export const GET_INVOICES_URL = '/invoice-service/1.0.0/invoices';
// create invoice url
export const CREATE_INVOICE_URL = '/invoice-service/2.0.0/invoices';

// config regex validate email format
export const REGEX_VALIDATE_EMAIL = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;

// config path go to Dashboard page
export const DASHBOARD_PATH = '/dashboard';
export const AUTH_LOGIN_PATH = '/auth/login';

export const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;
