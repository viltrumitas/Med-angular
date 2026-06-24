import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/input/input';
import { TextareaComponent } from '../../../../shared/components/text-area/text-area';
import { GeneralForm } from '../../forms/case.form';

@Component({
  selector: 'app-general-section',
  imports: [ReactiveFormsModule, InputComponent, TextareaComponent],
  templateUrl: './general-section.html',
  styleUrl: './general-section.scss',
})
export class GeneralSection {
  @Input({ required: true })
  group!: GeneralForm;
}
