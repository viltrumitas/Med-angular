import { Component, computed, inject } from '@angular/core';
import { Sidebar } from './layout/sidebar/sidebar';
import { AuthService } from '../../core/services/auth.service';
import { TEACHER_MENU } from './model/teacher-menu';
import { STUDENT_MENU } from './model/student-menu';
import { SidebarItem } from './model/menu.types';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [Sidebar, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly authService = inject(AuthService);

  menu = computed<SidebarItem[]>(() => {
    switch (this.authService.role()) {
      case 'TEACHER':
        return TEACHER_MENU;

      case 'STUDENT':
        return STUDENT_MENU;

      default:
        return [];
    }
  });
}
