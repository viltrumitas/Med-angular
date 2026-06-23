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
  @Input() labelText!: string;
  @Input() type: 'text' | 'number' | 'email' | 'password' = 'text';
  @Input() placeHolderText = '';

  value: string | number | null = '';
  disabled = false;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(value: boolean): void {
    this.disabled = value;
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    this.value = value;
    this.onChange(value);
  }

  onBlur() {
    this.onTouched();
  }
}
