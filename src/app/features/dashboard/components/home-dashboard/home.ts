import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { ActivityTable } from '../activity-table/activity-table';

@Component({
  selector: 'app-home',
  imports: [Sidebar, ActivityTable],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
