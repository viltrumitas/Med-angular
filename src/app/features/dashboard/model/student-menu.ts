import { SidebarItem } from './menu.types';

export const STUDENT_MENU: SidebarItem[] = [
  {
    name: 'Home',
    path: '/dashboard/student/classrooms',
    icon: 'home',
  },
  {
    name: 'Mis actividades',
    path: '/dashboard/student/activities',
    icon: 'clipboard-list',
  },
  {
    name: 'Mis revisiones',
    path: '/dashboard/student/reviews',
    icon: 'file-check'
  },
  {
    name: 'Cerrar Sesion',
    action: 'logout',
    icon: 'log-out',
    seciton: 'footer',
  },
];
