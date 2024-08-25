import { LoginState } from '../../login.model';
import { LOGIN_FEATURE_KEY, initialLoginState } from '../states/login.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectLoginState =
  createFeatureSelector<LoginState>(LOGIN_FEATURE_KEY);

export const selectUserId = createSelector(
  selectLoginState,
  (state: LoginState) => state.empID
);
