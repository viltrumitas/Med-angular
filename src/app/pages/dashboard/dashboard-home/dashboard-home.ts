import { Component } from '@angular/core';
import { ActivityTable } from '../../../shared/layouts/activity-table/activity-table';
import { StatsCards } from '../../../shared/layouts/stats-cards/stats-cards';
import { RightPanel } from '../../../shared/layouts/right-panel/right-panel';

@Component({
  selector: 'app-dashboard-home',
  imports: [ActivityTable, StatsCards, RightPanel],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.scss',
})
export class DashboardHome {}
