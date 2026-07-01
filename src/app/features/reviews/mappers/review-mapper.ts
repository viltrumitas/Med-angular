import { ReviewFormValue } from '../forms/review.form';
import { CreateReviewModel } from '../dto/create-review.dto';

export function mapCreateReview(
  form: ReviewFormValue,
): CreateReviewModel {

  return {

    sceneManagement: {
      ...form.sceneManagement,
    },

    primaryAssessment: {
      ...form.primaryAssessment,
    },

    patientPriority: {
      ...form.patientPriority,
    },

    vitalSigns: {
      ...form.vitalSigns,
    },

    focusedAssessment: {
      ...form.focusedAssessment,
    },

    physicalExamination: {
      ...form.physicalExamination,
    },

    sampler: {
      ...form.sampler,
    },

    opqrst: {
      ...form.opqrst,
    },

    otherInterventions: {
      ...form.otherInterventions,
    },

    feedback: form.feedback ?? '',

  };

}