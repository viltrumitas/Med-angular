import { FormControl } from '@angular/forms';

export type LoginForm = {
  matricula: FormControl<string>;
  password: FormControl<string>;
};
