import { SidebarItem } from './menu.types';

export const STUDENT_MENU: SidebarItem[] = [
  {
    name: 'Home',
    path: '/dashboard',
    icon: 'home',
  },
  {
    name: 'Actividades',
    path: '/dashboard/student/assigned',
    icon: 'folder',
  },
  {
    name: 'Pendientes',
    path: '/dashboard/student/submissions',
    icon: 'clipboard-clock',
  },
  // {
  //   name: 'cd',
  //   path: '/dashboard/student/submissions/create',
  // },
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
