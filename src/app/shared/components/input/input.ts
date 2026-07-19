import { CommonModule } from '@angular/common';
import { Component, forwardRef, input } from '@angular/core';
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
  readonly labelText = input<string | null>(null);
  readonly type = input<'text' | 'number' | 'email' | 'password'>('text');
  readonly placeHolderText = input('');
  readonly maxLength = input<number | null>(null);
  readonly suffix = input<string | null>(null);
  readonly compact = input(false);

  value: string | number | null = null;
  disabled = false;
  passwordVisible = false;

  private onChange: (value: string | number | null) => void = () => {};
  private onTouched: () => void = () => {};

  get inputType(): 'text' | 'email' | 'password' {
    const currentType = this.type();

    if (currentType === 'number') {
      return 'text';
    }
    if (currentType === 'password' && this.passwordVisible) {
      return 'text';
    }
    return currentType;
  }
  get inputMode(): 'text' | 'decimal' | 'email' {
    if (this.type() === 'number') {
      return 'decimal';
    }

    if (this.type() === 'email') {
      return 'email';
    }

    return 'text';
  }

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

  togglePasswordVisibility(): void {
    if (this.disabled || this.type() !== 'password') {
      return;
    }

    this.passwordVisible = !this.passwordVisible;
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.type() !== 'number') {
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
    const inputElement = event.target as HTMLInputElement;

    let newValue: string | number | null = inputElement.value;

    if (this.type() === 'number') {
      const sanitizedValue = inputElement.value.replace(/\D/g, '');

      inputElement.value = sanitizedValue;

      newValue = sanitizedValue === '' ? null : Number(sanitizedValue);
    }

    this.value = newValue;
    this.onChange(this.value);
  }
}
