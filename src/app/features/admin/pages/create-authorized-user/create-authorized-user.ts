import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { AuthorizedUserFormComponent } from '../../components/authorized-user-form/authorized-user-form';
import { createAuthorizedUserForm } from '../../forms/authorized-user.form';
import { mapCreateAuthorizedUser } from '../../mappers/authorized-user.mapper';
import { AdminApi } from '../../services/admin-api';

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

  readonly form = createAuthorizedUserForm();

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);


  createUser() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }


    const dto = mapCreateAuthorizedUser(
      this.form.getRawValue()
    );


    this.loading.set(true);
    this.error.set(null);


    this.api.createAuthorizedUser(dto)
      .subscribe({

        next: () => {
          this.router.navigate([
            '/dashboard/admin/authorized-users'
          ]);
        },


        error: (err) => {
          console.error(err);

          this.error.set(
            err.message ?? 'No se pudo crear el usuario'
          );

          this.loading.set(false);
        }

      });

  }

}
