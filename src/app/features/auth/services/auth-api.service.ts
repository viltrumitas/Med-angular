import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { AuthResponse } from '../models/auth.response.model';
import { LoginModel } from '../models/login.model';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterModel } from '../models/register.model';

@Service()
export class AuthApi {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  private readonly authService = inject(AuthService);

  login(data: LoginModel): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, data).pipe(
      tap(({ access_token }) => {
        this.authService.setToken(access_token);
      }),
    );
  }

  register(userData: RegisterModel): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, userData);
  }
}
