import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { PackageActions } from '../actions';
import { fromPackage } from '../selectors';
import { PackagesService } from '../../services/packages.service';
import { fromLogin } from '../../../login/store/selectors';
import { deletePackage } from '../actions/package.actions';

@Injectable()
export class PackageEffects {
  newPackage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PackageActions.newPackage),
      withLatestFrom(this.store.select(fromPackage.selectPackageState)),
      switchMap(([packageEntity]) => {
        return this.PackagesService.newPackage({
          ...packageEntity.packageEntity,
        }).pipe(
          map((response) => {
            console.log('response', response);
            if (response == 1) {
              return PackageActions.newPackageSuccess(response);
            } else {
              return PackageActions.newPackageFailure({
                errorResponse: 'Invalid credentials',
              });
            }
          }),
          catchError((error) => {
            return of(
              PackageActions.newPackageFailure({ errorResponse: error })
            );
          })
        );
      })
    );
  });

  gettingPackages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PackageActions.getPackages),
      withLatestFrom(this.store.select(fromLogin.selectUserId)),
      switchMap(([userId]) => {
        return this.PackagesService.getPackages(userId.userId).pipe(
          map((response) => {
            return PackageActions.getPackagesSuccess({
              packagesResponse: response,
            });
          }),
          catchError((error) => {
            return of(
              PackageActions.getPackagesFailure({ errorResponse: error })
            );
          })
        );
      })
    );
  });

  deletePackage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PackageActions.deletePackage),
      switchMap(({ id: packID }) => {
        return this.PackagesService.deletePackage(packID).pipe(
          map((response) => {
            return PackageActions.deletePackageSuccess({
              deletePackageResponse: response,
            });
          }),
          catchError((error) => {
            return of(
              PackageActions.deletePackageFailure({ errorResponse: error })
            );
          })
        );
      })
    );
  });

  deletePackageSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PackageActions.deletePackageSuccess),
      withLatestFrom(this.store.select(fromLogin.selectUserId)),
      switchMap(([userId]) => {
        return this.PackagesService.getPackages(
          userId.deletePackageResponse
        ).pipe(
          map((response) => {
            return PackageActions.getPackagesSuccess({
              packagesResponse: response,
            });
          }),
          catchError((error) => {
            return of(
              PackageActions.getPackagesFailure({ errorResponse: error })
            );
          })
        );
      })
    );
  });

  gettingPackageById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PackageActions.getPackageById),
      withLatestFrom(this.store.select(fromLogin.selectLoginState)),
      switchMap(([packageEntity]) => {
        return this.PackagesService.getPackagesById(
          packageEntity.userId,
          packageEntity.packID
        ).pipe(
          map((response) => {
            if (response) {
              return PackageActions.getPackageByIdSuccess({
                packageByIdResponse: response,
              });
            } else {
              return PackageActions.getPackageByIdFailure({
                errorResponse: 'Invalid credentials',
              });
            }
          }),
          catchError((error) => {
            return of(
              PackageActions.getPackageByIdFailure({ errorResponse: error })
            );
          })
        );
      })
    );
  });

  updatePackage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PackageActions.updatePackage),
      withLatestFrom(this.store.select(fromPackage.selectPackageState)),
      switchMap(([packageEntity]) => {
        return this.PackagesService.updatePackage({
          ...packageEntity.packageEntity,
        }).pipe(
          map((response) => {
            console.log('response', response);
            if (response == 1) {
              return PackageActions.updatePackageSuccess(response);
            } else {
              return PackageActions.updatePackageFailure({
                errorResponse: 'Invalid credentials',
              });
            }
          }),
          catchError((error) => {
            return of(
              PackageActions.updatePackageFailure({ errorResponse: error })
            );
          })
        );
      })
    );
  });

  getCityById$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(PackageActions.getPackageById),
        withLatestFrom(this.store.select(fromLogin.selectLoginState)),
        switchMap(([cityEntity]) => {
          console.log('cityEntity', cityEntity);
          /*return this.PackagesService.getCityById(
          packageEntity.cityId,
        ).pipe(
          map((response) => {
            if (response) {
              return PackageActions.getPackageByIdSuccess({
                packageByIdResponse: response,
              });
            } else {
              return PackageActions.getPackageByIdFailure({
                errorResponse: 'Invalid credentials',
              });
            }
          }),
          catchError((error) => {
            return of(
              PackageActions.getPackageByIdFailure({ errorResponse: error })
            );
          })
        );*/
          return of(1);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private PackagesService: PackagesService
  ) {}
}
