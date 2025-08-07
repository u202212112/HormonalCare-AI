
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
};

export type DiagnosisTreatment = {
  id: string;
  diagnosis: string;
  treatment: string;
  date: string;
};

export type MedicalTest = {
  id: string;
  testName: string;
  date: string;
  resultUrl: string;
};

export type ExternalReport = {
  id: string;
  reportName: string;
  date: string;
  reportUrl: string;
};

export type MedicalRecord = {
  patientHistory: PatientHistory[];
  diagnosisTreatment: DiagnosisTreatment[];
  medicalTest: MedicalTest[];
  externalReports: ExternalReport[];
};
