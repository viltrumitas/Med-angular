import { ReviewResponseDto } from "../dto/review-response.dto";
import { SubmissionResponseDto } from "../dto/submission-response.dto";
import { ReviewModel } from "../models/review.model";
import { SubmissionModel } from "../models/submission.model";

export class ReviewMapper {
  static toModel(dto: ReviewResponseDto): ReviewModel {
    return {
      id: dto.id,
      caseId: dto.caseId,
      teacher: dto.teacher,
      student: dto.student,

      sceneManagement: dto.sceneManagement,
      primaryAssessment: dto.primaryAssessment,
      patientPriority: dto.patientPriority,
      vitalSigns: dto.vitalSigns,
      focusedAssessment: dto.focusedAssessment,
      physicalExamination: dto.physicalExamination,
      sampler: dto.sampler,
      opqrst: dto.opqrst,
      otherInterventions: dto.otherInterventions,

      totalScore: dto.totalScore,
      feedback: dto.feedback,

      createdAt: dto.createdAt,
    };
  }

  static toSubmission(dto: SubmissionResponseDto): SubmissionModel {
    return {
      id: dto.id,
      reviewId: dto.reviewId,

      student: dto.student,
      assignment: dto.assignment,
      case: dto.case,

      sceneManagement: dto.sceneManagement,
      sss: dto.sss,
      primaryTest: dto.primaryTest,
      sample: dto.sample,
      opqrst: dto.opqrst,
      presumptiveDiagnosis: dto.presumptiveDiagnosis,
      priority: dto.priority,
      transferDecision: dto.transferDecision,
      treatmentPlan: dto.treatmentPlan,
      reportPatient: dto.reportPatient,

      status: dto.status,

      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
    };
  }
}

