import { UserRole } from './user-role';

export interface User {
  id: string;
  matricula: number;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: string;
}
