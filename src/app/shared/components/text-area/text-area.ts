import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  standalone: true,
  templateUrl: './text-area.html',
  styleUrl: './text-area.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
})
export class TextareaComponent implements ControlValueAccessor {
  private static nextId = 0;

  readonly textareaId = input<string>();
  readonly labelText = input<string | null>(null);
  readonly placeHolderText = input('');
  readonly rows = input(4);
  readonly maxLength = input<number | null>(null);
  readonly value = signal('');
  readonly disabled = signal(false);
  readonly generatedId = `app-text-area-${TextareaComponent.nextId++}`;
  readonly resolvedId = computed(() => {
    return this.textareaId() || this.generatedId;
  });

  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  writeValue(value: string | null): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled.set(disabled);
  }

  handleInput(event: Event): void {
    const element = event.target as HTMLTextAreaElement;
    const value = element.value;

    this.value.set(value);
    this.onChange(value);
  }

  handleBlur(): void {
    this.onTouched();
  }
}
