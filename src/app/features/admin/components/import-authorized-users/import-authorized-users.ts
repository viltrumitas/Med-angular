import { Component, signal, inject, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { ImportAuthorizedUsersResponseDto } from '../../dto/import-authorized-users-response-.dto';
import { AdminApi } from '../../services/admin-api';
import { Modal } from '../../../../shared/components/modal/modal';
import { createIcons, icons } from 'lucide';

@Component({
  selector: 'app-import-authorized-users',
  standalone: true,
  imports: [Modal],
  templateUrl: './import-authorized-users.html',
  styleUrl: './import-authorized-users.scss',
})
export class ImportAuthorizedUsers implements AfterViewInit {
  private readonly api = inject(AdminApi);

  readonly isOpen = signal(true);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly file = signal<File | null>(null);
  readonly dragging = signal(false);
  readonly result = signal<ImportAuthorizedUsersResponseDto | null>(null);

  @Output()
  closeRequested = new EventEmitter<void>();
  @Output()
  importCompleted = new EventEmitter<ImportAuthorizedUsersResponseDto>();

  ngAfterViewInit(): void {
    this.renderIcons();
  }

  private setSelectedFile(file: File) {
    this.result.set(null);
    this.error.set(null);

    if (!file.name.toLowerCase().endsWith('.csv')) {
      this.file.set(null);
      this.error.set('Selecciona un archivo CSV válido.');
      return;
    }

    this.file.set(file);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    this.setSelectedFile(input.files[0]);
    this.renderIcons();
  }

  importUsers() {
    const file = this.file();

    if (!file) {
      return;
    }

    this.error.set(null);
    this.loading.set(true);

    this.api.importAuthorizedUsers(file).subscribe({
      next: (result) => {
        this.result.set(result);
        this.loading.set(false);

        if (result.success) {
          this.importCompleted.emit(result);
        }

        this.renderIcons();
      },
      error: (err) => {
        this.error.set(err.error?.message ?? 'No se pudo importar el archivo.');
        this.loading.set(false);
        this.renderIcons();
      },
    });
  }

  downloadTemplate() {
    this.api.downloadTemplate().subscribe({
      next: blob => {
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');

        a.href = url;
        a.download = 'plantilla-usuarios-autorizados.csv';
        a.click();

        URL.revokeObjectURL(url);
      },

      error: err => {
        console.error(err);

        this.error.set(
          'No se pudo descargar la plantilla.'
        );
      },
    });
  }

  getRoleLabel(role: string): string {
    switch (role) {
      case 'STUDENT':
        return 'Estudiante';

      case 'TEACHER':
        return 'Docente';

      case 'ADMIN':
        return 'Administrador';

      default:
        return role;
    }
  }

  closeModal() {
    if (this.loading()) {
      return;
    }

    this.file.set(null);
    this.result.set(null);
    this.error.set(null);

    this.closeRequested.emit();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragging.set(true);
  }

  onDragLeave() {
    this.dragging.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();

    this.dragging.set(false);
    const files = event.dataTransfer?.files;

    if (!files?.length) {
      return;
    }

    this.setSelectedFile(files[0]);
    this.renderIcons();
  }

  private renderIcons() {
    setTimeout(() => {
      createIcons({ icons });
    });
  }
}
