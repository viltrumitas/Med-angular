import { Service, signal } from '@angular/core';

@Service()
export class AuthService {
  userToken = signal<string | null>(localStorage.getItem('token'));
  tokeValue = this.userToken.asReadonly();

  getToken(): string | null {
    return this.userToken();
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.userToken.set(token);
  }

  removeToken() {
    localStorage.removeItem('token');
    this.userToken.set(null);
  }

  isLoggedIn(): boolean {
    return !!this.userToken();
  }

  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload?.role ?? null;
    } catch {
      return null;
    }
  }
}
