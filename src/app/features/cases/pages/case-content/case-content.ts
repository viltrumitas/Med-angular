import { AfterViewInit, Component, input } from '@angular/core';
import { CaseResponseDto } from '../../dto/case-response.dto';
import { createIcons, icons } from 'lucide';

@Component({
  selector: 'app-case-content',
  imports: [],
  templateUrl: './case-content.html',
  styleUrl: './case-content.scss',
})
export class CaseContent implements AfterViewInit {
  readonly case = input.required<CaseResponseDto>();

  ngAfterViewInit(): void {
    createIcons({ icons });
  }
}
