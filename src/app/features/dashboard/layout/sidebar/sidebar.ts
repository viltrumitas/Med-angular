import {
  AfterViewInit,
  Component,
  DestroyRef,
  effect,
  HostListener,
  inject,
  input,
  signal,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { createIcons, icons } from 'lucide';
import { SidebarItem } from '../../model/menu.types';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements AfterViewInit {
  private readonly aurhService = inject(AuthService);
  private readonly router = inject(Router);

  collapsed = signal(true);
  mobileOpen = signal(false);
  activeSubmenu = signal<SidebarItem | null>(null);
  items = input.required<SidebarItem[]>();

  private renderIcons() {
    createIcons({ icons });
  }

  constructor() {
    effect(() => {
      this.items();
      queueMicrotask(() => {
        this.renderIcons();
      });
    });
  }

  ngAfterViewInit() {
    this.renderIcons();
  }

  toggle(open: boolean) {
    this.collapsed.set(!open);
    if (!open) this.activeSubmenu.set(null);
  }

  toggleMobile() {
    this.mobileOpen.update((e) => !e);
  }

  closeMobile() {
    this.mobileOpen.set(false);
  }

  toggleSubmenu(item: SidebarItem) {
    const current = this.activeSubmenu();
    this.activeSubmenu.set(current === item ? null : item);
  }

  isSubmenuOpen(item: SidebarItem): boolean {
    return this.activeSubmenu() === item;
  }

  handleAction(action: string): void {
    if (action === 'logout') {
      this.aurhService.removeToken();
      this.router.navigate(['/auth']);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.mobileOpen.set(false);
  }
}
