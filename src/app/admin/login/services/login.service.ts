import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DOMAIN } from '../login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public LOGIN_URL = `${DOMAIN}/login.php`;

  constructor(private httpClient: HttpClient) {}

  public authenticateUser(userName: string, password: string): Observable<any> {
    return this.httpClient
      .post(this.LOGIN_URL, {
        email: userName,
        pwd: password,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
