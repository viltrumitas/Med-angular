import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { createCaseForm } from '../../forms/case.form';

@Component({
  selector: 'app-create-case',
  imports: [],
  templateUrl: './create-case.html',
  styleUrl: './create-case.scss',
})
export class CreateCase {
  createCase = createCaseForm();
  private _general = '';

  @Input()
  set general(value: string) {
    this._general = value;
  }
}
