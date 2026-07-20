import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthorizedUserSummaryDto } from '../dto/authorized-user-summary.dto';
import { AuthorizedUserResponseDto } from '../dto/authorized-user-response.dto';
import { CreateAuthorizedUserDto } from '../dto/create-authorized-user.dto';
import { UpdateAuthorizedUserDto } from '../dto/update-authorized-user.dto';

@Service()
export class AdminApi {
  private readonly http = inject(HttpClient);
  private readonly api = `${environment.apiUrl}/admin/authorized-users`;

  getAuthorizedUsers(): Observable<AuthorizedUserSummaryDto[]> {
    console.log('Llamando admin api');
    return this.http.get<AuthorizedUserSummaryDto[]>(this.api);
  }

  getAuthorizedUser(id: string): Observable<AuthorizedUserResponseDto> {
    return this.http.get<AuthorizedUserResponseDto>(`${this.api}/${id}`);
  }

  createAuthorizedUser(dto: CreateAuthorizedUserDto): Observable<AuthorizedUserResponseDto> {
    return this.http.post<AuthorizedUserResponseDto>(this.api, dto);
  }

  updateAuthorizedUser(
    id: string,
    dto: UpdateAuthorizedUserDto,
  ): Observable<AuthorizedUserResponseDto> {
    return this.http.patch<AuthorizedUserResponseDto>(`${this.api}/${id}`, dto);
  }

  deleteAuthorizedUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
