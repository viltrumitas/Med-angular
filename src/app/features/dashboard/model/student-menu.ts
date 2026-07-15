import { SidebarItem } from './menu.types';

export const STUDENT_MENU: SidebarItem[] = [
  {
    name: 'Home',
    path: '/dashboard/student/classrooms',
    icon: 'home',
  },
  {
    name: 'Mis actividades pe',
    icon: 'clipboard-clock',
  },
  {
    name: 'Hola',
    icon: 'list-checks'
  },
  {
    name: 'Cerrar Sesion',
    action: 'logout',
    icon: 'log-out',
    seciton: 'footer',
  },
];
