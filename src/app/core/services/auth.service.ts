import { computed, inject, Service, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from '../enum/user-role.enum';

@Service()
export class AuthService {
  private readonly _token = signal<string | null>(this.getStoredToken());
  private readonly _role = signal<UserRole | null>(this.decodeRole(this._token()));

  readonly tokeValue = this._token.asReadonly();
  readonly role = this._role.asReadonly();
  readonly isLoggedIn = computed(() => !!this._token());

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this._token.set(token);
    this._role.set(this.decodeRole(token));
  }

  removeToken() {
    localStorage.removeItem('token');
    this._token.set(null);
    this._role.set(null);
    // this.router.navigate(['/auth']);
  }

  private getStoredToken(): string | null {
    try {
      return localStorage.getItem('token');
    } catch {
      // SSR o contexto sin acceso a localStorage
      return null;
    }
  }

  private decodeRole(token: string | null): UserRole | null {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload?.role ?? null;
    } catch {
      return null;
    }
  }

  getDashboardRoute(): string[] {
    const role = this.role();

    switch (role) {
      case UserRole.TEACHER:
        return ['/dashboard/teacher'];

      case UserRole.STUDENT:
        return ['/dashboard/students'];

      case UserRole.ADMIN:
        return ['/dashboard/admin'];

      default:
        return ['/'];
    }
  }
}
