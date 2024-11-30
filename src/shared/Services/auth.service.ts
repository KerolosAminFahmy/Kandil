import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private baseUrl = 'https://localhost:7289/'; // Replace with your API URL
  private baseUrl = "https://kandil.runasp.net/"; // Replace with your API URL
  private tokenKey = 'authToken';
  private refreshTokenKey = 'refreshToken';
  private isLoginvar=false;
  constructor(private http: HttpClient) {}

  // Save tokens in local storage
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
      email: username,
      password: password,
      twoFactorCode:null, // Provide actual or placeholder values
      twoFactorRecoveryCode: null // Provide actual or placeholder values
    }; // Ensure correct property names
    return this.http.post<{ accessToken: string,refreshToken:string }>(`${this.baseUrl}login`, payload, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  // Get access token
  getAccessToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Get refresh token
  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  // Remove tokens on logout
  clearTokens(): void {
    this.isLoginvar=true
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  // Refresh access token
  refreshAccessToken(): Observable<{ token: string }> {
    const refreshToken = this.getRefreshToken();
    return this.http.post<{ token: string }>(`${this.baseUrl}/refresh`, {
      refreshToken,
    });
  }
}
