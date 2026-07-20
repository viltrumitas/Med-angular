import { Component, inject } from '@angular/core';
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

  createUser() {
    const dto = mapCreateAuthorizedUser(this.form.getRawValue());

    this.api.createAuthorizedUser(dto).subscribe({
      next: () => {
        this.router.navigate([`/dashboard/admin/authorized-users`]);
      },
    });
  }
}
