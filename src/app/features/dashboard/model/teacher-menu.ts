import { SidebarItem } from './menu.types';

export const TEACHER_MENU: SidebarItem[] = [
  {
    name: 'Home',
    path: '/dashboard',
    icon: 'home',
  },
  {
    name: 'Casos',
    path: '/dashboard/teacher/cases',
    icon: 'folder',
    children: [
      { name: 'Crear Caso', path: '/dashboard/teacher/cases/crear-caso' },
      { name: 'Mis Casos', path: '/dashboard/teacher/cases' },
    ],
  },
  {
    name: 'Actividades',
    path: '/dashboard/teacher',
    icon: 'clipboard-plus',
    children: [
      { name: 'Nueva Actividad', path: '' },
      { name: 'Mis Actividades', path: '' },
    ],
  },
  {
    name: 'Evaluacion',
    path: '/dashboard/teacher',
    icon: 'list-check',
    children: [
      { name: 'Mis evaluaciones', path: '' },
      { name: 'Pendientes', path: '' },
    ],
  },
  {
    separator: true,
  },
  {
    name: 'User',
    path: '/dashboard',
    icon: 'user',
  },
  {
    name: 'Settings',
    path: '/dashboard',
    icon: 'settings',
  },
  {
    name: 'Cerrar Sesion',
    path: '/dashboard',
    icon: 'log-out',
  },
];
