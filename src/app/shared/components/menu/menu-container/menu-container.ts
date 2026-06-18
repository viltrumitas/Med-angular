import { Component, signal } from '@angular/core';
@Component({
  selector: 'app-menu-container',
  imports: [],
  templateUrl: './menu-container.html',
  styleUrl: './menu-container.scss',
})
export class MenuContainer {
  isExpanded = signal(false);

  toggleMenu() {
    this.isExpanded.update((v) => !v);
  }
}
