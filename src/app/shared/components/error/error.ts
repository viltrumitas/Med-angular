import { AfterViewInit, Component, inject } from '@angular/core';
import { ErrorService } from '../../../core/services/error.service';
import { createIcons, icons } from 'lucide';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.html',
  styleUrl: './error.scss',
})
export class Error implements AfterViewInit {
  readonly errorService = inject(ErrorService);

  ngAfterViewInit(): void {
    setTimeout(() => {
      createIcons({ icons });
    });
  }
}
