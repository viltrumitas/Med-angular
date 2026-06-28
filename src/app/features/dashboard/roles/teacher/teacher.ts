import { Component } from '@angular/core';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-teacher',
  imports: [RouterOutlet],
  templateUrl: './teacher.html',
  styleUrl: './teacher.scss',
})
export class Teacher {}
