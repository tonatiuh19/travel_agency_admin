import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { SettingsService } from '../../services/settings.service';
import { SettingsActions } from '../actions';
import { fromSettings } from '../selectors';

@Injectable()
export class SettingsEffects {
  getCountries$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingsActions.getCountries),
      switchMap(() => {
        return this.settingsService.getCountries().pipe(
          map((response) => {
            if (response) {
              return SettingsActions.getCountriesSuccess({
                countriesResponse: response,
              });
            } else {
              return SettingsActions.getCountriesFailure({
                errorResponse: 'Invalid credentials',
              });
            }
          }),
          catchError((error) => {
            return of(
              SettingsActions.getCountriesFailure({ errorResponse: error })
            );
          })
        );
      })
    );
  });

  getCities$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingsActions.getCities),
      switchMap(() => {
        return this.settingsService.getCities().pipe(
          map((response) => {
            if (response) {
              return SettingsActions.getCitiesSuccess({
                citiesResponse: response,
              });
            } else {
              return SettingsActions.getCitiesFailure({
                errorResponse: 'Invalid credentials',
              });
            }
          }),
          catchError((error) => {
            return of(
              SettingsActions.getCitiesFailure({ errorResponse: error })
            );
          })
        );
      })
    );
  });

  getTransports$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingsActions.getTransports),
      switchMap(() => {
        return this.settingsService.getTransports().pipe(
          map((response) => {
            if (response) {
              return SettingsActions.getTransportsSuccess({
                transportsResponse: response,
              });
            } else {
              return SettingsActions.getTransportsFailure({
                errorResponse: 'Invalid credentials',
              });
            }
          }),
          catchError((error) => {
            return of(
              SettingsActions.getTransportsFailure({ errorResponse: error })
            );
          })
        );
      })
    );
  });

  getHostings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingsActions.getHostings),
      switchMap(() => {
        return this.settingsService.getHostings().pipe(
          map((response) => {
            if (response) {
              return SettingsActions.getHostingsSuccess({
                hostingsResponse: response,
              });
            } else {
              return SettingsActions.getHostingsFailure({
                errorResponse: 'Invalid credentials',
              });
            }
          }),
          catchError((error) => {
            return of(
              SettingsActions.getHostingsFailure({ errorResponse: error })
            );
          })
        );
      })
    );
  });

  addCountry$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingsActions.addCountry),
      withLatestFrom(this.store.select(fromSettings.selectCountries)),
      switchMap(([countryEntity]) => {
        return this.settingsService
          .insertCountry(
            countryEntity.country.name,
            Number(countryEntity.country.extraSelect)
          )
          .pipe(
            map((response) => {
              if (response == 1) {
                return SettingsActions.addCountrySuccess(response);
              } else {
                return SettingsActions.addCountryFailure({
                  errorResponse: 'Invalid credentials',
                });
              }
            }),
            catchError((error) => {
              return of(
                SettingsActions.addCountryFailure({ errorResponse: error })
              );
            })
          );
      })
    );
  });

  addCity$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingsActions.addCity),
      withLatestFrom(this.store.select(fromSettings.selectCities)),
      switchMap(([cityEntity]) => {
        return this.settingsService
          .insertCity(cityEntity.city.name, Number(cityEntity.city.extraSelect))
          .pipe(
            map((response) => {
              if (response == 1) {
                return SettingsActions.addCitySuccess(response);
              } else {
                return SettingsActions.addCityFailure({
                  errorResponse: 'Invalid credentials',
                });
              }
            }),
            catchError((error) => {
              return of(
                SettingsActions.addCityFailure({ errorResponse: error })
              );
            })
          );
      })
    );
  });

  addTransport$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingsActions.addTransport),
      withLatestFrom(this.store.select(fromSettings.selectTransports)),
      switchMap(([transportEntity]) => {
        return this.settingsService
          .insertTransport(transportEntity.transport.name)
          .pipe(
            map((response) => {
              if (response == 1) {
                return SettingsActions.addTransportSuccess(response);
              } else {
                return SettingsActions.addTransportFailure({
                  errorResponse: 'Invalid credentials',
                });
              }
            }),
            catchError((error) => {
              return of(
                SettingsActions.addTransportFailure({ errorResponse: error })
              );
            })
          );
      })
    );
  });

  addHosting$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingsActions.addHosting),
      withLatestFrom(this.store.select(fromSettings.selectHostings)),
      switchMap(([hostingEntity]) => {
        return this.settingsService
          .insertHosting(hostingEntity.hosting.name)
          .pipe(
            map((response) => {
              if (response == 1) {
                return SettingsActions.addHostingSuccess(response);
              } else {
                return SettingsActions.addHostingFailure({
                  errorResponse: 'Invalid credentials',
                });
              }
            }),
            catchError((error) => {
              return of(
                SettingsActions.addHostingFailure({ errorResponse: error })
              );
            })
          );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private store: Store,
    private settingsService: SettingsService
  ) {}
}
