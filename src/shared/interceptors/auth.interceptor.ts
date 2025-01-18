import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { ToastService } from '../Services/toast.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastService); // For showing messages to the user

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
        catchError(() => {
          isRefreshing = false;
          authService.clearTokens();
          
          toastService.showMessage('warn', 'انتهت الجلسة', 'يرجى تسجيل الدخول مرة أخرى.', 6000);
          
            router.navigate(['/dashboard/Login']);
     
          return throwError(() => new Error('Session expired'));
        })
      );
    } else {
      return refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => next(addTokenToRequest(request, token!)))
      );
    }
  };

  const accessToken = authService.getAccessToken();
  const clonedRequest = accessToken ? addTokenToRequest(req, accessToken) : req;

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return handle401Error(req);
      }else if(error.status === 400 && error.error === "اسم المستخدم أو كلمة المرور غير صالحة."){
        toastService.showMessage('warn',
          'خطا',
         'اسم المستخدم أو كلمة المرور غير صالحة.',
         2000);
      }else{
        console.log(error)
      }
      return throwError(() => error);
    })
  );
};
