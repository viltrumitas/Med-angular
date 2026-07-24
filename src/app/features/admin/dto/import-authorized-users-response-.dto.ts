import { ImportDuplicatesDto } from "./import-duplicates.dto";

export interface ImportAuthorizedUserErrorDto {
  row: number;
  message: string;
}

export interface ImportAuthorizedUsersResponseDto {
  success: boolean;
  imported: number;
  totalRows: number;
  duplicates: ImportDuplicatesDto;
  errors: ImportAuthorizedUserErrorDto[];
}