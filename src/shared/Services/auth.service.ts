import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private baseUrl = "https://kandil.runasp.net/";
  private baseUrl = environment.authApi;
  private base = environment.apiUrl+"/UsersAuth/"; 
  private tokenKey = 'authToken';
  private refreshTokenKey = 'refreshToken';
  private isLoginvar=false;
  constructor(private http: HttpClient) {}

  saveTokens(accessToken: string, refreshToken: string): void {
    if(accessToken!=='' || accessToken!==undefined ||refreshToken!=='' || refreshToken!==undefined){
      this.isLoginvar=true
    }
    localStorage.setItem(this.tokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }
  isLogin():boolean{
    if(!this.isLoginvar){
      this.isLoginvar=localStorage.getItem(this.tokenKey)==null?false:true;
    }
    return this.isLoginvar;
  }
  login(username: string, password: string): Observable<{ accessToken: string,refreshToken:string }> {
    const payload = {
      userName: username,
      password: password,
    };
    return this.http.post<{ accessToken: string,refreshToken:string }>(`${this.base}login`, payload, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  getAccessToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  clearTokens(): void {
    this.isLoginvar=false
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  // Refresh access token
  refreshAccessToken(): Observable<{ accessToken: string,refreshToken:string }> {
    const refreshToken = this.getRefreshToken();
    const accessToken = this.getAccessToken();
    return this.http.post<{ accessToken: string,refreshToken:string }>(`${this.base}refresh`, {
      refreshToken:refreshToken,
      accessToken:accessToken
    });
  }
}
