import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { DOMAIN } from '../../login/login.model';
import { NewPackageModel } from '../package.model';

@Injectable({
  providedIn: 'root',
})
export class PackagesService {
  public NEW_PACKAGE = `${DOMAIN}/insertPackage.php`;
  public GET_PACKAGES = `${DOMAIN}/getPackages.php`;

  constructor(private httpClient: HttpClient) {}

  public newPackage(entity: NewPackageModel): Observable<any> {
    /*console.log('extractFirstDate', this.extractFirstDate(entity.date));
    console.log('extractSecondDate', this.extractSecondDate(entity.date));*/
    let hostingType = '0';
    if (entity.hosting !== '0') {
      hostingType = entity.hostingType;
    }
    return this.httpClient
      .post(this.NEW_PACKAGE, {
        ...entity,
        startDate: this.extractFirstDate(entity.date),
        endDate: this.extractSecondDate(entity.date),
        hostingType: hostingType,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
    /*console.log('entity', {
      ...entity,
      startDate: this.extractFirstDate(entity.date),
      endDate: this.extractSecondDate(entity.date),
      hostingType: hostingType,
    });
    return of(1);*/
  }

  public getPackages(userId: string): Observable<any> {
    return this.httpClient
      .post(this.GET_PACKAGES, {
        empID: userId,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  extractFirstDate(dateRange: string): string {
    const parts = dateRange.split(' ');
    const firstDatePart = parts[0].trim();
    return firstDatePart;
  }

  extractSecondDate(dateRange: string): string {
    const parts = dateRange.split(' ');
    const dateAfterSecondSpace = parts[2].trim();
    return dateAfterSecondSpace;
  }
}
