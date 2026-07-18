import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CheckboxOption, CheckboxSelectionMode } from './model/option.model';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule],
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
  @Input() labelText = '';
  @Input() helperText = '';
  @Input() options: CheckboxOption<T>[] = [];
  @Input() mode: CheckboxSelectionMode = 'multiple';
  @Input() direction: 'row' | 'column' = 'column';
  @Input() required = false;
  @Input() compareWith: (first: T, second: T) => boolean = Object.is;

  value: T | T[] | null = null;

  disabled = false;

  private onChange: (value: T | T[] | null) => void = () => {};

  private onTouched: () => void = () => {};

  writeValue(value: T | T[] | null): void {
    if (this.mode === 'multiple') {
      this.value = Array.isArray(value) ? [...value] : [];
      return;
    }

    this.value = Array.isArray(value) ? (value[0] ?? null) : (value ?? null);
  }

  registerOnChange(fn: (value: T | T[] | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggleOption(option: CheckboxOption<T>): void {
    if (this.disabled || option.disabled) {
      return;
    }

    if (this.mode === 'single') {
      this.toggleSingleOption(option.value);
    } else {
      this.toggleMultipleOption(option.value);
    }

    this.onTouched();
  }

  isSelected(optionValue: T): boolean {
    if (this.mode === 'multiple') {
      const selectedValues = Array.isArray(this.value) ? this.value : [];

      return selectedValues.some((value) => this.compareWith(value, optionValue));
    }

    if (this.value === null || Array.isArray(this.value)) {
      return false;
    }

    return this.compareWith(this.value, optionValue);
  }

  markAsTouched(): void {
    this.onTouched();
  }

  trackOption(index: number, option: CheckboxOption<T>): T | number {
    return option.value ?? index;
  }

  private toggleSingleOption(optionValue: T): void {
    const alreadySelected = this.isSelected(optionValue);

    this.value = alreadySelected ? null : optionValue;

    this.onChange(this.value);
  }

  private toggleMultipleOption(optionValue: T): void {
    const selectedValues = Array.isArray(this.value) ? [...this.value] : [];

    const selectedIndex = selectedValues.findIndex((value) => this.compareWith(value, optionValue));

    if (selectedIndex >= 0) {
      selectedValues.splice(selectedIndex, 1);
    } else {
      selectedValues.push(optionValue);
    }

    this.value = selectedValues;

    this.onChange(selectedValues);
  }
}
