
export type Patient = {
  id: string;
  name: string;
  email: string;
  lastCheckIn: string;
  status: 'Stable' | 'At Risk' | 'Needs Review';
  avatar: string;
  initials: string;
};

export type PatientHistory = {
  id: string;
  condition: string;
  diagnosedOn: string;
  status: string;
  description: string;
  symptoms: string[];
  severity: 'Mild' | 'Moderate' | 'Severe';
  currentMedication: string[];
  notes: string;
  lastUpdate: string;
  physician: string;
};

export type DiagnosisTreatment = {
  id: string;
  diagnosis: string;
  treatment: string;
  date: string;
  icd10Code: string;
  description: string;
  treatmentPlan: string;
  medications: string[];
  followUpDate: string;
  treatmentResponse: string;
  sideEffects: string[];
  physician: string;
  notes: string;
};

export type MedicalTest = {
  id: string;
  testName: string;
  date: string;
  resultUrl: string;
  testType: string;
  orderedBy: string;
  labName: string;
  results: string;
  normalRange: string;
  interpretation: string;
  recommendations: string[];
  urgency: 'Normal' | 'Urgent' | 'Critical';
  status: 'Pending' | 'Completed' | 'Cancelled';
};

export type ExternalReport = {
  id: string;
  reportName: string;
  date: string;
  reportUrl: string;
  reportType: string;
  source: string;
  physician: string;
  summary: string;
  keyFindings: string[];
  recommendations: string[];
};

export type MedicalRecord = {
  patientHistory: PatientHistory[];
  diagnosisTreatment: DiagnosisTreatment[];
  medicalTest: MedicalTest[];
  externalReports: ExternalReport[];
};
