import { SidebarItem } from './menu.types';

export const ADMIN_MENU: SidebarItem[] = [
  {
    name: 'Home',
    path: '/dashboard/admin',
    icon: 'home',
  },

  {
    name: 'Usuarios autorizados',
    path: '/dashboard/admin/authorized-users',
    icon: 'users-round',
  },

  {
    name: 'Cerrar Sesion',
    action: 'logout',
    icon: 'log-out',
    seciton: 'footer',
  },
];
