import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() id!: string;
  @Input() labelText!: string;
  @Input() placeHolderText = '';
  @Input() name = '';
  @Input() required = false;

  @Input() variant: 'primary' | 'login' | 'number' | 'general' = 'primary';

  @Input() controlType: 'text' | 'checkbox' | 'number' | 'email' | 'password' | 'textarea' = 'text';

  @Input() autoCompleteAttr = 'off';
  @Input() rows = 4;

  value: string | boolean = '';
  disabled = false;

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  updateValue(value: any): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
