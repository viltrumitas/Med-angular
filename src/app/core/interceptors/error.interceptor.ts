import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('INTERCEPTOR', error);
      
      const message = Array.isArray(error.error?.message)
        ? error.error.message.join(', ')
        : error.error?.message || 'Error inesperado';

      return throwError(() => ({
        status: error.status,
        message,
      }));
    }),
  );
};
