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
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly activeSubmenuName = signal<string | null>(null);

  collapsed = signal(true);
  mobileOpen = signal(false);
  items = input.required<SidebarItem[]>();

  readonly navItem = computed(() =>
    this.items().filter((item) => (item.seciton ?? 'nav') === 'nav'),
  );
  readonly footerItem = computed(() => this.items().filter((item) => item.seciton === 'footer'));

  constructor() {
    afterRenderEffect(() => {
      this.items();
      this.renderIcons();
    });
  }

  ngAfterViewInit() {
    this.renderIcons();
  }

  private renderIcons() {
    createIcons({ icons });
  }

  toggle(open: boolean) {
    this.collapsed.set(!open);
    if (!open) this.activeSubmenuName.set(null);
  }

  toggleMobile() {
    this.mobileOpen.update((open) => !open);
  }

  closeMobile() {
    this.mobileOpen.set(false);
  }

  toggleSubmenu(item: SidebarItem) {
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
        this.authService.removeToken();
        this.router.navigate(['/']);
        break;
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.mobileOpen.set(false);
  }
}
