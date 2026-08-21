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
import { ErrorService } from '../../core/services/error.service';
import { createIcons, icons } from 'lucide';

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
  private readonly errorService = inject(ErrorService);
  private readonly router = inject(Router);

  loginForm = createLoginForm();
  registerForm = createRegisterForm();
  isActive = false;

  onLogin(): void {
    this.errorService.clear();

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const value = this.loginForm.getRawValue();

    const data: LoginModel = {
      identifier: value.identifier,
      password: value.password,
    };

    this.authApi.login(data).subscribe({
      next: () => {
        this.router.navigate(this.authService.getDashboardRoute());
      },
      error: () => {
        this.renderIcons();
      },
    });
  }

  onRegister(): void {
    this.errorService.clear();

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const value = this.registerForm.getRawValue();

    const data: RegisterModel = {
      matricula: Number(value.matricula),
      email: value.email,
      password: value.password,
    };

    this.authApi.register(data).subscribe({
      next: () => {
        this.router.navigate(this.authService.getDashboardRoute());
      },
      error: () => {
        this.renderIcons();
      },
    });
  }

  // ESTO ES DE LA ANIMACION
  showRegister() {
    this.isActive = true;
    this.errorService.clear();
  }

  showLogin() {
    this.isActive = false;
    this.errorService.clear();
  }

  private renderIcons(): void {
    setTimeout(() => {
      createIcons({ icons });
    });
  }
}
