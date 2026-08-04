import { inject, Service } from "@angular/core"; 
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

import { CreateMedicalAreaDto } from "../dto/create-medical-area.dto";
import { UpdateMedicalAreaDto } from "../dto/update-medical-area.dto";
import { MedicalAreaResponseDto } from "../dto/medical-area-response.dto";
import { appConfig } from "../../../app.config";

@Service()
export class MedicalAreaApi {
  private readonly http = inject(HttpClient);
  private readonly api = `${environment.apiUrl}/medical-areas`;

  findALl(): Observable<MedicalAreaResponseDto[]> {
    return this.http.get<MedicalAreaResponseDto[]>(
      this.api,
    );
  }

  findOne(
    id: string,
  ): Observable<MedicalAreaResponseDto> {
    return this.http.get<MedicalAreaResponseDto>(
      `${this.api}/${id}`
    );
  }

  create(
    dto: CreateMedicalAreaDto,
  ): Observable<MedicalAreaResponseDto> {
    return this.http.post<MedicalAreaResponseDto>(
      this.api,
      dto,
    );
  }

  update(
    id: string,
    dto: UpdateMedicalAreaDto,
  ): Observable<MedicalAreaResponseDto> {
    return this.http.patch<MedicalAreaResponseDto>(
      `${this.api}/${id}`,
      dto,
    );
  }

  remove(
    id: string
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.api}/${id}`,
    );
  }
}