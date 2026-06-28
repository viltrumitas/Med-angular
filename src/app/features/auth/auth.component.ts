import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button';
import { InputComponent } from '../../shared/components/input/input';
import { AuthApi } from './services/auth-api.service';
import { Router } from '@angular/router';
import { LoginModel } from './models/login.model';
import { RegisterModel } from './models/register.model';
import { createLoginForm, createRegisterForm } from './forms/auth.forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent, InputComponent, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  private readonly authApi = inject(AuthApi);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loginForm = createLoginForm();
  registerForm = createRegisterForm();
  loginError = '';
  registerError = '';

  onLogin(): void {
    this.loginError = '';
    this.registerError = '';

    if (this.loginForm.invalid) return;

    const v = this.loginForm.getRawValue();

    const data: LoginModel = {
      matricula: Number(v.matricula),
      password: v.password,
    };

    this.authApi.login(data).subscribe({
      next: (res) => {
        console.log('Incio de sasion exitoso', res.user);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log('COMPONENTE ERROR:', err);

        if (err.status === 401) {
          this.loginError = 'Matrícula o contraseña incorrecta';
          return;
        }

        if (err.status === 500) {
          this.loginError = 'Error interno del servidor';
          return;
        }

        this.loginError = err.message || 'Error desconocido';
      },
    });
  }

  onRegister(): void {
    this.loginError = '';
    this.registerError = '';
    if (this.registerForm.invalid) return;

    const v = this.registerForm.getRawValue();

    const data: RegisterModel = {
      matricula: Number(v.matricula),
      firstName: v.firstName,
      lastName: v.lastName,
      password: v.password,
    };

    this.authApi.register(data).subscribe({
      next: (res) => {
        console.log('Usuario creado', res);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log('COMPONENTE ERROR:', err);

        if (err.status === 409) {
          this.registerError = 'La matrícula ya existe';
          return;
        }

        if (err.status === 500) {
          this.registerError = 'Error interno del servidor';
          return;
        }

        this.registerError = err.message || 'Error desconocido';
      },
    });
  }

  logOut(): void {
    this.authService.removeToken();
    this.router.navigate(['/auth']);
  }

  // ESTO ES DE LA ANIMACION
  isActive = false;
  showRegister() {
    this.isActive = true;
    this.loginError = '';
    this.registerError = '';
  }

  showLogin() {
    this.isActive = false;
    this.loginError = '';
    this.registerError = '';
  }
}
