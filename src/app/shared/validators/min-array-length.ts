import { AbstractControl, ValidationErrors } from '@angular/forms';

export function minArrayLength(min: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!Array.isArray(value)) {
      return { notArray: true };
    }

    return value.length >= min
      ? null
      : { minArrayLength: { required: min, actual: value.length } };
  };
}