import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { auth } from '../config/fire';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return new Promise((resolve) => {
    auth.onAuthStateChanged((authGuard) => {
      if (!authGuard) resolve(true);
      else {
        router.navigateByUrl('/home');
        resolve(false);
      }
    });
  });
};
