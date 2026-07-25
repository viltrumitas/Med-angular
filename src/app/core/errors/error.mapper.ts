import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMapper } from './error-mapper.type';
import { mapAuthError } from './mappers/auth-error.mapper';
import { AppError } from './error.model';

const errorMapper: ErrorMapper[] = [mapAuthError];

export function mapError(error: HttpErrorResponse): AppError | null {
  for (const mapper of errorMapper) {
    const mappedError = mapper(error);

    if (mappedError) {
      return mappedError;
    }
  }

  return null;
}
