import { Service, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreateReviewModel } from '../dto/create-review.dto';
import { ReviewResponseDto } from '../dto/review-response.dto';
import { Observable } from 'rxjs';
import { UpdateReview } from '../dto/update-review.dto';
import { SubmissionResponseDto } from '../dto/submission-response.dto';
import { ReviewSummaryResponseDto } from '../dto/review-summary-response.dto';

@Service()
export class ReviewApi {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient)

  create(
    submissionId: string,
    data: CreateReviewModel,
  ): Observable<ReviewResponseDto> {
    return this.http.post<ReviewResponseDto>(
      `${this.apiUrl}/reviews/submission/${submissionId}`,
      data,
    );
  }

  getReviewBySubmission(id: string): Observable<ReviewResponseDto> {
    return this.http.get<ReviewResponseDto>(`${this.apiUrl}/reviews/submission/${id}`)
  }

  getReviewById(id: string): Observable<ReviewResponseDto> {
    return this.http.get<ReviewResponseDto>(`${this.apiUrl}/reviews/${id}`)
  }

  updateReview(data: UpdateReview, id: string): Observable<ReviewResponseDto> {
    return this.http.patch<ReviewResponseDto>(`${this.apiUrl}/reviews/${id}`, data)
  }

  getReview(): Observable<ReviewSummaryResponseDto[]> {
    return this.http.get<ReviewSummaryResponseDto[]>(`${this.apiUrl}/reviews`)
  }

  getSubmissionById(id: string): Observable<SubmissionResponseDto> {
    return this.http.get<SubmissionResponseDto>(`${this.apiUrl}/submissions/${id}`)
  }

  getMyReviews() {
    return this.http.get<ReviewSummaryResponseDto[]>(`${this.apiUrl}/reviews/my`)
  }
}