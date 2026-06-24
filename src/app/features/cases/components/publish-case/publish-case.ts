import { Component, Input } from '@angular/core';
import { PublishCaseForm } from '../../forms/case.form';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-publish-case',
  imports: [ReactiveFormsModule],
  templateUrl: './publish-case.html',
  styleUrl: './publish-case.scss',
})
export class PublishCase {
  @Input()
  group!: PublishCaseForm;
}
