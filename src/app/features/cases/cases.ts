import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cases',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './cases.html',
  styleUrl: './cases.scss',
})
export class Cases {}
