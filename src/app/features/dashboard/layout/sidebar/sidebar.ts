import {
  afterRenderEffect,
  Component,
  computed,
  ElementRef,
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
export class Sidebar {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

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
      /*
       * Registramos las señales que pueden crear nuevos elementos <i>.
       */
      this.items();
      this.mobileOpen();
      this.activeSubmenuName();

      this.renderPendingIcons();
    });
  }

  private renderPendingIcons(): void {
    const host = this.elementRef.nativeElement;

    /*
     * Buscamos exclusivamente etiquetas <i> pendientes.
     * Los SVG que Lucide ya generó no entran aquí.
     */
    const pendingIcons = host.querySelectorAll<HTMLElement>('i[data-lucide]');

    if (pendingIcons.length === 0) {
      return;
    }

    /*
     * Cambiamos temporalmente el atributo para que createIcons()
     * no encuentre ni vuelva a procesar SVG anteriores.
     */
    pendingIcons.forEach((icon) => {
      const iconName = icon.getAttribute('data-lucide');

      if (!iconName) {
        return;
      }

      icon.setAttribute('data-sidebar-lucide', iconName);
      icon.removeAttribute('data-lucide');
    });

    createIcons({
      icons,
      root: host,
      nameAttr: 'data-sidebar-lucide',
    });

    /*
     * Lucide copia el atributo temporal al SVG generado.
     * Lo quitamos para que quede marcado como procesado.
     */
    host.querySelectorAll<SVGElement>('svg[data-sidebar-lucide]').forEach((icon) => {
      icon.removeAttribute('data-sidebar-lucide');
    });

    /*
     * Protección adicional: dentro del wrapper de logout
     * nunca permitimos más de un SVG.
     */
    host.querySelectorAll<HTMLElement>('.item__icon-wrapper').forEach((wrapper) => {
      const renderedIcons = wrapper.querySelectorAll(':scope > svg');

      renderedIcons.forEach((icon, index) => {
        if (index > 0) {
          icon.remove();
        }
      });
    });
  }

  toggle(open: boolean): void {
    const supportsDesktopHover = window.matchMedia('(hover: hover) and (min-width: 769px)').matches;

    if (!supportsDesktopHover) {
      return;
    }

    this.collapsed.set(!open);

    if (!open) {
      this.activeSubmenuName.set(null);
    }
  }

  toggleMobile(): void {
    this.mobileOpen.update((open) => !open);

    if (!this.mobileOpen()) {
      this.activeSubmenuName.set(null);
    }
  }

  closeMobile(): void {
    if (!this.mobileOpen()) {
      return;
    }

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
