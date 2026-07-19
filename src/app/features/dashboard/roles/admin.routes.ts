import { Routes } from "@angular/router"; 

export const adminRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../../admin/pages/admin-dashboard/admin-dashboard').then(
        (c) => c.AdminDashboard,
      ),
  },

  {
    path: 'authorized-users',
    loadComponent: () => 
      import('../../admin/pages/authorized-users/authorized-users').then(
        (c) => c.AuthorizedUsers,
      ),
  },
];