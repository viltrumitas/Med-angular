import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AdminCard } from '../../components/admin-card/admin-card';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [AdminCard],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboard {
  private readonly router = inject(Router);

  goToAuthorizedUsers() {
    this.router.navigate(['/dashboard/admin/authorized-users']);
  }
}
