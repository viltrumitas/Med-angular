import { afterRenderEffect, Component, ElementRef, input, output, viewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  readonly isOpen = input.required<boolean>();
  readonly preventClose = input(false);

  readonly closed = output<void>();

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  constructor() {
    afterRenderEffect(() => {
      const dialogElement = this.dialog().nativeElement;

      if (this.isOpen() && !dialogElement.open) {
        dialogElement.showModal();
        return;
      }

      if (!this.isOpen() && dialogElement.open) {
        dialogElement.close();
      }
    });
  }

  requestClose(): void {
    if (this.preventClose()) {
      return;
    }

    this.closed.emit();
  }

  onCancel(event: Event): void {
    event.preventDefault();
    this.requestClose();
  }
}
