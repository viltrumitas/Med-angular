import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { ErrorService } from '../services/error.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const message = getErrorMessage(error);

      errorService.show(message);

      return throwError(() => error);
    }),
  );
};

function getErrorMessage(error: HttpErrorResponse): string {
  if (error.status === 0) {
    return 'No se pudo conectar con el servidor.';
  }

  if (Array.isArray(error.error?.message)) {
    return error.error.message.join(', ');
  }

  if (typeof error.error?.message === 'string') {
    return error.error.message;
  }

  switch (error.status) {
    case 400:
      return 'La información enviada no es válida.';

    case 401:
      return 'Tu sesión ha expirado. Inicia sesión nuevamente.';

    case 403:
      return 'No tienes permisos para realizar esta acción.';

    case 404:
      return 'No se encontró el recurso solicitado.';

    case 409:
      return 'La operación entra en conflicto con información existente.';

    case 500:
      return 'Ocurrió un error interno en el servidor.';

    default:
      return 'No se pudo completar la operación.';
  }
}
