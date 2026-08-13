import { AfterViewInit, Component, afterRenderEffect, input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { createIcons, icons } from 'lucide';
import { Modal } from '../../../../shared/components/modal/modal';
import { MedicalAreaForm } from '../../forms/medical-area.form';

@Component({
  selector: 'app-medical-area-form',
  standalone: true,
  imports: [ReactiveFormsModule, Modal],
  templateUrl: './medical-area-form.html',
  styleUrl: './medical-area-form.scss',
})
export class MedicalAreaFormComponent implements AfterViewInit {
  readonly form = input.required<MedicalAreaForm>();
  readonly isOpen = input.required<boolean>();
  readonly submitLabel = input('Guardar area');
  readonly submitting = input(false);
  readonly submitted = output<void>();
  readonly closeRequested = output<void>();

  ngAfterViewInit(): void {
    createIcons({ icons });
  }

  submit(): void {
    if (!this.isOpen() || this.submitting()) {
      return;
    }

    const form = this.form();

    if (form.invalid) {
      form.markAllAsTouched();
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
