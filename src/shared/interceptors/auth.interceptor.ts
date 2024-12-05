import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { BehaviorSubject, catchError, Observable, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../Services/toast.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const Massege = inject(ToastService) 

  let isRefreshing = false;
  const refreshTokenSubject = new BehaviorSubject<string | null>(null);

  const addTokenToRequest = (request: HttpRequest<any>, token: string): HttpRequest<any> => {
    return request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  };

  const handle401Error = (request: HttpRequest<any>): Observable<HttpEvent<any>> => {

    if (!isRefreshing) {

      isRefreshing = true;
      refreshTokenSubject.next(null);
   

      return authService.refreshAccessToken().pipe(
        switchMap((tokens) => {

          isRefreshing = false;
          authService.saveTokens(tokens.accessToken, tokens.refreshToken);
          refreshTokenSubject.next(tokens.accessToken);
          return next(addTokenToRequest(request, tokens.accessToken));
        }),
        catchError((error) => {
          authService.clearTokens();
          return throwError(() => error);
        })
      );
    } else {
      return refreshTokenSubject.pipe(
        switchMap((token) => {
          if (token) {
            return next(addTokenToRequest(request, token));
          }
          return throwError(() => 'No token available');
        })
      );
    }
  };

  const accessToken = authService.getAccessToken();
  const clonedRequest = accessToken ? addTokenToRequest(req, accessToken) : req;

  return next(clonedRequest).pipe(
    catchError((error) => {
      if (error.status === 401) {
        const url = req.url.toLowerCase();

        if (url.endsWith('/login')) {
          Massege.showMessage('warn',
      'خطا',
     'اسم المستخدم أو كلمة المرور غير صالحة.',
     6000);
          return throwError(() => error);
        }

        if (url.endsWith('/refresh')) {
          Massege.showMessage('warn',
      'خطا','انتهت الجلسة. يرجى تسجيل الدخول مرة أخرى.',6000);
          authService.clearTokens();
          router.navigate(['/login']);
          return throwError(() => error);
        }
        return handle401Error(req);
      }
        return handle401Error(req);
      }
    
  
  ));
};
