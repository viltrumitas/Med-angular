import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

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
export class TextareaComponent {
  @Input() labelText!: string;
  @Input() placeHolderText = '';
  @Input() rows = 4;

  value: any = '';
  disabled = false;

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
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

  change(value: string) {
    this.value = value;
    this.onChange(value);
  }
}
