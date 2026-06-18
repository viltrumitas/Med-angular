import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero } from '../../shared/layouts/hero/hero';
import { MenuContainer } from '../../shared/components/menu/menu-container/menu-container';
import { MenuItems } from '../../shared/components/menu/menu-items/menu-items';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, Hero, MenuContainer, MenuItems],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
