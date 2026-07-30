import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { createIcons, icons } from 'lucide';

import { ImportAuthorizedUsers } from '../../components/import-authorized-users/import-authorized-users';
import { CreateAuthorizedUser } from '../create-authorized-user/create-authorized-user';

import { AdminApi } from '../../services/admin-api';
import { AuthorizedUserSummaryDto } from '../../dto/authorized-user-summary.dto';
import { ImportAuthorizedUsersResponseDto } from '../../dto/import-authorized-users-response-.dto';

@Component({
  selector: 'app-authorized-users',
  standalone: true,
  imports: [ImportAuthorizedUsers, CreateAuthorizedUser],
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
  readonly createOpen = signal(false);

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

  ngOnInit(): void {
    this.loadUsers();
  }

  updateSearch(value: string): void {
    this.search.set(value);
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

      error: (error) => {
        console.error(error);

        this.error.set('No se pudieron cargar los usuarios.');
        this.loading.set(false);
      },
    });
  }

  openCreateModal(): void {
    this.createOpen.set(true);
  }

  closeCreateModal(): void {
    this.createOpen.set(false);
  }

  onUserCreated(): void {
    this.createOpen.set(false);
    this.loadUsers();
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

      error: (error) => {
        console.error(error);

        this.error.set('No se pudo eliminar el usuario.');
      },
    });
  }

  openImportModal(): void {
    this.importOpen.set(true);
  }

  closeImportModal(): void {
    this.importOpen.set(false);
  }

  onImportCompleted(result: ImportAuthorizedUsersResponseDto): void {
    console.log(result);
    this.loadUsers();
  }

  private renderIcons(): void {
    setTimeout(() => {
      createIcons({ icons });
    });
  }
}
