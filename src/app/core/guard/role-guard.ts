import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const role = authService.getRole();
  const allowedRoles = (route.data['roles'] as string[]) ?? [];

  return role && allowedRoles.includes(role) ? true : router.createUrlTree(['/']);
};
