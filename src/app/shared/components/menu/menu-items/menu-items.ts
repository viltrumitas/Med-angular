import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-items',
  imports: [],
  templateUrl: './menu-items.html',
  styleUrl: './menu-items.scss',
})
export class MenuItems {
  @Input() index = 0;
  @Input() expanded = false;
}
