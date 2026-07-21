import { Routes } from "@angular/router";

export const adminRoutes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('../../admin/pages/admin-dashboard/admin-dashboard')
        .then(c => c.AdminDashboard),
  },


  {
    path: 'authorized-users',
    loadComponent: () =>
      import('../../admin/pages/authorized-users/authorized-users')
        .then(c => c.AuthorizedUsers),
  },


  {
    path: 'authorized-users/new',
    loadComponent: () =>
      import('../../admin/pages/create-authorized-user/create-authorized-user')
        .then(c => c.CreateAuthorizedUser),
  },


  {
    path: 'authorized-users/:id/edit',
    loadComponent: () =>
      import('../../admin/pages/edit-authorized-user/edit-authorized-user')
        .then(c => c.EditAuthorizedUser),
  },

  {
    path: 'statistics',
    loadComponent: () =>
      import('../../admin/pages/statistics/statistics')
        .then(c => c.Statistics),
  },

];