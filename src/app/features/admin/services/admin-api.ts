import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthorizedUserSummaryDto } from '../dto/authorized-user-summary.dto';
import { AuthorizedUserResponseDto } from '../dto/authorized-user-response.dto';
import { CreateAuthorizedUserDto } from '../dto/create-authorized-user.dto';
import { UpdateAuthorizedUserDto } from '../dto/update-authorized-user.dto';
import { StatisticsResponseDto } from '../dto/statistics-response.dto';
import { ImportAuthorizedUsersResponseDto } from '../dto/import-authorized-users-response-.dto';

@Service()
export class AdminApi {
  private readonly http = inject(HttpClient);
  private readonly api = `${environment.apiUrl}/admin`;

  getAuthorizedUsers(): Observable<AuthorizedUserSummaryDto[]> {
    return this.http.get<AuthorizedUserSummaryDto[]>(`${this.api}/authorized-users`);
  }

  getAuthorizedUser(id: string): Observable<AuthorizedUserResponseDto> {
    return this.http.get<AuthorizedUserResponseDto>(`${this.api}/authorized-users/${id}`);
  }

  createAuthorizedUser(dto: CreateAuthorizedUserDto): Observable<AuthorizedUserResponseDto> {
    return this.http.post<AuthorizedUserResponseDto>(`${this.api}/authorized-users`, dto);
  }

  updateAuthorizedUser(
    id: string,
    dto: UpdateAuthorizedUserDto,
  ): Observable<AuthorizedUserResponseDto> {
    return this.http.patch<AuthorizedUserResponseDto>(`${this.api}/authorized-users/${id}`, dto);
  }

  deleteAuthorizedUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/authorized-users/${id}`);
  }

  getStatistics(): Observable<StatisticsResponseDto> {
    return this.http.get<StatisticsResponseDto>(`${this.api}/statistics`);
  }

  importAuthorizedUsers(
    file: File,
  ): Observable<ImportAuthorizedUsersResponseDto> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<ImportAuthorizedUsersResponseDto>(
      `${this.api}/authorized-users/import`,
      formData,
    )
  }
}
