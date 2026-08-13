import { Service, signal } from '@angular/core';
import { AppError, ErrorDisplay } from '../errors/error.model';
import { HttpErrorResponse } from '@angular/common/http';
import { mapError } from '../errors/error.mapper';

@Service()
export class ErrorService {
  private readonly _error = signal<AppError | null>(null);

  readonly error = this._error.asReadonly();

  handle(error: HttpErrorResponse): void {
    const mappedError = mapError(error);

    this._error.set(
      mappedError ?? {
        title: 'Ocurrió un error',
        message: 'No fue posible completar la operación. Inténtalo nuevamente.',
      },
    );
  }

  show(message: string, title = 'Ocurrió un error'): void {
    this._error.set({
      title,
      message,
    });
  }

  clear(): void {
    this._error.set(null);
  }
}
