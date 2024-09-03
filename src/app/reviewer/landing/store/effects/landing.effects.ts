import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { LandingActions } from '../actions';
import { LandingService } from '../../services/landing.service';

@Injectable()
export class LandingEffects {
  gettingFullPackages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LandingActions.getFullPackages),
      switchMap(() => {
        return this.landingService.getFullPackages().pipe(
          map((response) => {
            return LandingActions.getFullPackagesSuccess({
              packagesResponse: response,
            });
          }),
          catchError((error) => {
            return of(
              LandingActions.getFullPackagesFailure({ errorResponse: error })
            );
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private store: Store,
    private landingService: LandingService
  ) {}
}
