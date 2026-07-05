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
      {
        name: 'Crear Caso',
        path: '/dashboard/teacher/cases/crear-caso',
      },
      {
        name: 'Mis Casos',
        path: '/dashboard/teacher/cases',
      },
    ],
  },
  {
    name: 'Classroom',
    path: '/dashboard/teacher/classroom',
    icon: 'shapes',
  },
  {
    name: 'Actividades',
    path: '/dashboard/teacher/assignments',
    icon: 'clipboard-plus',
    children: [
      {
        name: 'Nueva Actividad',
        path: '/dashboard/teacher/assignments/crear-assignment',
      },
      {
        name: 'Mis Actividades',
        path: '/dashboard/teacher/assignments',
      },
    ],
  },
  {
    name: 'Evaluacion',
    path: '/dashboard/teacher',
    icon: 'list-check',
    children: [
      { name: 'Mis evaluaciones', path: '/dashboard/teacher/reviews/crear-review' },
      { name: 'Pendientes', path: '/dashboard/teacher/reviews' },
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
    action: 'logout',
    icon: 'log-out',
  },
];
