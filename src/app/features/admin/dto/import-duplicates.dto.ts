import { ImportDuplicateUserDto } from "./import-duplicate-user.dto";

export interface ImportDuplicatesDto {
  count: number;
  users: ImportDuplicateUserDto[];
}