import { UserRole } from '../../core/enum/user-role.enum';

export interface UserModel {
  id: string;
  matricula: number;
  firstName: string;
  lastName: string;
  role: UserRole;
}
