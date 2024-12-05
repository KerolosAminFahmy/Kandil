import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../Services/auth.service';
import { ToastService } from '../Services/toast.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const Massege = inject(ToastService) 
  
  
  const token = authService.isLogin(); // Or check your auth service
  if (token) {
        return true;
  } else {
   
    router.navigate(['/dashboard/Login']);
    Massege.showMessage(
      'warn',
      'غير مصرح به',
     'يجب عليك تسجيل الدخول للوصول إلى هذا المورد.',
     6000
     );
    return false;
  }
};
