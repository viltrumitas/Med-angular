import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../enum/user-role.enum';

export const dashboardRedirectGuard: CanActivateFn = (_route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (state.url !== '/dashboard') {
    return true;
  }

  const role = authService.role();

  if (role === UserRole.TEACHER) {
    return router.createUrlTree(['/dashboard/teacher']);
  }

  if (role === UserRole.STUDENT) {
    return router.createUrlTree(['/dashboard/student']);
  }

  if (role === UserRole.ADMIN) {
    return router.createUrlTree(['/dashboard/admin']);
  }

  return router.createUrlTree(['/auth']);
};
