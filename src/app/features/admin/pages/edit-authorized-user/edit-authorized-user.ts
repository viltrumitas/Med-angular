import { Component, inject, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { AuthorizedUserFormComponent } from '../../components/authorized-user-form/authorized-user-form';
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

  readonly form = createAuthorizedUserForm();

  private userId!: string;

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id')!;

    this.loadUser();
  }

  loadUser() {
    this.api.getAuthorizedUser(this.userId).subscribe({
      next: (user) => {
        this.form.patchValue({
          matricula: user.matricula,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        });
      },
    });
  }

  updateUser() {
    const dto = mapUpdateAuthorizedUser(this.form.getRawValue());

    this.api.updateAuthorizedUser(this.userId, dto).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/admin/authorized-users']);
      },
    });
  }
}
