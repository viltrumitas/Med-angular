import { SidebarItem } from './menu.types';

export const STUDENT_MENU: SidebarItem[] = [
  {
    name: 'Home',
    path: '/dashboard/student/classrooms',
    icon: 'home',
  },
  // {
  //   name: 'Aun no se que va',
  //   path: '/dashboard/student',
  //   icon: 'folder',
  // },

  {
    name: 'Cerrar Sesion',
    action: 'logout',
    icon: 'log-out',
    seciton: 'footer',
  },
];
