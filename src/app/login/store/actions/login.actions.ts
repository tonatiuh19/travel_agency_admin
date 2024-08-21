import { createAction, props } from '@ngrx/store';

const actor = '[Login]';

export const login = createAction(
  `${actor} Login`,
  props<{ loginEntity: any }>(),
);

export const loginSuccess = createAction(
  `${actor} Login Success`,
  props<{ loginResponse: any }>(),
);

export const loginFailure = createAction(
  `${actor} Login Failure`,
  props<{ errorResponse: any }>(),
);

export const signOff = createAction(`${actor} Sign Off`);
