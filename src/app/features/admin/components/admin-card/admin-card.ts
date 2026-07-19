import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-card.html',
  styleUrl: './admin-card.scss',
})
export class AdminCard {
  readonly title = input.required<string>();

  readonly description = input.required<string>();

  readonly route = input.required<string>();

  readonly icon = input<string>('dashboard');

  readonly disabled = input(false);
}
