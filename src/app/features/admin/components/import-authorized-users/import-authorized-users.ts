import { AfterViewInit, Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { createIcons, icons } from 'lucide';

import { Modal } from '../../../../shared/components/modal/modal';
import { ImportAuthorizedUsersResponseDto } from '../../dto/import-authorized-users-response-.dto';
import { AdminApi } from '../../services/admin-api';
import { ErrorService } from '../../../../core/services/error.service';

@Component({
  selector: 'app-import-authorized-users',
  standalone: true,
  imports: [Modal],
  templateUrl: './import-authorized-users.html',
  styleUrl: './import-authorized-users.scss',
})
export class ImportAuthorizedUsers implements AfterViewInit {
  private readonly api = inject(AdminApi);
  private readonly errorService = inject(ErrorService);

  readonly isOpen = signal(true);
  readonly loading = signal(false);
  readonly fileError = signal<string | null>(null);
  readonly file = signal<File | null>(null);
  readonly dragging = signal(false);
  readonly result = signal<ImportAuthorizedUsersResponseDto | null>(null);

  @Output()
  readonly closeRequested = new EventEmitter<void>();

  @Output()
  readonly importCompleted = new EventEmitter<ImportAuthorizedUsersResponseDto>();

  ngAfterViewInit(): void {
    this.renderIcons();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const selectedFile = input.files?.item(0);

    if (!selectedFile) {
      return;
    }

    this.setSelectedFile(selectedFile);

    input.value = '';
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();

    if (this.loading()) {
      return;
    }

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy';
    }

    this.dragging.set(true);
  }

  onDragLeave(): void {
    this.dragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragging.set(false);

    if (this.loading()) {
      return;
    }

    const selectedFile = event.dataTransfer?.files.item(0);

    if (!selectedFile) {
      return;
    }

    this.setSelectedFile(selectedFile);
  }

  importUsers(): void {
    const selectedFile = this.file();

    if (!selectedFile || this.loading()) {
      return;
    }

    this.fileError.set(null);
    this.errorService.clear();
    this.loading.set(true);
    this.dragging.set(false);

    this.api
      .importAuthorizedUsers(selectedFile)
      .pipe(
        finalize(() => {
          this.loading.set(false);
          this.renderIcons();
        }),
      )
      .subscribe({
        next: (response) => {
          this.result.set(response);

          if (response.success) {
            this.importCompleted.emit(response);
          }

          this.renderIcons();
        },

        error: () => {},
      });
  }

  downloadTemplate(): void {
    if (this.loading()) {
      return;
    }

    this.fileError.set(null);
    this.errorService.clear();

    this.api.downloadTemplate().subscribe({
      next: (blob) => {
        const objectUrl = URL.createObjectURL(blob);
        const anchor = document.createElement('a');

        anchor.href = objectUrl;
        anchor.download = 'plantilla-usuarios-autorizados.csv';
        anchor.style.display = 'none';

        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();

        URL.revokeObjectURL(objectUrl);
      },

      error: () => {},
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

  closeModal(): void {
    if (this.loading()) {
      return;
    }

    this.resetState();
    this.errorService.clear();
    this.closeRequested.emit();
  }

  private setSelectedFile(selectedFile: File): void {
    this.result.set(null);
    this.fileError.set(null);
    this.errorService.clear();
    this.dragging.set(false);

    if (!this.isCsvFile(selectedFile)) {
      this.file.set(null);
      this.fileError.set('Selecciona un archivo válido en formato CSV.');
      this.renderIcons();
      return;
    }

    this.file.set(selectedFile);
    this.renderIcons();
  }

  private isCsvFile(file: File): boolean {
    const extensionIsValid = file.name.toLowerCase().endsWith('.csv');

    const mimeTypeIsValid =
      !file.type ||
      file.type === 'text/csv' ||
      file.type === 'application/csv' ||
      file.type === 'application/vnd.ms-excel';

    return extensionIsValid && mimeTypeIsValid;
  }

  private resetState(): void {
    this.file.set(null);
    this.result.set(null);
    this.fileError.set(null);
    this.dragging.set(false);
    this.loading.set(false);
  }

  private renderIcons(): void {
    window.setTimeout(() => {
      createIcons({ icons });
    });
  }
}
