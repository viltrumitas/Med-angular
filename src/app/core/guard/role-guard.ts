import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { UserRole } from '../enum/user-role.enum';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    return router.createUrlTree(['/auth'], {
      queryParams: { returnUrl: state.url },
    });
  }

  const userRole = authService.role();

  const allowedRoles = (route.data['roles'] as UserRole[]) ?? [];

  if (userRole && allowedRoles.includes(userRole)) {
    return true;
  }

  return true;
};
