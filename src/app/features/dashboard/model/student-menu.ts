import { SidebarItem } from './menu.types';

export const STUDENT_MENU: SidebarItem[] = [
  {
    name: 'Home',
    path: '/dashboard/student/classrooms',
    icon: 'home',
  },
  {
    name: 'Mis actividades pendientes',
    path: '/dashboard/student/classrooms/',
    icon: 'clipboard-clock',
  },
  {
    name: 'Mis revisiones',
    path: '/dashboard/student/classrooms/'
  },
  {
    name: 'Cerrar Sesion',
    action: 'logout',
    icon: 'log-out',
    seciton: 'footer',
  },
];
