import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button';
import { InputComponent } from '../../shared/components/input/input';
import { AuthApi } from './services/auth-api.service';
import { Router } from '@angular/router';
import { LoginModel } from './models/login.model';
import { RegisterModel } from './models/register.model';
import { createLoginForm, createRegisterForm } from './forms/auth.forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent, InputComponent, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  private readonly authService = inject(AuthApi);
  private readonly router = inject(Router);
  loginForm = createLoginForm();
  registerForm = createRegisterForm();
  errorMessage = '';

  onLogin(): void {
    if (this.loginForm.invalid) return;

    this.errorMessage = '';

    const v = this.loginForm.getRawValue();

    const data: LoginModel = {
      matricula: Number(v.matricula),
      password: v.password,
    };

    this.authService.login(data).subscribe({
      next: (res) => {
        console.log('Incio de sasion exitoso', res.user);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log('COMPONENTE', err);
        switch (err.status) {
          case 401:
            this.errorMessage = 'Matrícula o contraseña incorrecta';
            break;
          case 500:
            this.errorMessage = 'Error interno del servidor';
            break;
          default:
            this.errorMessage = err.message;
        }
      },
    });
  }

  onRegister(): void {
    if (this.registerForm.invalid) return;

    this.errorMessage = '';

    const v = this.registerForm.getRawValue();

    const data: RegisterModel = {
      matricula: Number(v.matricula),
      firstName: v.firstName,
      lastName: v.lastName,
      password: v.password,
    };

    this.authService.register(data).subscribe({
      next: (res) => {
        console.log('Usuario creado', res);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = err.message;
      },
    });
  }

  // ESTO ES DE LA ANIMACION
  isActive = false;
  showRegister() {
    this.errorMessage = '';
    this.isActive = true;
  }

  showLogin() {
    this.errorMessage = '';
    this.isActive = false;
  }
}
