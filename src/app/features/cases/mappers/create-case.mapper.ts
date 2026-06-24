import { CaseFormValue } from '../forms/case.form';
import { CreateCaseModel } from '../models/create-case.model';
import { Gender } from '../models/patient.model';

export function mapCreateCase(form: CaseFormValue): CreateCaseModel {
  return {
    general: {
      ...form.general,
    },

    patient: {
      ...form.patient,

      gender: form.patient.gender,

      age: Number(form.patient.age),

      medicalHistory: form.patient.medicalHistory ? [form.patient.medicalHistory] : [],

      medications: form.patient.medications ?? '',
    },

    findings: {
      ...form.findings,
    },

    vitalSigns: {
      ...form.vitalSigns,

      fc: form.vitalSigns.fc ? Number(form.vitalSigns.fc) : null,

      fr: form.vitalSigns.fr ? Number(form.vitalSigns.fr) : null,

      spo2: form.vitalSigns.spo2 ? Number(form.vitalSigns.spo2) : null,

      glucose: form.vitalSigns.glucose ? Number(form.vitalSigns.glucose) : null,

      temperature: form.vitalSigns.temperature ? Number(form.vitalSigns.temperature) : null,

      capillaryFiller: form.vitalSigns.capillaryFiller
        ? Number(form.vitalSigns.capillaryFiller)
        : null,
    },

    neurological: {
      ...form.neurological,

      glasgow: form.neurological.glasgow ? Number(form.neurological.glasgow) : null,
    },

    publishCase: {
      ...form.publishCase,
    },

    feedback: form.feedback ?? '',
  };
}
