import { LoginState } from '../../login.model';

export const LOGIN_FEATURE_KEY = 'login';

export const initialLoginState: LoginState = {
  empID: 0,
  empName: '',
  empSurname: '',
  position_id: 0,
  empEmail: '',
  isAuthenticated: false,
  isLoading: false,
  isError: false,
};
