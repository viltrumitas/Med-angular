import { Component, input } from '@angular/core';
import { CaseResponseDto } from '../../dto/case-response.dto';

@Component({
  selector: 'app-case-content',
  imports: [],
  templateUrl: './case-content.html',
  styleUrl: './case-content.scss',
})
export class CaseContent {
  readonly case = input.required<CaseResponseDto>();
}
