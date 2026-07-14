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
  @Input() min?: number;
  @Input() max?: number;

  value: string | number | null = null;
  disabled = false;

  private onChange: (value: string | number | null) => void = () => { };
  private onTouched: () => void = () => { };

  writeValue(value: string | number | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string | number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  onBlur(): void {
    this.onTouched();
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.type !== 'number') {
      return;
    }

    const allowedKeys = [
      'Backspace',
      'Delete',
      'Tab',
      'Escape',
      'Enter',
      'ArrowLeft',
      'ArrowRight',
      'Home',
      'End',
    ];

    if (allowedKeys.includes(event.key)) {
      return;
    }

    if (
      (event.ctrlKey || event.metaKey) &&
      ['a', 'c', 'v', 'x'].includes(event.key.toLowerCase())
    ) {
      return;
    }

    if (!/^\d$/.test(event.key)) {
      event.preventDefault();
    }
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    let newValue: string | number | null = input.value;

    if (this.type === 'number') {

      newValue = input.value.replace(/\D/g, '');

      input.value = newValue;

      newValue = newValue === ''
        ? null
        : Number(newValue);
    }

    this.value = newValue;

    this.onChange(this.value);
  }
}
