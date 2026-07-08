import { SidebarItem } from './menu.types';

export const STUDENT_MENU: SidebarItem[] = [
  {
    name: 'Home',
    path: '/dashboard/student/home',
    icon: 'home',
  },
  {
    name: 'Aun no se que va',
    path: '/dashboard',
    icon: 'folder',
  },

  {
    name: 'Cerrar Sesion',
    action: 'logout',
    icon: 'log-out',
    seciton: 'footer',
  },
];
