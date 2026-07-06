import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/input/input';
import { SceneManagementForm } from '../../forms/review.form';

@Component({
  selector: 'app-scene-management',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './scene-management.html',
  styleUrl: './scene-management.scss',
})
export class SceneManagement {
  @Input({ required: true })
  group!: SceneManagementForm;
}
