import { SubmissionFormValue } from '../form/submission-form.factory';
import { UpdateSubmisson } from '../models/update-submission.model';

export function SubmissionMapper(form: SubmissionFormValue): UpdateSubmisson {
  return {
    scenaryManagnment: form.clinical.scenaryManagnment,
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
