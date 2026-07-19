import { Component, input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthorizedUserForm } from '../../forms/authorized-user.form';


@Component({
  selector: 'app-authorized-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './authorized-user-form.html',
  styleUrl: './authorized-user-form.scss',
})
export class AuthorizedUserFormComponent {
  readonly form = input.required<AuthorizedUserForm>();

  readonly submitted = output<void>();

  readonly submitLabel = input('Guardar');

  submit() {
    if (this.form().invalid) {
      this.form().markAllAsTouched();
      return;
    }

    this.submitted.emit();
  }
}
