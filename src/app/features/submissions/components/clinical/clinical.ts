import { Component, Input } from '@angular/core';
import { ClinicalForm } from '../../form/submission-form.factory';
import { ReactiveFormsModule } from '@angular/forms';
import { TextareaComponent } from '../../../../shared/components/text-area/text-area';

@Component({
  selector: 'app-clinical',
  imports: [ReactiveFormsModule, TextareaComponent],
  templateUrl: './clinical.html',
  styleUrl: './clinical.scss',
})
export class Clinical {
  @Input({ required: true })
  group!: ClinicalForm;
}
