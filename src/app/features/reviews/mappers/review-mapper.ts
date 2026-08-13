import { ReviewFormValue } from '../forms/review.form';
import { CreateReviewModel } from '../dto/create-review.dto';

const score = (value: number | null): number => value ?? 0;

export function mapCreateReview(
  form: ReviewFormValue,
): CreateReviewModel {
  return {
    sceneManagement: {
      sceneManagement: score(form.sceneManagement.sceneManagement),
      situationManagement: score(form.sceneManagement.situationManagement),
      safetyManagement: score(form.sceneManagement.safetyManagement),
      resourceRequest: score(form.sceneManagement.resourceRequest),
      overallImpression: score(form.sceneManagement.overallImpression),
    },

    primaryAssessment: {
      hemorrhageIdentification: score(form.primaryAssessment.hemorrhageIdentification),
      hemorrhageControl: score(form.primaryAssessment.hemorrhageControl),
      airwayAssessment: score(form.primaryAssessment.airwayAssessment),
      airwayManagement: score(form.primaryAssessment.airwayManagement),
      ventilationAssessment: score(form.primaryAssessment.ventilationAssessment),
      lungAuscultation: score(form.primaryAssessment.lungAuscultation),
      oxygenTherapy: score(form.primaryAssessment.oxygenTherapy),
      pulseAssessment: score(form.primaryAssessment.pulseAssessment),
      capillaryRefill: score(form.primaryAssessment.capillaryRefill),
      skinAssessment: score(form.primaryAssessment.skinAssessment),
      pirrl: score(form.primaryAssessment.pirrl),
      glasgow: score(form.primaryAssessment.glasgow),
      exposure: score(form.primaryAssessment.exposure),
      temperatureManagement: score(form.primaryAssessment.temperatureManagement),
    },

    patientPriority: {
      patientPriority: score(form.patientPriority.patientPriority),
      transferPatientDecision: score(form.patientPriority.transferPatientDecision),
    },

    vitalSigns: {
      fc: score(form.vitalSigns.fc),
      fr: score(form.vitalSigns.fr),
      ta: score(form.vitalSigns.ta),
      temperature: score(form.vitalSigns.temperature),
      glucose: score(form.vitalSigns.glucose),
      spo2: score(form.vitalSigns.spo2),
    },

    focusedAssessment: {
      inspection: score(form.focusedAssessment.inspection),
      palpation: score(form.focusedAssessment.palpation),
      auscultation: score(form.focusedAssessment.auscultation),
      percussion: score(form.focusedAssessment.percussion),
    },

    physicalExamination: {
      head: score(form.physicalExamination.head),
      neck: score(form.physicalExamination.neck),
      thorax: score(form.physicalExamination.thorax),
      abdomen: score(form.physicalExamination.abdomen),
      pelvis: score(form.physicalExamination.pelvis),
      spine: score(form.physicalExamination.spine),
      lowerExtremities: score(form.physicalExamination.lowerExtremities),
      upperExtremities: score(form.physicalExamination.upperExtremities),
    },

    sampler: {
      signs: score(form.sampler.signs),
      symptoms: score(form.sampler.symptoms),
      allergies: score(form.sampler.allergies),
      medications: score(form.sampler.medications),
      conditions: score(form.sampler.conditions),
      riskFactors: score(form.sampler.riskFactors),
      livings: score(form.sampler.livings),
      previousEvents: score(form.sampler.previousEvents),
    },

    opqrst: {
      onset: score(form.opqrst.onset),
      provocation: score(form.opqrst.provocation),
      quality: score(form.opqrst.quality),
      region: score(form.opqrst.region),
      severity: score(form.opqrst.severity),
      time: score(form.opqrst.time),
    },

    otherInterventions: {
      vascularAccess: score(form.otherInterventions.vascularAccess),
      temperatureControl: score(form.otherInterventions.temperatureControl),
      drugAdministration: score(form.otherInterventions.drugAdministration),
      patientPositioning: score(form.otherInterventions.patientPositioning),
      packaging: score(form.otherInterventions.packaging),
      crumRegulation: score(form.otherInterventions.crumRegulation),
      uniform: score(form.otherInterventions.uniform),
      workTeam: score(form.otherInterventions.workTeam),
      interventionsPerformed: score(form.otherInterventions.interventionsPerformed),
      teamWork: score(form.otherInterventions.teamWork),
      correctDiagnosis: score(form.otherInterventions.correctDiagnosis),
    },

    feedback: form.feedback,
  };
}