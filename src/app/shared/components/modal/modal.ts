import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Modal {
  readonly isOpen = input.required<boolean>();
  readonly preventClose = input(false);
  readonly closed = output<void>();

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  constructor() {
    afterRenderEffect(() => {
      this.syncDialogState();
    });
  }

  requestClose(): void {
    if (this.preventClose()) {
      return;
    }

    this.closed.emit();
  }

  handleCancel(event: Event): void {
    event.preventDefault();
    this.requestClose();
  }

  handleBackdropClick(event: MouseEvent): void {
    if (event.target !== event.currentTarget) {
      return;
    }

    this.requestClose();
  }

  private syncDialogState(): void {
    const dialog = this.dialog().nativeElement;
    const shouldBeOpen = this.isOpen();

    if (shouldBeOpen === dialog.open) {
      return;
    }

    if (shouldBeOpen) {
      dialog.showModal();
      return;
    }

    dialog.close();
  }
}
