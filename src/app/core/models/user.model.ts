import { UserRole } from './user-role.enum';

export interface User {
  id: string;
  matricula: number;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: string;
}
