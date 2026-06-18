import { Component } from '@angular/core';
import { MenuContainer } from '../../components/menu/menu-container/menu-container';
import { MenuItems } from '../../components/menu/menu-items/menu-items';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-topbar',
  imports: [MenuContainer, MenuItems, RouterLink],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar {}
