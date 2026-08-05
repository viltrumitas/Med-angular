import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMapper } from './error-mapper.type';
import { mapAuthError } from './mappers/auth-error.mapper';
import { AppError } from './error.model';
import { mapAdminError } from './mappers/admin-error.mapper';

const errorMapper: ErrorMapper[] = [mapAuthError, mapAdminError];

export function mapError(error: HttpErrorResponse): AppError | null {
  for (const mapper of errorMapper) {
    const mappedError = mapper(error);

    if (mappedError) {
      return mappedError;
    }
  }

  return null;
}
