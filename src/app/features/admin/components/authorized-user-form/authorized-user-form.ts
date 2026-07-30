import { afterRenderEffect, Component, input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { createIcons, icons } from 'lucide';

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

  constructor() {
    afterRenderEffect(() => {
      this.isOpen();
      this.submitting();
      this.error();

      createIcons({ icons });
    });
  }

  submit(): void {
    if (!this.isOpen() || this.submitting()) {
      return;
    }

    const currentForm = this.form();

    if (currentForm.invalid) {
      currentForm.markAllAsTouched();
      return;
    }

    this.submitted.emit();
  }

  onCancel(): void {
    if (!this.isOpen() || this.submitting()) {
      return;
    }

    this.closeRequested.emit();
  }
}
