import { SidebarItem } from './menu.types';

export const STUDENT_MENU: SidebarItem[] = [
  {
    name: 'Home',
    path: '/dashboard',
    icon: 'home',
  },
  {
    name: 'Actividades',
    path: '/dashboard/student',
    icon: 'folder',
    children: [
      {
        name: 'Pendientes',
        path: '',
      },
      {
        name: 'Mis actividades',
        path: '/dashboard/student/assigned',
      },
    ],
  },
  {
    separator: true,
  },
  {
    name: 'Usuario',
    path: '/dashboard',
    icon: 'user',
  },
  {
    name: 'Cerrar Sesion',
    action: 'logout',
    icon: 'log-out',
  },
];
