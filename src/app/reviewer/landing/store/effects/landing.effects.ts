import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { LandingActions } from '../actions';
import { LandingService } from '../../services/landing.service';
import { fromPackage } from '../../../../admin/packages/store/selectors';

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

  getCitiesWithCountOfPackages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LandingActions.getCitiesWithCountOfPackages),
      switchMap(() => {
        return this.landingService.getCitiesWithCountOfPackages().pipe(
          map((response) => {
            return LandingActions.getCitiesWithCountOfPackagesSuccess({
              citiesResponse: response,
            });
          }),
          catchError((error) => {
            return of(
              LandingActions.getCitiesWithCountOfPackagesFailure({
                errorResponse: error,
              })
            );
          })
        );
      })
    );
  });

  getReviews$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LandingActions.getReviews),
      switchMap(() => {
        return this.landingService.getReviews().pipe(
          map((response) => {
            return LandingActions.getReviewsSuccess({
              reviewsResponse: response,
            });
          }),
          catchError((error) => {
            return of(
              LandingActions.getReviewsFailure({ errorResponse: error })
            );
          })
        );
      })
    );
  });

  gettingPackageById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LandingActions.getFullPackageById),
      withLatestFrom(this.store.select(fromPackage.selectPackageState)),
      switchMap(([packageEntity]) => {
        return this.landingService
          .getFullPackagesById(packageEntity.packID)
          .pipe(
            map((response) => {
              if (response) {
                return LandingActions.getFullPackageByIdSuccess({
                  packageByIdResponse: response,
                });
              } else {
                return LandingActions.getFullPackageByIdFailure({
                  errorResponse: 'Invalid credentials',
                });
              }
            }),
            catchError((error) => {
              return of(
                LandingActions.getFullPackageByIdFailure({
                  errorResponse: error,
                })
              );
            })
          );
      })
    );
  });

  authenticateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LandingActions.authenticateUser),
      withLatestFrom(this.store.select(fromPackage.selectPackageState)),
      switchMap(([packageEntity]) => {
        return this.landingService
          .authenticateUser(
            packageEntity.user.email,
            packageEntity.user.given_name,
            packageEntity.user.family_name,
            packageEntity.user.picture,
            packageEntity.user.email_verified
          )
          .pipe(
            map((response) => {
              if (response) {
                return LandingActions.authenticateUserSuccess({
                  user: response,
                });
              } else {
                return LandingActions.authenticateUserFailure({
                  errorResponse: 'Invalid credentials',
                });
              }
            }),
            catchError((error) => {
              return of(
                LandingActions.authenticateUserFailure({
                  errorResponse: error,
                })
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
