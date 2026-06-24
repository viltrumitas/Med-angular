import { Component, Input } from '@angular/core';
import { FindingsForm } from '../../forms/case.form';
import { ReactiveFormsModule } from '@angular/forms';
import { TextareaComponent } from '../../../../shared/components/text-area/text-area';

@Component({
  selector: 'app-findings',
  imports: [ReactiveFormsModule, TextareaComponent],
  templateUrl: './findings.html',
  styleUrl: './findings.scss',
})
export class Findings {
  @Input({ required: true })
  group!: FindingsForm;
}
