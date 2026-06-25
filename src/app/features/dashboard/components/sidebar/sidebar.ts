import { AfterViewInit, Component, signal } from '@angular/core';
import { createIcons, icons } from 'lucide';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements AfterViewInit {
  isOpen = signal(false);
  isCollapse = signal(false);
  activeItem = signal('Dashboard');
  menuItem = [
    { name: 'Dashboard', icon: 'layout-dashboard', route: '/dashboard' },
    { name: 'Home', icon: 'home' },
    { name: 'Crear', icon: 'clipboard-plus', route: '/dashboard/cases/crear-caso' },
    { name: 'Profile', icon: 'user' },
    { name: 'Settings', icon: 'settings' },
    { name: 'Logout', icon: 'log-out' },
  ];

  ngAfterViewInit() {
    this.initIcons();
  }

  initIcons() {
    setTimeout(() => {
      createIcons({ icons });
    });
  }

  toggleSidebar() {
    this.isOpen.update((v) => !v);
  }

  toggleCollapse() {
    this.isCollapse.update((v) => !v);
    this.initIcons();
  }

  setActive(name: string) {
    this.activeItem.set(name);
  }
}
