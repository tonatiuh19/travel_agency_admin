import { LoginActions } from '../actions';
import { Action, createReducer, on } from '@ngrx/store';
import { LOGIN_FEATURE_KEY, initialLoginState } from '../states/login.state';
import { createRehydrateReducer } from '../../../shared/utils/rehydrate-reducer';
import { LoginState } from '../../login.model';

export const LoginReducer = createRehydrateReducer(
  { key: LOGIN_FEATURE_KEY },
  initialLoginState,
  on(LoginActions.login, (state: LoginState, { loginEntity }: any) => {
    return {
      ...state,
      ...loginEntity,
      isLoading: true,
    };
  }),
  on(LoginActions.loginSuccess, (state: LoginState, { loginResponse }: any) => {
    return {
      ...state,
      ...loginResponse[0],
      isAuthenticated: true,
      isLoading: false,
      isError: false,
    };
  }),
  on(LoginActions.loginFailure, (state: LoginState, { errorResponse }: any) => {
    return {
      ...state,
      ...initialLoginState,
      isLoading: false,
      isError: true,
    };
  }),
  on(LoginActions.signOff, (state: LoginState) => {
    return {
      ...state,
      ...initialLoginState,
    };
  })
);
