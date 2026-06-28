import { AfterViewInit, Component, effect, inject, input, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { createIcons, icons } from 'lucide';
import { SidebarItem } from '../../model/menu.types';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements AfterViewInit {
  collapsed = signal(true);
  items = input.required<SidebarItem[]>();
  activeSubmenu = signal<SidebarItem | null>(null);
  submenuPosition = signal<{ x: number; y: number } | null>(null);
  private renderIcons() {
    createIcons({ icons });
  }

  ngAfterViewInit() {
    this.renderIcons();
  }

  constructor() {
    effect(() => {
      this.items();
      queueMicrotask(() => this.renderIcons());
    });
  }

  toggle(open: boolean) {
    this.collapsed.set(!open);
  }

  openSubmenu(event: MouseEvent, item: SidebarItem) {
    event.preventDefault();
    event.stopPropagation();

    const element = event.currentTarget as HTMLElement;
    const rect = element.getBoundingClientRect();

    this.activeSubmenu.set(item);
    this.submenuPosition.set({
      x: rect.right + 12,
      y: rect.top,
    });
  }

  closeSubmenu() {
    this.activeSubmenu.set(null);
  }
}
