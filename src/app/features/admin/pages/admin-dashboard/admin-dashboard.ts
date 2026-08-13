import { Component, inject, OnInit, signal } from '@angular/core';
import { AdminApi } from '../../services/admin-api';
import { StatisticsResponseDto } from '../../dto/statistics-response.dto';
import { AdminCard } from '../../components/admin-card/admin-card';
import { StatisticCard } from '../../components/statistic-card/statistic-card';
import { createIcons, icons } from 'lucide';
import { finalize, pipe } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [AdminCard, StatisticCard],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboard implements OnInit {
  private readonly api = inject(AdminApi);

  readonly loading = signal(true);
  readonly summary = signal<StatisticsResponseDto | null>(null);

  ngOnInit() {
    this.api
      .getStatistics()
      .pipe(
        finalize(() => {
          this.loading.set(false);
          this.renderIcons();
        }),
      )
      .subscribe({
        next: (stats) => {
          this.summary.set(stats);
          this.renderIcons();
        },
        error: () => {
          this.renderIcons();
        },
      });
  }

  private renderIcons() {
    setTimeout(() => {
      createIcons({ icons });
    });
  }
}
