import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { createIcons, icons } from 'lucide';

import { AuthorizedUserFormComponent } from '../../components/authorized-user-form/authorized-user-form';
import { Modal } from '../../../../shared/components/modal/modal';
import { createAuthorizedUserForm } from '../../forms/authorized-user.form';
import { mapUpdateAuthorizedUser } from '../../mappers/authorized-user.mapper';
import { AdminApi } from '../../services/admin-api';

@Component({
  selector: 'app-edit-authorized-user',
  standalone: true,
  imports: [AuthorizedUserFormComponent],
  templateUrl: './edit-authorized-user.html',
  styleUrl: './edit-authorized-user.scss',
})
export class EditAuthorizedUser implements OnInit {
  private readonly api = inject(AdminApi);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  readonly form = createAuthorizedUserForm();

  readonly isModalOpen = signal(true);
  readonly loading = signal(true);
  readonly saving = signal(false);

  readonly loadError = signal<string | null>(null);
  readonly submitError = signal<string | null>(null);

  private userId: string | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.loading.set(false);
      this.loadError.set('No se encontró el identificador del usuario autorizado.');

      this.renderIcons();
      return;
    }

    this.userId = id;
    this.loadUser();
  }

  loadUser(): void {
    if (!this.userId) {
      return;
    }

    this.loading.set(true);
    this.loadError.set(null);

    this.api
      .getAuthorizedUser(this.userId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user) => {
          this.form.reset({
            matricula: user.matricula,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
          });

          this.loading.set(false);
          this.renderIcons();
        },
        error: (error) => {
          console.error('[EditAuthorizedUser] Error al cargar usuario:', error);

          this.loadError.set(
            error.error?.message ?? 'No se pudo cargar la información del usuario.',
          );

          this.loading.set(false);
          this.renderIcons();
        },
      });
  }

  updateUser(): void {
    if (!this.userId || this.saving()) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.submitError.set(null);

    const dto = mapUpdateAuthorizedUser(this.form.getRawValue());

    this.api
      .updateAuthorizedUser(this.userId, dto)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.saving.set(false);
          this.closeModal();
          this.renderIcons();
        },
        error: (error) => {
          console.error('[EditAuthorizedUser] Error al actualizar usuario:', error);

          this.submitError.set(
            error.error?.message ?? 'No se pudo actualizar el usuario autorizado.',
          );

          this.saving.set(false);
          this.renderIcons();
        },
      });
  }

  closeModal(): void {
    if (this.saving()) {
      return;
    }

    this.isModalOpen.set(false);
    this.router.navigate(['/dashboard/admin/authorized-users']);
  }

  private renderIcons() {
    setTimeout(() => {
      createIcons({ icons });
    });
  }
}
