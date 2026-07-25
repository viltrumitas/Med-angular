import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type InputType = 'text' | 'number' | 'email' | 'password';
export type InputValue = string | number | null;

@Component({
  selector: 'app-input',
  standalone: true,
  templateUrl: './input.html',
  styleUrl: './input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  private static nextId = 0;

  readonly labelText = input<string | null>(null);
  readonly type = input<InputType>('text');
  readonly placeHolderText = input('');
  readonly maxLength = input<number | null>(null);
  readonly suffix = input<string | null>(null);
  readonly compact = input(false);
  readonly value = signal<InputValue>(null);
  readonly disabled = signal(false);
  readonly passwordVisible = signal(false);
  readonly inputId = input<string>();
  readonly autocomplete = input<string | null>(null);
  readonly generatedId = `app-input-${InputComponent.nextId++}`;
  readonly resolvedId = computed(() => this.inputId() || this.generatedId);

  readonly inputType = computed<'text' | 'email' | 'password'>(() => {
    const type = this.type();

    if (type === 'number') {
      return 'text';
    }

    if (type === 'password' && this.passwordVisible()) {
      return 'text';
    }

    return type;
  });

  readonly inputMode = computed<'text' | 'numeric' | 'email'>(() => {
    switch (this.type()) {
      case 'number':
        return 'numeric';

      case 'email':
        return 'email';

      default:
        return 'text';
    }
  });

  private onChange: (value: InputValue) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  writeValue(value: InputValue): void {
    this.value.set(value ?? null);
  }

  registerOnChange(fn: (value: InputValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled.set(disabled);
  }

  handleInput(event: Event): void {
    const element = event.target as HTMLInputElement;
    const value = this.normalizeValue(element.value);

    if (this.type() === 'number') {
      element.value = value === null ? '' : String(value);
    }

    this.value.set(value);
    this.onChange(value);
  }

  handleBlur(): void {
    this.onTouched();
  }

  togglePasswordVisibility(): void {
    if (this.disabled() || this.type() !== 'password') {
      return;
    }

    this.passwordVisible.update((visible) => !visible);
  }

  private normalizeValue(rawValue: string): InputValue {
    if (this.type() !== 'number') {
      return rawValue;
    }

    const sanitizedValue = rawValue.replace(/\D/g, '');

    return sanitizedValue === '' ? null : Number(sanitizedValue);
  }
}
