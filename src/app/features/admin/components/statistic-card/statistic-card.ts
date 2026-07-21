import { Component, input } from '@angular/core';

@Component({
  selector: 'app-statistic-card',
  standalone: true,
  imports: [],
  templateUrl: './statistic-card.html',
  styleUrl: './statistic-card.scss',
})
export class StatisticCard {
  readonly title = input.required<string>();
  readonly value = input.required<number>();
  readonly icon = input.required<string>();
}
