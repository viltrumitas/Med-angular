import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TextareaComponent } from '../../../../shared/components/text-area/text-area';

@Component({
  selector: 'app-feedback',
  imports: [ReactiveFormsModule, TextareaComponent],
  templateUrl: './feedback.html',
  styleUrl: './feedback.scss',
})
export class Feedback {
  @Input({ required: true })
  control!: FormControl<string | null>;
}
