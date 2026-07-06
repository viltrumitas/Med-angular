import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/input/input';
import { OpqrstForm } from '../../forms/review.form';

@Component({
  selector: 'app-opqrst',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './opqrst.html',
  styleUrl: './opqrst.scss',
})
export class Opqrst {
  @Input({ required: true})
  group!: OpqrstForm;
}
