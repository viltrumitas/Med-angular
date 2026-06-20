import { Component, inject } from '@angular/core';
import { InputComponent } from '../../shared/components/input/input';
import { ButtonComponent } from '../../shared/components/button/button';
import { AuthService } from '../../core/services/auth';
import { Router } from '@angular/router';
import { RegisterData } from '../../core/modules/register';
import { LoginData } from '../../core/modules/login';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegsiterForm } from './forms/registerForm';
import { LoginForm } from './forms/loginForm';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm = new FormGroup<RegsiterForm>({
    matricula: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\d+$/)],
    }),
    firstName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    lastName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  loginForm = new FormGroup<LoginForm>({
    matricula: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\d+$/)],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  onLogin(): void {
    if (this.loginForm.invalid) return;

    const v = this.loginForm.getRawValue();

    const data: LoginData = {
      matricula: Number(v.matricula),
      password: v.password,
    };

    this.authService.login(data).subscribe({
      next: (res: any) => {
        console.log('Inicio de sesión exitoso', res.user);
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        console.error('Error backend:', err);
      },
    });
  }

  onRegister(): void {
    if (this.registerForm.invalid) return;

    const data = this.toRegisterData();

    this.authService.register(data).subscribe({
      next: (res) => {
        console.log('Usuario creado', res);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  private toRegisterData(): RegisterData {
    const v = this.registerForm.getRawValue();

    return {
      matricula: Number(v.matricula),
      firstName: v.firstName,
      lastName: v.lastName,
      password: v.password,
    };
  }

  isActive = false;

  showRegister() {
    this.isActive = true;
  }

  showLogin() {
    this.isActive = false;
  }
}
