import {
  Component,
  inject,
  signal,
  OnInit,
  computed
} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ReviewApi } from '../../services/review-api';
import { ReviewResponseDto } from '../../dto/review-response.dto';

interface ReviewSection {
  key: string;
  value: unknown;
}


@Component({
  selector: 'app-review-detail',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './review-detail.html',
  styleUrl: './review-detail.scss',
})


export class ReviewDetail implements OnInit {

  private readonly router = inject(Router);

  private readonly route = inject(ActivatedRoute);

  private readonly api = inject(ReviewApi);

  private readonly labels: Record<string, string> = {

    // Manejo de escena
    sceneManagement: 'Manejo de la escena',
    situationManagement: 'Manejo de la situacion',
    safetyManagement: 'Manejo de la seguridad',
    resourceRequest: 'Solicitud de servicios y recursos adicionales',
    overallImpression: 'Impresion general del paciente (AVDI)',

    // Evaluación primaria
    hemorrhageIdentification: 'Identifica hemorragias exanguinantes',
    hemorrhageControl: 'Control de hemorragias',
    airwayAssessment: 'Evaluacion de la VA',
    airwayManagement: 'Tratamiento a considerar para abrir VA',
    ventilationAssessment: 'Evaluacion de la ventilacion (RFC)',
    lungAuscultation: 'Auscutacion de campos pulmonares',
    oxygenTherapy: 'Administra y selecciona dispositivo para oxigeno terapia',
    pulseAssessment: 'Evalua RFC del pulso periferico y central',
    capillaryRefill: 'Evulua llenado capilar',
    skinAssessment: 'Evalua temperatura, coloracion y condicion de la piel',
    pirrl: 'Evalua PIRRL',
    glasgow: 'Evalua y determina ECG',
    exposure: 'Exposion del paciente',
    temperatureManagement: 'Manejo de temperatura y pudor del paciente',



    // Prioridad paciente
    patientPriority: 'Prioridad del paciente',
    transferPatientDecision: 'Determina translado del paciente SI/NO',

    // Signos vitales
    fc: 'Frecuencia cardíaca',
    fr: 'Frecuencia respiratoria',
    ta: 'TA',
    temperature: 'Temperatura',
    glucose: 'Glucosa',
    spo2: 'Sp02',

    // Evaluación enfocada
    inspection: 'Inspección',
    palpation: 'Palpación',
    auscultation: 'Auscultación',
    percussion: 'Percusión',

    // Exploración física
    head: 'Cabeza',
    neck: 'Cuello',
    thorax: 'Torax',
    abdomen: 'Abdomen',
    pelvis: 'Pelvis',
    spine: 'Columna',
    lowerExtremities: 'MT',
    upperExtremities: 'MP',

    // SAMPLE
    signs: 'Signos',
    symptoms: 'Sintomas',
    allergies: 'Alergias',
    medications: 'Medicamentos',
    conditions: 'Patologias',
    riskFactors: 'Factores de riesgo',
    livings: 'Liberaciones',
    previousEvents: 'Eventos previos',

    // OPQRST
    onset: 'Onset(inicio)',
    provocation: 'Provocación',
    quality: 'Quality(calidad)',
    region: 'Región',
    severity: 'Severidad',
    time: 'Tiempo',

    // Other Interventions
    vascularAccess: 'Accesos vasculares: Soluciones, cantidades, ceteter a utilizar',
    temperatureControl: 'Manejo adecuado de la temperatura con mantas, agentes fisicos',
    drugAdministration: 'Seleccion, dosis y administracion de farmacos',
    patientPositioning: 'Posicion del paciente',
    packaging: 'Empaquetado del paciente',
    crumRegulation: 'Regulacion del paciente en caso de ser necesario a CRUM',
    uniform: 'Presencia del alumno (uniforme)',
    workTeam: 'Equipo de trabajo: Botiquin, EPP, Diagnostico',
    interventionsPerformed: 'Realiza intervenciones en el paciente: SI / NO',
    teamWork: 'Trabajo en equipo: SI / NO',
    correctDiagnosis: 'Identifica diagnostico: SI / NO',
  };

