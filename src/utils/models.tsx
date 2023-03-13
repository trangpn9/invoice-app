export interface IFormLogin {
  username: string;
  password: string;
}

export interface IAuth {
  user: string | null;
  accessToken: string | null;
  orgToken: string | null;
}

export interface AuthContextType {
  auth: IAuth;
  setAuth: any;
  signin: (user: string, accessToken: string, orgToken: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
  isAuthenticated: boolean;
}

export const DefaultValAuth = { user: null, accessToken: null, orgToken: null };

export interface IPage {
  totalRecords: number;
  active: number;
  limit: number;
  onSetPageActive: (page: number) => void;
}
