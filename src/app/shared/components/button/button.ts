import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ButtonType, ButtonVariant } from './model/button.type';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.app-button--full-width]': 'fullWidth()',
  },
})
export class ButtonComponent {
  readonly text = input('Button');
  readonly variant = input<ButtonVariant>('primary');
  readonly type = input<ButtonType>('button');

  readonly disabled = input(false);
  readonly loading = input(false);
  readonly fullWidth = input(true);

  readonly clicked = output<MouseEvent>();

  handleClick(event: MouseEvent): void {
    if (this.disabled() || this.loading()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.clicked.emit(event);
  }
}
