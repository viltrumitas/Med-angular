import { AfterViewInit, Component, ElementRef, ViewChild, effect, inject } from '@angular/core';
import { createIcons, icons } from 'lucide';
import { ErrorService } from '../../../core/services/error.service';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.html',
  styleUrl: './error.scss',
})
export class Error implements AfterViewInit {
  readonly errorService = inject(ErrorService);

  @ViewChild('errorDialog')
  private readonly errorDialog?: ElementRef<HTMLDialogElement>;

  constructor() {
    effect(() => {
      const error = this.errorService.error();

      if (!error) {
        this.closeDialog();
        return;
      }

      this.openDialog();
    });
  }

  ngAfterViewInit(): void {
    this.syncDialog();
  }

  close(): void {
    this.errorService.clear();
  }

  onCancel(event: Event): void {
    event.preventDefault();
    this.close();
  }

  private openDialog(): void {
    queueMicrotask(() => {
      const dialog = this.errorDialog?.nativeElement;

      if (!dialog) {
        return;
      }

      if (!dialog.open) {
        dialog.showModal();
      }

      createIcons({ icons });
    });
  }

  private closeDialog(): void {
    const dialog = this.errorDialog?.nativeElement;

    if (dialog?.open) {
      dialog.close();
    }
  }

  private syncDialog(): void {
    if (this.errorService.error()) {
      this.openDialog();
    }
  }
}