  private readonly sectionOrder: Record<string, string[]> = {

    sceneManagement: [
      'sceneManagement',
      'situationManagement',
      'safetyManagement',
      'resourceRequest',
      'overallImpression',
    ],


    primaryAssessment: [
      'hemorrhageIdentification',
      'hemorrhageControl',
      'airwayAssessment',
      'airwayManagement',
      'ventilationAssessment',
      'lungAuscultation',
      'oxygenTherapy',
      'pulseAssessment',
      'capillaryRefill',
      'skinAssessment',
      'pirrl',
      'glasgow',
      'exposure',
      'temperatureManagement',
    ],


    patientPriority: [
      'patientPriority',
      'transferPatientDecision',
    ],


    vitalSigns: [
      'fc',
      'fr',
      'temperature',
      'glucose',
      'ta',
      'spo2',
    ],


    focusedAssessment: [
      'inspection',
      'palpation',
      'auscultation',
      'percussion',
    ],


    physicalExamination: [
      'head',
      'neck',
      'thorax',
      'abdomen',
      'pelvis',
      'spine',
      'lowerExtremities',
      'upperExtremities',
    ],


    sampler: [
      'signs',
      'symptoms',
      'allergies',
      'medications',
      'conditions',
      'riskFactors',
      'livings',
      'previousEvents',
    ],


    opqrst: [
      'onset',
      'provocation',
      'quality',
      'region',
      'severity',
      'time',
    ],


    otherInterventions: [
      'vascularAccess',
      'temperatureControl',
      'drugAdministration',
      'patientPositioning',
      'packaging',
      'crumRegulation',
      'uniform',
      'workTeam',
      'interventionsPerformed',
      'teamWork',
      'correctDiagnosis',
    ],

  };

  readonly sections = computed<ReviewSection[]>(() => {

    const review = this.review();

    if (!review) {
      return [];
    }


    return [
      {
        key: 'sceneManagement',
        value: review.sceneManagement,
      },

      {
        key: 'primaryAssessment',
        value: review.primaryAssessment,
      },

      {
        key: 'patientPriority',
        value: review.patientPriority,
      },

      {
        key: 'vitalSigns',
        value: review.vitalSigns,
      },

      {
        key: 'focusedAssessment',
        value: review.focusedAssessment,
      },

      {
        key: 'physicalExamination',
        value: review.physicalExamination,
      },

      {
        key: 'sampler',
        value: review.sampler,
      },

      {
        key: 'opqrst',
        value: review.opqrst,
      },

      {
        key: 'otherInterventions',
        value: review.otherInterventions,
      },
    ];

  });

  private readonly sectionLabels: Record<string, string> = {

    sceneManagement: 'Parametros',

    primaryAssessment: 'Evaluación primaria',

    patientPriority: 'Prioridad del paciente',

    vitalSigns: 'Toma de signos vitales',

    focusedAssessment: 'Evaluación enfocada: (casos clinicos)',

    physicalExamination: 'Exploración física',

    sampler: 'Sampler',

    opqrst: 'OPQRST',

    otherInterventions: 'Otras intervenciones',

  };


  review = signal<ReviewResponseDto | null>(null);

  loading = signal(true);



  ngOnInit() {

    const id =
      this.route.snapshot.paramMap.get('id');


    if (!id) {
      this.loading.set(false);
      return;
    }


    this.api.getReviewById(id)
      .subscribe({

        next: (review) => {

          console.log(
            '[Review detail]',
            review
          );


          this.review.set(review);

          this.loading.set(false);

        },


        error: (err) => {

          console.error(err);

          this.loading.set(false);

        }

      });

  }

  editReview(id: string) {
    const review = this.review();

    if (!review) return;

    this.router.navigate([
      '/dashboard/teacher/reviews',
      id,
      'edit'
    ]);
  }

  getEntries(
    section: unknown,
    sectionKey?: string
  ) {

    if (!section || typeof section !== 'object') {
      return [];
    }


    const entries = Object.entries(section);


    if (!sectionKey) {
      return entries;
    }


    const order = this.sectionOrder[sectionKey];


    if (!order) {
      return entries;
    }


    return order
      .filter(key =>
        entries.some(([entryKey]) => entryKey === key)
      )
      .map(key =>
        entries.find(([entryKey]) => entryKey === key)!
      );

  }

  label(key: string): string {

    return this.labels[key] ?? key;

  }

  sectionLabel(key: string) {

    return this.sectionLabels[key] ?? key;

  }

}