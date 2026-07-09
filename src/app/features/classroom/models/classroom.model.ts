export interface ClassroomModel {
  id: string;
  name: string;
  description: string | null;
  code: string;
  isActive: boolean;

  studentsCount: number;
  assignmentsCount: number;

  createdAt: string;
  updatedAt: string;
}
