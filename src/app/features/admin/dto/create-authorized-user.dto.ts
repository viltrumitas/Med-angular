import { UserRole } from "../../../core/enum/user-role.enum";

export interface CreateAuthorizedUserDto {
  matricula: number;
  firstName: string;
  lastName: string;
  role: UserRole;
}