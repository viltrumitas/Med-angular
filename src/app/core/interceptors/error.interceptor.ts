import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';
import { mapError } from '../errors/error.mapper';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const mappedError = mapError(error);

      if (mappedError) {
        errorService.show(mappedError.title, mappedError.message);
      }

      return throwError(() => error);
    }),
  );
};
