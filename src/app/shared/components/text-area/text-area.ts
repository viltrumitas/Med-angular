import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  imports: [],
  templateUrl: './text-area.html',
  styleUrl: './text-area.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
})
export class TextareaComponent implements ControlValueAccessor {
  @Input() labelText!: string;
  @Input() placeHolderText = '';
  @Input() rows = 4;

  value: string = '';
  disabled = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event) {
    const value = (event.target as HTMLTextAreaElement).value;
    this.value = value;
    this.onChange(value);
  }

  onBlur() {
    this.onTouched();
  }
}
