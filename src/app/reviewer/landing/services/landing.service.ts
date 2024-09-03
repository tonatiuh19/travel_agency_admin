import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { DOMAIN } from '../landing.model';

@Injectable({
  providedIn: 'root',
})
export class LandingService {
  public GET_FULL_PACKAGES = `${DOMAIN}/getFullPackages.php`;
  public GET_PACKAGES_BY_ID = `${DOMAIN}/getPackagesById.php`;
  public GET_CITIES_WITH_COUNT_OF_PACKAGES = `${DOMAIN}/getCitiesWithCountOfPackages.php`;
  public GET_REVIEWS = `${DOMAIN}/getReviews.php`;

  constructor(private httpClient: HttpClient) {}

  public getFullPackages(): Observable<any> {
    return this.httpClient.post(this.GET_FULL_PACKAGES, {}).pipe(
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
