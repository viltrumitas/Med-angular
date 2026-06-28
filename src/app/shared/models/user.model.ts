import { UserRole } from '../../core/models/user-role.enum';

export interface UserModel {
  id: string;
  matricula: number;
  firstName: string;
  lastName: string;
  role: UserRole;
}
