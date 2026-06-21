import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { Observable, tap } from 'rxjs';
import { RegisterData } from '../modules/register';
import { LoginData } from '../modules/login';

@Service()
export class AuthService {
  private http = inject(HttpClient);

  private readonly API_URL = environment.apiUrl;

  currentUserToken = signal<string | null>(localStorage.getItem('token'));

  login(credentials: LoginData): Observable<any> {
    return this.http.post<{ access_token: string }>(`${this.API_URL}/auth/login`, credentials).pipe(
      tap((response) => {
        if (response && response.access_token) {
          localStorage.setItem('token', response.access_token);
          this.currentUserToken.set(response.access_token);
        }
      }),
    );
  }

  register(userData: RegisterData): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/register`, userData);
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserToken.set(null);
  }

  getToken(): string | null {
    return this.currentUserToken();
  }
}
