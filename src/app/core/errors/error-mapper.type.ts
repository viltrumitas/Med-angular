import { HttpErrorResponse } from '@angular/common/http';
import { AppError } from './error.model';

export type ErrorMapper = (error: HttpErrorResponse) => AppError | null;
