import {
  afterRenderEffect,
  AfterViewInit,
  Component,
  computed,
  HostListener,
  inject,
  input,
  signal,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { createIcons, icons } from 'lucide';

import { AuthService } from '../../../../core/services/auth.service';
import { SidebarItem } from '../../model/menu.types';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements AfterViewInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  private readonly activeSubmenuName = signal<string | null>(null);

  readonly collapsed = signal(true);
  readonly mobileOpen = signal(false);

  readonly items = input.required<SidebarItem[]>();

  readonly navItem = computed(() =>
    this.items().filter((item) => (item.seciton ?? 'nav') === 'nav'),
  );

  readonly footerItem = computed(() => this.items().filter((item) => item.seciton === 'footer'));

  readonly roleLabel = computed(() => {
    const role = this.authService.role();

    switch (role) {
      case 'TEACHER':
        return 'Maestro';

      case 'STUDENT':
        return 'Alumno';

      default:
        return 'Usuario';
    }
  });

  readonly roleInitial = computed(() => {
    const role = this.authService.role();

    switch (role) {
      case 'TEACHER':
        return 'M';

      case 'STUDENT':
        return 'A';

      default:
        return 'U';
    }
  });

  constructor() {
    afterRenderEffect(() => {
      this.items();
      this.renderIcons();
    });
  }

  ngAfterViewInit(): void {
    this.renderIcons();
  }

  private renderIcons(): void {
    createIcons({ icons });
  }

  toggle(open: boolean): void {
    this.collapsed.set(!open);

    if (!open) {
      this.activeSubmenuName.set(null);
    }
  }

  toggleMobile(): void {
    this.mobileOpen.update((open) => !open);
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
    this.activeSubmenuName.set(null);
  }

  toggleSubmenu(item: SidebarItem): void {
    this.activeSubmenuName.update((current) =>
      current === item.name ? null : (item.name ?? null),
    );
  }

  isSubmenuOpen(item: SidebarItem): boolean {
    return this.activeSubmenuName() === item.name;
  }

  handleAction(action: string): void {
    switch (action) {
      case 'logout':
        this.logout();
        break;
    }
  }

  private logout(): void {
    this.closeMobile();

    this.authService.removeToken();

    void this.router.navigate(['/']);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMobile();
  }
}
