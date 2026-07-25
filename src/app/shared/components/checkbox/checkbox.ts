import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { CheckboxOption, CheckboxSelectionMode } from './model/option.model';

export type CheckboxDirection = 'row' | 'column';
export type CheckboxValue<T> = T | readonly T[] | null;

@Component({
  selector: 'app-checkbox',
  standalone: true,
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Checkbox),
      multi: true,
    },
  ],
})
export class Checkbox<T = string> implements ControlValueAccessor {
  private static nextId = 0;

  readonly labelText = input('');
  readonly helperText = input('');
  readonly options = input<readonly CheckboxOption<T>[]>([]);
  readonly mode = input<CheckboxSelectionMode>('multiple');
  readonly direction = input<CheckboxDirection>('column');
  readonly required = input(false);
  readonly compareWith = input<(first: T, second: T) => boolean>(Object.is);
  readonly value = signal<T | T[] | null>(null);
  readonly disabled = signal(false);
  readonly instanceId = Checkbox.nextId++;
  readonly groupName = `app-checkbox-group-${this.instanceId}`;
  readonly helperId = `app-checkbox-helper-${this.instanceId}`;

  private onChange: (value: T | T[] | null) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  writeValue(value: CheckboxValue<T>): void {
    if (this.mode() === 'multiple') {
      this.value.set(Array.isArray(value) ? [...value] : []);
      return;
    }

    this.value.set(Array.isArray(value) ? (value[0] ?? null) : (value ?? null));
  }

  registerOnChange(fn: (value: T | T[] | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled.set(disabled);
  }

  toggleOption(option: CheckboxOption<T>): void {
    if (this.disabled() || option.disabled) {
      return;
    }

    if (this.mode() === 'single') {
      this.toggleSingleOption(option.value);
    } else {
      this.toggleMultipleOption(option.value);
    }

    this.onTouched();
  }

  isSelected(optionValue: T): boolean {
    const currentValue = this.value();
    const compare = this.compareWith();

    if (this.mode() === 'multiple') {
      const selectedValues = Array.isArray(currentValue) ? currentValue : [];

      return selectedValues.some((value) => compare(value, optionValue));
    }

    if (currentValue === null || Array.isArray(currentValue)) {
      return false;
    }

    return compare(currentValue, optionValue);
  }

  markAsTouched(): void {
    this.onTouched();
  }

  trackOption(index: number): number {
    return index;
  }

  private toggleSingleOption(optionValue: T): void {
    const nextValue = this.isSelected(optionValue) ? null : optionValue;

    this.value.set(nextValue);
    this.onChange(nextValue);
  }

  private toggleMultipleOption(optionValue: T): void {
    const currentValue = this.value();

    const selectedValues = Array.isArray(currentValue) ? [...currentValue] : [];

    const compare = this.compareWith();

    const selectedIndex = selectedValues.findIndex((value) => compare(value, optionValue));

    const nextValues =
      selectedIndex >= 0
        ? selectedValues.filter((_, index) => index !== selectedIndex)
        : [...selectedValues, optionValue];

    this.value.set(nextValues);
    this.onChange(nextValues);
  }
}
