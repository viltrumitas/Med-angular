import { SubmissionFormValue } from '../form/submission-form.factory';
import { UpdateSubmissionDto } from '../dto/update-submission.dto';

export function toUpdateSubmissionDto(form: SubmissionFormValue): UpdateSubmissionDto {
  return {
    sceneManagnment: form.clinical.sceneManagnment,
    sss: form.clinical.sss,
    primaryTest: form.clinical.primaryTest,
    sample: form.clinical.sample,
    opqrst: form.clinical.opqrst,

    presumptiveDiagnosis: form.diagnostic.presumptiveDiagnosis,
    priority: form.diagnostic.priority,

    transferDecision: form.treatment.transferDecision,
    treatmentPlan: form.treatment.treatmentPlan,
    reportPatient: form.treatment.reportPatient,
  };
}
