import { Component, input } from '@angular/core';
import { SubmissionResponseDto } from '../../dto/submission-response.dto';

@Component({
  selector: 'app-submission-content',
  imports: [],
  templateUrl: './submission-content.html',
  styleUrl: './submission-content.scss',
})
export class SubmissionContent {
  readonly submission = input.required<SubmissionResponseDto>();
}
