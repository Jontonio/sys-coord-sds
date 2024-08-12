import { Injectable, Inject, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, switchMap, tap } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import  moment from 'moment';

import { environment } from '../../../environments/environment';
import { of, EMPTY } from 'rxjs';
import { CacheService } from './cache.service';
import { Router } from '@angular/router';
import { CurrentUser } from '../class/UserAuth';

enum Role {
  USER_ROOT = "USER_ROOT",
  UGEL_USER = "UGEL_USER",
  DIRECTOR_USER = "DIRECTOR_USER",
  COORD_USER = "COORD_USER",
  DOCENTE_USER = "DOCENTE_USER",
}

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

  public URL:string;
  private keyToken:string;
  private chacheService = inject(CacheService);
  private router = inject(Router);
  private userAuth!:CurrentUser;
  public role = Role;

  private listRoles : string[] = [
    'USER_ROOT',
    'UGEL_USER',
    'DIRECTOR_USER',
    'COORD_USER',
    'DOCENTE_USER',
  ]

  constructor(private http:HttpClient) {
    this.URL = environment.URL_BASE;
    this.keyToken = 'x-token';
  }

  get getUserAuth(){
    return this.userAuth;
  }

  setUserAuth(user:CurrentUser){
      this.userAuth = user;
  }

  //getters
  get roles () {
    return this.listRoles;
  }

  login(email: string, password: string) {
    return this.http.post(`${this.URL}/login`, { email, password })
    .pipe(
      tap(({ data }:any) => {
        const { token } = data.authorization;
        this.chacheService.saveSessionStorage(this.keyToken, token)
      }),
      switchMap(res => this.checkAuthUser())
    );
  }

  checkAuthUser() {
    return this.http.get(`${this.URL}/user-check`).pipe(
      tap(({ data }: any) => {
        this.chacheService.setCodeModularUser(data.cod_modular_ie?data.cod_modular_ie:null);
        this.chacheService.setIdIETeacher(data.id_ie_teacher?data.id_ie_teacher:null);
        this.setUserAuth(data);
      })
    )
  }

  logout(): void {
    this.chacheService.removeSessionStorage(this.keyToken);
  }

  redirecToLogin(){
    this.router.navigate(['/auth/login']);
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
