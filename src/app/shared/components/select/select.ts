import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption, SelectValue } from './models/select.model';

@Component({
  selector: 'app-select',
  standalone: true,
  templateUrl: './select.html',
  styleUrl: './select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  private static nextId = 0;

  readonly labelText = input<string | null>(null);
  readonly placeHolderText = input('Seleccione una opción');
  readonly options = input<readonly SelectOption[]>([]);
  readonly value = signal('');
  readonly disabled = signal(false);
  readonly selectId = input<string>();
  readonly generatedId = `app-select-${SelectComponent.nextId++}`;

  readonly resolvedId = computed(() => {
    return this.selectId() || this.generatedId;
  });

  private onChange: (value: SelectValue) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  writeValue(value: SelectValue): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: SelectValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled.set(disabled);
  }

  handleChange(event: Event): void {
    const element = event.target as HTMLSelectElement;
    const value = element.value;

    this.value.set(value);
    this.onChange(value === '' ? null : value);
  }

  handleBlur(): void {
    this.onTouched();
  }
}
