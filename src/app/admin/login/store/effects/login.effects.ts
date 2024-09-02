import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { LoginActions } from '../actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { fromLogin } from '../selectors';
import { Store } from '@ngrx/store';
import { LoginService } from '../../services/login.service';

@Injectable()
export class LoginEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginActions.login),
      withLatestFrom(this.store.select(fromLogin.selectLoginState)),
      switchMap(([loginEntity]) => {
        return this.loginService
          .authenticateUser(
            loginEntity.loginEntity.email,
            loginEntity.loginEntity.password
          )
          .pipe(
            map((response) => {
              if (response) {
                return LoginActions.loginSuccess({ loginResponse: response });
              } else {
                return LoginActions.loginFailure({
                  errorResponse: 'Invalid credentials',
                });
              }
            }),
            catchError((error) => {
              return of(LoginActions.loginFailure({ errorResponse: error }));
            })
          );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private store: Store,
    private loginService: LoginService
  ) {}
}
