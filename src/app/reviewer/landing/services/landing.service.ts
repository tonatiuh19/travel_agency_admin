import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { DOMAIN } from '../landing.model';

@Injectable({
  providedIn: 'root',
})
export class LandingService {
  public GET_LOGIN = `${DOMAIN}/getLogin.php`;
  public GET_FULL_PACKAGES = `${DOMAIN}/getFullPackages.php`;
  public GET_FULL_PACKAGES_BY_ID = `${DOMAIN}/getFullPackagesById.php`;
  public GET_CITIES_WITH_COUNT_OF_PACKAGES = `${DOMAIN}/getCitiesWithCountOfPackages.php`;
  public GET_REVIEWS = `${DOMAIN}/getReviews.php`;

  constructor(private httpClient: HttpClient) {}

  public authenticateUser(
    email: string,
    given_name: string,
    family_name: string,
    picture: string,
    email_verified: boolean
  ): Observable<any> {
    return this.httpClient
      .post(this.GET_LOGIN, {
        custEmail: email,
        custEmailVerified: email_verified,
        custName: given_name,
        custSurname: family_name,
        picture: picture,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  public getFullPackages(): Observable<any> {
    return this.httpClient.post(this.GET_FULL_PACKAGES, {}).pipe(
      map((response) => {
        return response;
      })
    );
  }

  public getFullPackagesById(packID: number): Observable<any> {
    return this.httpClient
      .post(this.GET_FULL_PACKAGES_BY_ID, {
        packID: packID,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  public getCitiesWithCountOfPackages(): Observable<any> {
    return this.httpClient
      .post(this.GET_CITIES_WITH_COUNT_OF_PACKAGES, {})
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  public getReviews(): Observable<any> {
    return this.httpClient.post(this.GET_REVIEWS, {}).pipe(
      map((response) => {
        return response;
      })
    );
  }

  public extractFirstDate(dateRange: string): string {
    const parts = dateRange.split(' ');
    const firstDatePart = parts[0].trim();
    return firstDatePart;
  }

  public extractSecondDate(dateRange: string): string {
    const parts = dateRange.split(' ');
    const dateAfterSecondSpace = parts[2].trim();
    return dateAfterSecondSpace;
  }
}
