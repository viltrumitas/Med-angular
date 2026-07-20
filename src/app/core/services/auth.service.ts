import { computed, Service, signal } from '@angular/core';
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
  }

  private getStoredToken(): string | null {
    try {
      return localStorage.getItem('token');
    } catch {
      return null;
    }
  }

  private decodeRole(token: string | null): UserRole | null {
    if (!token) {
      return null;
    }

    try {
      const payloadPart = token.split('.')[1];

      if (!payloadPart) {
        return null;
      }

      const normalizedPayload = payloadPart
        .replace(/-/g, '+')
        .replace(/_/g, '/')
        .padEnd(Math.ceil(payloadPart.length / 4) * 4, '=');

      const payload = JSON.parse(atob(normalizedPayload));

      console.log('JWT payload:', payload);

      return payload.role ?? null;
    } catch (error) {
      console.error('No se pudo decodificar el JWT:', error);
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
