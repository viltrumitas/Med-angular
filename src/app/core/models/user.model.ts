import { UserRole } from '../enum/user-role.enum';

export interface User {
  id: string;
  matricula: number;
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: string;
}
