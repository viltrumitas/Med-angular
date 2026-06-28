import { UserRole } from '../../../core/models/user-role.enum';

export interface TeacherModel {
  id: string;
  matricula: number;
  firstName: string;
  lastName: string;
  role: UserRole;
}
