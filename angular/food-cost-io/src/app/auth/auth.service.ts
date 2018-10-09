import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root'})

export class AuthService {
  private token: string;
  private isAuthenticated = false;
  private tokenTimer: any;
  expiresInDuration = null;
  // prevent user from being logged out with a manual page reload (we store a token in localStorage) see: autoAuthUser()
  // bounce user after one hour using tokenTimer
  // Subject push the authentication status to interested components
  // return the observable, we just push a boolean from here to the  other parties
  private authStatusListener = new Subject<boolean>();
  constructor (private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  createUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post('http://localhost:3000/api/users/signup', authData)
    .subscribe(response => {
        console.log(response);
    });
  }

  login(email: string, password: string){
    const authData: AuthData = { email: email, password: password};
    this.http.post<{token: string, expiresIn: string}>('http://localhost:3000/api/users/login' , authData)
    .subscribe(response => {
      // store token for later use
      const token = response.token;
      this.token = token;
      if (token) {
        this.expiresInDuration = response.expiresIn;
        this.setAuthTimer(this.expiresInDuration);
        this.authStatusListener.next(true);
        this.isAuthenticated = true;
        const now = new Date;
        const expirationDate = new Date( now.getTime() + this.expiresInDuration * 1000);
        console.log(expirationDate);
        this.saveAuthData(token, expirationDate);
        this.router.navigate(['/']); /* navigate to landing page */
      }
    });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']); /* navigate to landing page */
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
  }

  private setAuthTimer(duration: number) {
    console.log('setting timer + duration');
    this.tokenTimer = setTimeout(() => {
      this.logout();
    } , duration * 1000);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if ( !token || !expirationDate ) {
      return;
    } else {
      return {
        token: token,
        expirationDate: new Date(expirationDate)
      };
    }
  }
  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token' , token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }
}

