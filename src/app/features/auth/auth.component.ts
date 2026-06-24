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
  loginError = '';
  registerError = ''

  onLogin(): void {
    console.log('CLICK LOGIN');
    if (this.loginForm.invalid) {
      console.log('FORM INVALID');
      return
    };

    console.log('FORM VALID');
    this.loginError = '';

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
        console.log('COMPONENTE ERROR:', err);

        const msg =
          err.status === 401
            ? 'Matrícula o contraseña incorrecta'
            : err.status === 500
              ? 'Error interno del servidor'
              : err.message;

        this.loginError = msg;

        console.log('LOGIN ERROR FINAL:', this.loginError);
      },
    });
  }

  onRegister(): void {
    if (this.registerForm.invalid) return;

    this.registerError = '';

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
        this.registerError = err.message;
      },
    });
  }

  // ESTO ES DE LA ANIMACION
  isActive = false;
  showRegister() {
    this.isActive = true;
  }

  showLogin() {
    this.isActive = false;
  }
}
