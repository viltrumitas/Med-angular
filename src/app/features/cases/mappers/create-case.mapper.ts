import { CaseFormValue } from '../forms/case.form';
import { CreateCaseModel } from '../dto/create-case.dto';
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

      glasgow: form.neurological.glasgow
        ? {
            ocular:
              form.neurological.glasgow.ocular !== null
                ? Number(form.neurological.glasgow.ocular)
                : null,
            verbal:
              form.neurological.glasgow.verbal !== null
                ? Number(form.neurological.glasgow.verbal)
                : null,
            motora:
              form.neurological.glasgow.motora !== null
                ? Number(form.neurological.glasgow.motora)
                : null,
          }
        : null,
    },

    area: form.medicalArea.area,

    publishCase: {
      isPublished: form.publishCase.isPublished,
    },

    feedback: form.feedback ?? '',
  };
}
