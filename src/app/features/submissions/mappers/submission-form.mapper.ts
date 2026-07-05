import { SubmissionResponseDto } from '../dto/submission-response.dto';
import { SubmissionFormValue } from '../form/submission-form.factory';

export function mapSubmissionFormValue(submission: SubmissionResponseDto): SubmissionFormValue {
  return {
    clinical: {
      sceneManagnment: submission.sceneManagment ?? '',
      sss: submission.sss ?? '',
      primaryTest: submission.primaryTest ?? '',
      sample: submission.sample ?? '',
      opqrst: submission.opqrst ?? '',
    },

    diagnostic: {
      presumptiveDiagnosis: submission.presumptiveDiagnosis ?? '',
      priority: submission.priority ?? null,
    },

    treatment: {
      transferDecision: submission.transferDecision ?? false,
      treatmentPlan: submission.treatmentPlan ?? '',
      reportPatient: submission.reportPatient ?? '',
    },
  };
}
