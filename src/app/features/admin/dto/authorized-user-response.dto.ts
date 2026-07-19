import { UserRole } from "../../../core/enum/user-role.enum";

export interface AuthorizedUserResponseDto {
  id: string;
  matricula: number;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}