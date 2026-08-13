import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { createIcons, icons } from 'lucide';

import { AdminApi } from '../../services/admin-api';
import { StatisticsResponseDto } from '../../dto/statistics-response.dto';
import { StatisticCard } from '../../components/statistic-card/statistic-card';
import { ErrorService } from '../../../../core/services/error.service';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [StatisticCard],
  templateUrl: './statistics.html',
  styleUrl: './statistics.scss',
})
export class Statistics implements OnInit {
  private readonly api = inject(AdminApi);
  private readonly destroyRef = inject(DestroyRef);
  private readonly errorService = inject(ErrorService);

  readonly statistics = signal<StatisticsResponseDto | null>(null);
  readonly loading = signal(true);

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.loading.set(true);
    this.errorService.clear();

    this.api
      .getStatistics()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (statistics) => {
          this.statistics.set(statistics);
          this.loading.set(false);

          this.renderIcons();
        },
        error: () => {
          this.loading.set(false);
          this.renderIcons();
        },
      });
  }

  retry(): void {
    this.loadStatistics();
  }

  private renderIcons(): void {
    setTimeout(() => {
      createIcons({ icons });
    });
  }
}
