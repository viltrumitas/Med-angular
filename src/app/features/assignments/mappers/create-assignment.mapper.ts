import { AssignmentFormValue } from '../forms/create-assignment-form'; 
import { CreateAssignment } from '../models/create-assignment.model';

export function mapCreateAssignment(
  form: AssignmentFormValue,
): CreateAssignment {
  return {
    title: form.title?.trim(),

    description: form.description?.trim() || '',

    isPublished: Boolean(form.isPublished),
  };
}