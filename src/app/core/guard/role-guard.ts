import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { UserRole } from '../enum/user-role.enum';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Safety net: si llegó aquí sin autenticarse, redirige al login
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

  return router.createUrlTree(['/unauthorized']);
  //   const role = authService.getRole();
  //   const allowedRoles = (route.data['roles'] as string[]) ?? [];
  //   const roleRefirectMap: Record<UserRole, string> = {
  //     [UserRole.STUDENT]: './dashboard/student',
  //     [UserRole.TEACHER]: './dashboard/teacher',
  //     [UserRole.ADMIN]: '/dashboard/admin',
  //   };
  //   const redirectTo = role ? roleRefirectMap[role] : '/auht';
  //   return role && allowedRoles.includes(role) ? true : router.createUrlTree(['/']);
};
