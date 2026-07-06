import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/input/input';
import { SamplerForm } from '../../forms/review.form';

@Component({
  selector: 'app-sampler',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './sampler.html',
  styleUrl: './sampler.scss',
})
export class Sampler {
  @Input({ required: true })
  group!: SamplerForm;
}
