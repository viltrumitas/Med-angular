import { Component, inject, OnInit, signal } from '@angular/core';
import { AdminApi } from '../../services/admin-api';
import { AuthorizedUserSummaryDto } from '../../dto/authorized-user-summary.dto';

@Component({
  selector: 'app-authorized-users',
  standalone: true,
  imports: [],
  templateUrl: './authorized-users.html',
  styleUrl: './authorized-users.scss',
})
export class AuthorizedUsers implements OnInit {
  private readonly adminApi = inject(AdminApi);

  readonly users = signal<AuthorizedUserSummaryDto[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading.set(true);

    this.adminApi.getAuthorizedUsers().subscribe({
      next: (users) => {
        this.users.set(users);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar los usuarios.');
        this.loading.set(false);
      },
    });
  }
}
