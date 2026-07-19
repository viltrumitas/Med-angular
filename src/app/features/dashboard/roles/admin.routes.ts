import { Routes } from "@angular/router"; 

export const adminRoutes: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('../../admin/pages/authorized-users/authorized-users').then(
        (c) => c.AuthorizedUsers,
      ),
  },
];