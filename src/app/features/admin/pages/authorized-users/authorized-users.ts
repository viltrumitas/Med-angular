import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

import { AdminApi } from '../../services/admin-api';
import { AuthorizedUserSummaryDto } from '../../dto/authorized-user-summary.dto';
import { ImportAuthorizedUsersResponseDto } from '../../dto/import-authorized-users-response-.dto';
import { createIcons, icons } from 'lucide';
import { ImportAuthorizedUsers } from '../../components/import-authorized-users/import-authorized-users';

@Component({
  selector: 'app-authorized-users',
  standalone: true,
  imports: [ImportAuthorizedUsers],
  templateUrl: './authorized-users.html',
  styleUrl: './authorized-users.scss',
})
export class AuthorizedUsers implements OnInit {
  private readonly adminApi = inject(AdminApi);
  private readonly router = inject(Router);

  readonly users = signal<AuthorizedUserSummaryDto[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly search = signal('');
  readonly importOpen = signal(false);
  readonly filteredUsers = computed(() => {
    const value = this.search().toLowerCase().trim();

    if (!value) {
      return this.users();
    }

    return this.users().filter((user) => {
      const matricula = user.matricula.toString();
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const role = user.role.toLowerCase();

      return matricula.includes(value) || fullName.includes(value) || role.includes(value);
    });
  });

  updateSearch(value: string) {
    this.search.set(value);
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading.set(true);
    this.error.set(null);

    this.adminApi.getAuthorizedUsers().subscribe({
      next: (users) => {
        this.users.set(users);
        this.loading.set(false);
        this.renderIcons();
      },

      error: (err) => {
        console.error(err);

        this.error.set('No se pudieron cargar los usuarios.');

        this.loading.set(false);
      },
    });
  }

  createUser(): void {
    this.router.navigate(['/dashboard/admin/authorized-users/new']);
  }

  editUser(id: string): void {
    this.router.navigate(['/dashboard/admin/authorized-users', id, 'edit']);
  }

  deleteUser(id: string): void {
    const confirmDelete = confirm('¿Eliminar usuario autorizado?');

    if (!confirmDelete) {
      return;
    }

    this.adminApi.deleteAuthorizedUser(id).subscribe({
      next: () => {
        this.loadUsers();
      },

      error: (err) => {
        console.error(err);

        this.error.set('No se pudo eliminar el usuario.');
      },
    });
  }

  openImportModal() {
    console.log('Abrir modal');
    this.importOpen.set(true);
  }

  closeImportModal() {
    this.importOpen.set(false);
  }

  onImportCompleted(result: ImportAuthorizedUsersResponseDto) {

    this.loadUsers();

    console.log(result);

  }

  private renderIcons() {
    setTimeout(() => {
      createIcons({ icons });
    });
  }
}
