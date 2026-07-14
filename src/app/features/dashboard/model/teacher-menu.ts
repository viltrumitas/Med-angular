import { SidebarItem } from './menu.types';

export const TEACHER_MENU: SidebarItem[] = [
  {
    name: 'Home',
    path: '/dashboard/teacher/classrooms',
    icon: 'home',
  },
  {
    name: 'Casos',
    path: '/dashboard/teacher/cases',
    icon: 'folder',
  },
  {
    name: 'Todos mis pendientes',
    path: '/dashboard/teacher/reviews',
    icon: 'clipboard-clock',
  },
  {
    name: 'Mis revisiones',
    path: '/dashboard/teacher/reviews/my-reviews',
    icon: 'list-checks',
  },
  {
    name: 'Cerrar Sesion',
    action: 'logout',
    icon: 'log-out',
    seciton: 'footer',
  },
];
