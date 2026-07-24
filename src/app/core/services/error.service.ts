import { Service, signal } from '@angular/core';
import { AppError } from '../models/error.model';

@Service()
export class ErrorService {
  private readonly _error = signal<AppError | null>(null);

  readonly error = this._error.asReadonly();

  show(message: string, title = 'Ocurrio  un error'): void {
    this._error.set({
      title,
      message,
    });
  }

  clear(): void {
    this._error.set(null);
  }
}
