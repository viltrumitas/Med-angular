import { FormControl } from '@angular/forms';

export type RegsiterForm = {
  matricula: FormControl<string>;
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  password: FormControl<string>;
};
