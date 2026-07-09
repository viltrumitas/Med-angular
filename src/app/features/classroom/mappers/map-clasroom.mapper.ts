import { ClassroomFormValue } from '../forms/classroom.form';
import { CreateClassroomDto } from '../dto/create-classroom.dto';

export function mapCreateClassroom(form: ClassroomFormValue): CreateClassroomDto {
  return {
    name: form.name.trim(),
    description: form.description.trim() || undefined,
  };
}
