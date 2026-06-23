import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/input/input';

@Component({
  selector: 'app-general-section',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './general-section.html',
  styleUrl: './general-section.scss',
})
export class GeneralSection {
  @Input({ required: true }) group!: FormGroup<{
    title: FormControl<string>;
    consult: FormControl<string>;
    scenary: FormControl<string>;
  }>;
}
