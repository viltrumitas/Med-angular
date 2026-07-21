import { Component, OnInit, inject, signal } from '@angular/core';
import { AdminApi } from '../../services/admin-api';
import { StatisticsResponseDto } from '../../dto/statistics-response.dto';
import { StatisticCard } from '../../components/statistic-card/statistic-card';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [StatisticCard],
  templateUrl: './statistics.html',
  styleUrl: './statistics.scss',
})
export class Statistics implements OnInit {
  private readonly api = inject(AdminApi);

  readonly statistics = signal<StatisticsResponseDto | null>(null);

  readonly loading = signal(true);

  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics() {
    this.loading.set(true);

    this.api.getStatistics().subscribe({
      next: (statistics) => {
        this.statistics.set(statistics);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(
          `No se pudieron cargar las estadisticas.`,
        );

        this.loading.set(false);
      },
    });
  }
}
