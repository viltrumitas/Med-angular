import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Error } from './shared/components/error/error';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Error],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Med-angular');
}
