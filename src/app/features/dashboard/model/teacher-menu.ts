import { SidebarItem } from './menu.types';

export const TEACHER_MENU: SidebarItem[] = [
  {
    name: 'Home',
    path: '/dashboard/teacher/classroom',
    icon: 'home',
  },
  {
    name: 'Casos',
    path: '/dashboard/teacher/cases',
    icon: 'folder',
  },

  {
    name: 'Cerrar Sesion',
    action: 'logout',
    icon: 'log-out',
    seciton: 'footer',
  },
];
