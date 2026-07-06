import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

function scoreControl() {
  return new FormControl<number>(0, {
    nonNullable: true,
    validators: [
      Validators.min(0),
      Validators.max(3),
    ],
  });
}

export function createReviewForm() {
  return new FormGroup({

    sceneManagement: new FormGroup({

      sceneManagement: scoreControl(),

      situationManagement: scoreControl(),

      safetyManagement: scoreControl(),

      resourceRequest: scoreControl(),

      overallImpression: scoreControl(),

    }),

    primaryAssessment: new FormGroup({

      hemorrhageIdentification: scoreControl(),

      hemorrhageControl: scoreControl(),

      airwayAssessment: scoreControl(),

      airwayManagement: scoreControl(),

      ventilationAssessment: scoreControl(),

      lungAuscultation: scoreControl(),

      oxygenTherapy: scoreControl(),

      pulseAssessment: scoreControl(),

      capillaryRefill: scoreControl(),

      skinAssessment: scoreControl(),

      pirrl: scoreControl(),

      glasgow: scoreControl(),

      exposure: scoreControl(),

      temperatureManagement: scoreControl(),

    }),

    patientPriority: new FormGroup({

      patientPriority: scoreControl(),

      transferPatientDecision: scoreControl(),

    }),

    vitalSigns: new FormGroup({

      fc: scoreControl(),

      fr: scoreControl(),

      ta: scoreControl(),

      temperature: scoreControl(),

      glucose: scoreControl(),

      spo2: scoreControl(),

    }),

    focusedAssessment: new FormGroup({

      inspection: scoreControl(),

      palpation: scoreControl(),

      auscultation: scoreControl(),

      percussion: scoreControl(),

    }),

    physicalExamination: new FormGroup({

      head: scoreControl(),

      neck: scoreControl(),

      thorax: scoreControl(),

      abdomen: scoreControl(),

      pelvis: scoreControl(),

      spine: scoreControl(),

      lowerExtremities: scoreControl(),

      upperExtremities: scoreControl(),

    }),

    sampler: new FormGroup({

      signs: scoreControl(),

      symptoms: scoreControl(),

      allergies: scoreControl(),

      medications: scoreControl(),

      conditions: scoreControl(),

      riskFactors: scoreControl(),

      livings: scoreControl(),

      previousEvents: scoreControl(),

    }),

    opqrst: new FormGroup({

      onset: scoreControl(),

      provocation: scoreControl(),

      quality: scoreControl(),

      region: scoreControl(),

      severity: scoreControl(),

      time: scoreControl(),

    }),

    otherInterventions: new FormGroup({

      vascularAccess: scoreControl(),

      temperatureControl: scoreControl(),

      drugAdministration: scoreControl(),

      patientPositioning: scoreControl(),

      packaging: scoreControl(),

      crumRegulation: scoreControl(),

      uniform: scoreControl(),

      workTeam: scoreControl(),

      interventionsPerformed: scoreControl(),

      teamWork: scoreControl(),

      correctDiagnosis: scoreControl(),

    }),

    feedback: new FormControl('', {
      nonNullable: true,
    }),

  });
}

export type ReviewForm = ReturnType<typeof createReviewForm>;
export type ReviewFormValue = ReturnType<ReviewForm['getRawValue']>;

export type SceneManagementForm =
  ReviewForm['controls']['sceneManagement'];

export type PrimaryAssessmentForm =
  ReviewForm['controls']['primaryAssessment'];

export type PatientPriorityForm =
  ReviewForm['controls']['patientPriority'];

export type VitalSignsForm =
  ReviewForm['controls']['vitalSigns'];

export type FocusedAssessmentForm =
  ReviewForm['controls']['focusedAssessment'];

export type PhysicalExaminationForm =
  ReviewForm['controls']['physicalExamination'];

export type SamplerForm =
  ReviewForm['controls']['sampler'];

export type OpqrstForm =
  ReviewForm['controls']['opqrst'];

export type OtherInterventionsForm =
  ReviewForm['controls']['otherInterventions'];