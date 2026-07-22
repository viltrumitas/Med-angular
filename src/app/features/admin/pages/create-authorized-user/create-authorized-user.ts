import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { AuthorizedUserFormComponent } from '../../components/authorized-user-form/authorized-user-form';
import { createAuthorizedUserForm } from '../../forms/authorized-user.form';
import { mapCreateAuthorizedUser } from '../../mappers/authorized-user.mapper';
import { AdminApi } from '../../services/admin-api';
import { createIcons, icons } from 'lucide';

@Component({
  selector: 'app-create-authorized-user',
  standalone: true,
  imports: [AuthorizedUserFormComponent],
  templateUrl: './create-authorized-user.html',
  styleUrl: './create-authorized-user.scss',
})
export class CreateAuthorizedUser {
  private readonly api = inject(AdminApi);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly form = createAuthorizedUserForm();

  readonly isOpen = signal(true);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  createUser(): void {
    if (this.loading()) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dto = mapCreateAuthorizedUser(this.form.getRawValue());

    this.loading.set(true);
    this.error.set(null);

    this.api
      .createAuthorizedUser(dto)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.closeModal();
          this.renderIcons();
        },
        error: (error) => {
          console.error('[CreateAuthorizedUser] Error al crear usuario:', error);

          this.error.set(error.error?.message ?? 'No se pudo crear el usuario autorizado.');
          this.loading.set(false);

          this.renderIcons();
        },
      });
  }

  closeModal(): void {
    if (this.loading()) {
      return;
    }

    this.isOpen.set(false);
    this.router.navigate(['/dashboard/admin/authorized-users']);
  }

  private renderIcons() {
    setTimeout(() => {
      createIcons({ icons });
    });
  }
}
