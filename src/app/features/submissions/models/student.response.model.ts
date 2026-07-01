import { UserRole } from '../../../core/enum/user-role.enum';

export interface StudentResponseDto {
  id: string;
  matricual: number;
  firstName: string;
  lastName: string;
  role: UserRole;
}
