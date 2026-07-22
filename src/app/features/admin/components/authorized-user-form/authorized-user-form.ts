import { Component, input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { Modal } from '../../../../shared/components/modal/modal';
import { AuthorizedUserForm } from '../../forms/authorized-user.form';

@Component({
  selector: 'app-authorized-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, Modal],
  templateUrl: './authorized-user-form.html',
  styleUrl: './authorized-user-form.scss',
})
export class AuthorizedUserFormComponent {
  readonly form = input.required<AuthorizedUserForm>();
  readonly isOpen = input.required<boolean>();

  readonly submitLabel = input('Guardar usuario');
  readonly submitting = input(false);
  readonly error = input<string | null>(null);

  readonly submitted = output<void>();
  readonly closeRequested = output<void>();

  submit(): void {
    if (this.submitting()) {
      return;
    }

    if (this.form().invalid) {
      this.form().markAllAsTouched();
      return;
    }

    this.submitted.emit();
  }

  onCancel(): void {
    if (this.submitting()) {
      return;
    }

    this.closeRequested.emit();
  }
}
