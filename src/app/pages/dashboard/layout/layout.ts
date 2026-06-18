import { Component } from '@angular/core';
import { Sidebar } from '../../../shared/layouts/sidebar/sidebar';
import { Topbar } from '../../../shared/layouts/topbar/topbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [Sidebar, Topbar, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
