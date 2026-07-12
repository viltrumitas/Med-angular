import { SubmissionFormValue } from '../form/submission-form.factory';

export type FlattendFormFields = SubmissionFormValue['clinical'] &
  SubmissionFormValue['diagnostic'] &
  SubmissionFormValue['treatment'];
