export interface SamplerModel {
  signs: number;
  symptoms: number;
  allergies: number;
  medications: number;
  conditions: number;
  riskFactors: number;
  livings: number;
  previousEvents: number;
}

export interface OpqrstModel {
  onset: number;
  provocation: number;
  quality: number;
  region: number;
  severity: number;
  time: number;
}