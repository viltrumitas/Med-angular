import { AfterViewInit, Component, input } from '@angular/core';
import { CaseResponseDto } from '../../dto/case-response.dto';
import { createIcons, icons } from 'lucide';
import { CaseContentMode } from '../../models/case.content.model';

@Component({
  selector: 'app-case-content',
  imports: [],
  templateUrl: './case-content.html',
  styleUrl: './case-content.scss',
})
export class CaseContent implements AfterViewInit {
  readonly case = input.required<CaseResponseDto>();
  readonly mode = input<CaseContentMode>('full');

  ngAfterViewInit(): void {
    createIcons({ icons });
  }
}
