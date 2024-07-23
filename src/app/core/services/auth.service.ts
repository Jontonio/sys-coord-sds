import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import  moment from 'moment';

import { environment } from '../../../environments/environment';
import { of, EMPTY } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

  private listRoles : string[] = [
    'USER_ROOT',
    'UGEL_USER',
    'DIRECTOR_USER',
    'COORD_USER',
    'DOCENTE',
  ]

  constructor() {}

  //getters
  get roles () {
    return this.listRoles;
  }

  login(email: string, password: string) {
      return of(true)
          .pipe(delay(1000),
              map((/*response*/) => {
                  // set token property
                  // const decodedToken = jwt_decode(response['token']);
                  sessionStorage.setItem('currentUser', JSON.stringify({
                      token: 'aisdnaksjdn,axmnczm',
                      email,
                      id: '12312323232',
                      role: email.split('@')[0],
                      name: email.split('@')[0],
                      expiration: moment().add(1, 'days').toDate(),
                      fullName: 'test'
                  }));

                  return true;
              }));
  }

  logout(): void {
      // clear token remove user from local storage to log user out
      sessionStorage.removeItem('currentUser');
  }

  getCurrentUser() {
      return JSON.parse(sessionStorage.getItem('currentUser')!);
  }

  passwordResetRequest(email: string) {
      return of(true).pipe(delay(1000));
  }

  changePassword(email: string, currentPwd: string, newPwd: string) {
      return of(true).pipe(delay(1000));
  }

  passwordReset(email: string, token: string, password: string, confirmPassword: string): any {
      return of(true).pipe(delay(1000));
  }
}
