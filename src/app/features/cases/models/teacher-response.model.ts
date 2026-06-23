export type UserRole = 'TEACHER' | 'STUDENT' | 'ADMIN';

export interface TeacherModel {
  id: string;
  matricula: number;
  firstName: string;
  lastName: string;
  role: UserRole;
}
