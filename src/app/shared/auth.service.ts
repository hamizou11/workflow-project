import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { User } from './user.model';
import { registerLocaleData } from '@angular/common';
import { Router } from '@angular/router';

export interface AuthResponseData {
  idToken: string;
  email: string;
  role:string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User|null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAiCjI2oAptRGKQtfSQUzrYWlcTrDuKTeg',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          this.handleAuthentification(
            res.email,
            res.localId,
            res.idToken,
            res.role,
            +res.expiresIn
          );
        })
      );
  }
  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key= AIzaSyAiCjI2oAptRGKQtfSQUzrYWlcTrDuKTeg',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          this.handleAuthentification(
            res.email,
            res.localId,
            res.idToken,
            res.role,
            +res.expiresIn
          );
        })
      );
  }
  private handleAuthentification(
    email: string,
    token: string,
    userId: string,
    role:string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token,role,expirationDate);

    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      role:string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData')!);
    if (!userData) {
      return ;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      userData.role,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
    return true;
  }

  getToken() {
    return localStorage.getItem('token') || '';
  }
  isLoggedIn(){
    return localStorage.getItem('token')!=null;
  }
  
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Uknown error';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'this email already exists ! ';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email does not exist!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid Password !';
        break;
    }

    return throwError(errorMessage);
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/signup']);
    localStorage.removeItem('userData');
    
  }
  haveAccess(){
    var user =(JSON.parse(localStorage.getItem('userData')|| '{ }' ));
    if(user.role=='admin'){ 
      return true;
    }
   alert('you dont have the access');
    return false;
    
  }
}
