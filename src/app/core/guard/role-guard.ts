import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../enum/user-role.enum';

export const roleGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    const returnUrl = `/${segments.map((segment) => segment.path).join('/')}`;

    return router.createUrlTree(['/auth'], {
      queryParams: { returnUrl },
    });
  }

  const userRole = authService.role();
  const allowedRoles = (route.data?.['roles'] as UserRole[]) ?? [];

  if (userRole && allowedRoles.includes(userRole)) {
    return true;
  }

  return router.createUrlTree(['/dashboard']);
};
