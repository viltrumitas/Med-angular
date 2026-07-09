import { afterRenderEffect, Component, ElementRef, input, output, viewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  readonly isOpen = input.required<boolean>();
  readonly closed = output<void>();

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  constructor() {
    afterRenderEffect(() => {
      const dialogElement = this.dialog().nativeElement;

      if (this.isOpen() && !dialogElement.open) {
        dialogElement.showModal();
      } else if (!this.isOpen() && dialogElement.open) {
        dialogElement.close();
      }
    });
  }

  requestClose(): void {
    this.closed.emit();
  }

  onCancel(event: Event): void {
    event.preventDefault();
    this.requestClose();
  }
}
