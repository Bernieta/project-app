import { CanActivateFn, Router } from '@angular/router';
import { auth } from '../config/fire';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return new Promise((resolve) => {
    auth.onAuthStateChanged((authGuard) => {
      if (authGuard) resolve(true);
      else {
        router.navigateByUrl('/login');
        resolve(false);
      }
    });
  });
};
