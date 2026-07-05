import { SubmissionFormValue } from '../form/submission-form.factory';

type FlattendFormFields = SubmissionFormValue['clinical'] &
  SubmissionFormValue['diagnostic'] &
  SubmissionFormValue['treatment'];

export type UpdateSubmissionDto = Partial<FlattendFormFields>;
