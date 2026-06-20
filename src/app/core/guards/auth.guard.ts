import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si hay un token válido, permitimos el acceso a la ruta
  if (authService.getToken()) {
    return true;
  }

  // Si no está autenticado, lo redirigimos al login
  router.navigate(['/login']);
  return false;
};
