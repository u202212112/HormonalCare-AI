'use client'

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Patient, MedicalRecord, PatientHistory, DiagnosisTreatment, MedicalTest, ExternalReport } from "@/lib/types";
import { Pencil, FileText, Eye } from "lucide-react";
import medicalRecords from '@/data/medical-records.json';
import { 
  PatientHistoryModal, 
  DiagnosisTreatmentModal, 
  MedicalTestModal, 
  ExternalReportModal 
} from '@/components/patient-detail-modals';

const patients: Patient[] = [
  { id: 'pat_1', name: 'Olivia Martin', email: 'olivia.martin@email.com', lastCheckIn: 'July 20, 2024', status: 'Stable', avatar: 'https://placehold.co/100x100.png', initials: 'OM' },
  { id: 'pat_2', name: 'Liam Garcia', email: 'liam.g@email.com', lastCheckIn: 'July 18, 2024', status: 'At Risk', avatar: 'https://placehold.co/100x100.png', initials: 'LG' },
  { id: 'pat_3', name: 'Emma Johnson', email: 'emma.j@email.com', lastCheckIn: 'June 30, 2024', status: 'Needs Review', avatar: 'https://placehold.co/100x100.png', initials: 'EJ' },
  { id: 'pat_4', name: 'Noah Brown', email: 'noah.b@email.com', lastCheckIn: 'July 21, 2024', status: 'Stable', avatar: 'https://placehold.co/100x100.png', initials: 'NB' },
  { id: 'pat_5', name: 'Ava Rodriguez', email: 'ava.r@email.com', lastCheckIn: 'July 15, 2024', status: 'Stable', avatar: 'https://placehold.co/100x100.png', initials: 'AR' },
  { id: 'pat_6', name: 'James Wilson', email: 'james.w@email.com', lastCheckIn: 'July 22, 2024', status: 'Stable', avatar: 'https://placehold.co/100x100.png', initials: 'JW' },
];

const statusVariant: { [key in Patient['status']]: 'default' | 'secondary' | 'destructive' } = {
  'Stable': 'default',
  'At Risk': 'secondary',
  'Needs Review': 'destructive',
};

export default function PatientDetailsPage({ params }: { params: { patientId: string } }) {
  const [selectedHistoryRecord, setSelectedHistoryRecord] = useState<PatientHistory | null>(null);
  const [selectedDiagnosisRecord, setSelectedDiagnosisRecord] = useState<DiagnosisTreatment | null>(null);
  const [selectedTestRecord, setSelectedTestRecord] = useState<MedicalTest | null>(null);
  const [selectedExternalRecord, setSelectedExternalRecord] = useState<ExternalReport | null>(null);
  
  const patient = patients.find(p => p.id === params.patientId);
  const record: MedicalRecord | undefined = (medicalRecords as Record<string, MedicalRecord>)[params.patientId];
  const age = 34; // Placeholder

  if (!patient || !record) {
    return (
      <main className="flex-1 overflow-auto p-4 md:p-6 bg-muted/20">
        <Card className="flex h-full items-center justify-center">
          <CardHeader className="text-center">
            <CardTitle>Patient not found</CardTitle>
            <CardDescription>The patient with the specified ID could not be found.</CardDescription>
          </CardHeader>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-auto p-4 md:p-6 bg-muted/20">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-20 w-20 border">
            <AvatarImage src={patient.avatar} alt={patient.name} data-ai-hint="person portrait" />
            <AvatarFallback>{patient.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold">{patient.name}</h1>
                <Badge variant={statusVariant[patient.status]}>{patient.status}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{patient.email} &middot; {age} years old</p>
          </div>
          <Button variant="outline" size="icon"><Pencil className="h-4 w-4" /></Button>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="patient-history">
                <TabsList>
                    <TabsTrigger value="patient-history">Patient history</TabsTrigger>
                    <TabsTrigger value="diagnosis-treatment">Diagnosis & treatment</TabsTrigger>
                    <TabsTrigger value="medical-test">Medical test</TabsTrigger>
                    <TabsTrigger value="external-reports">External reports</TabsTrigger>
                </TabsList>
                <TabsContent value="patient-history" className="mt-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>Patient History</CardTitle>
                            <CardDescription>An overview of the patient's medical history.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           {record.patientHistory.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Condition</TableHead>
                                        <TableHead>Diagnosed On</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Severity</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {record.patientHistory.map(entry => (
                                      <TableRow key={entry.id} className="cursor-pointer hover:bg-muted/50">
                                          <TableCell className="font-medium">{entry.condition}</TableCell>
                                          <TableCell>{entry.diagnosedOn}</TableCell>
                                          <TableCell>
                                              <Badge variant={entry.status === 'Ongoing' ? 'secondary' : 'default'}>{entry.status}</Badge>
                                          </TableCell>
                                          <TableCell>
                                              <Badge variant={entry.severity === 'Severe' ? 'destructive' : entry.severity === 'Moderate' ? 'secondary' : 'default'}>
                                                {entry.severity}
                                              </Badge>
                                          </TableCell>
                                          <TableCell className="text-right">
                                            <Button 
                                              variant="outline" 
                                              size="sm"
                                              onClick={() => setSelectedHistoryRecord(entry)}
                                            >
                                              <Eye className="mr-2 h-4 w-4" />
                                              View Details
                                            </Button>
                                          </TableCell>
                                      </TableRow>
                                    ))}
                                </TableBody>
                           </Table>
                           ) : (
                            <p>No patient history available.</p>
                           )}
                           <Button className="mt-4">Add New Entry</Button>
                        </CardContent>
                     </Card>
                </TabsContent>
                <TabsContent value="diagnosis-treatment" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Diagnosis & Treatment</CardTitle>
                            <CardDescription>Patient diagnosis and treatment plans.</CardDescription>
                        </CardHeader>
                         <CardContent>
                            {record.diagnosisTreatment.length > 0 ? (
                              <div className="space-y-4">
                                {record.diagnosisTreatment.map(entry => (
                                  <div 
                                    key={entry.id} 
                                    className="border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                                    onClick={() => setSelectedDiagnosisRecord(entry)}
                                  >
                                    <div className="flex justify-between items-start">
                                      <div className="flex-1">
                                        <p className="font-semibold text-lg">{entry.diagnosis}</p>
                                        <p className="text-sm text-muted-foreground mb-2">
                                          <span className="font-medium">ICD-10:</span> {entry.icd10Code} • <span className="font-medium">Date:</span> {entry.date}
                                        </p>
                                        <p className="text-sm">{entry.description}</p>
                                      </div>
                                      <Button variant="outline" size="sm">
                                        <Eye className="mr-2 h-4 w-4" />
                                        View Details
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p>No diagnosis and treatment information available.</p>
                            )}
                            <Button className="mt-4">Add Information</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="medical-test" className="mt-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>Medical Tests</CardTitle>
                             <CardDescription>Recent medical test results.</CardDescription>
                        </CardHeader>
                         <CardContent>
                           {record.medicalTest.length > 0 ? (
                              <Table>
                                  <TableHeader>
                                      <TableRow>
                                          <TableHead>Test Name</TableHead>
                                          <TableHead>Date</TableHead>
                                          <TableHead>Type</TableHead>
                                          <TableHead>Status</TableHead>
                                          <TableHead>Urgency</TableHead>
                                          <TableHead className="text-right">Actions</TableHead>
                                      </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                      {record.medicalTest.map(test => (
                                        <TableRow key={test.id} className="cursor-pointer hover:bg-muted/50">
                                            <TableCell className="font-medium">{test.testName}</TableCell>
                                            <TableCell>{test.date}</TableCell>
                                            <TableCell>{test.testType}</TableCell>
                                            <TableCell>
                                              <Badge variant={test.status === 'Completed' ? 'default' : test.status === 'Pending' ? 'secondary' : 'destructive'}>
                                                {test.status}
                                              </Badge>
                                            </TableCell>
                                            <TableCell>
                                              <Badge variant={test.urgency === 'Normal' ? 'default' : test.urgency === 'Urgent' ? 'secondary' : 'destructive'}>
                                                {test.urgency}
                                              </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button 
                                                  variant="outline" 
                                                  size="sm"
                                                  onClick={() => setSelectedTestRecord(test)}
                                                >
                                                  <Eye className="mr-2 h-4 w-4"/>
                                                  View Results
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                      ))}
                                  </TableBody>
                              </Table>
                           ) : (
                             <p>No new medical test results.</p>
                           )}
                             <Button className="mt-4">Add Results</Button>
                         </CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="external-reports" className="mt-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>External Reports</CardTitle>
                             <CardDescription>External medical reports.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {record.externalReports.length > 0 ? (
                                <div className="space-y-4">
                                  {record.externalReports.map(report => (
                                    <div 
                                      key={report.id}
                                      className="border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                                      onClick={() => setSelectedExternalRecord(report)}
                                    >
                                      <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                          <p className="font-semibold text-lg">{report.reportName}</p>
                                          <p className="text-sm text-muted-foreground mb-2">
                                            <span className="font-medium">Type:</span> {report.reportType} • 
                                            <span className="font-medium"> Date:</span> {report.date} • 
                                            <span className="font-medium"> Source:</span> {report.source}
                                          </p>
                                          <p className="text-sm">{report.summary}</p>
                                        </div>
                                        <Button variant="outline" size="sm">
                                          <Eye className="mr-2 h-4 w-4" />
                                          View Report
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                            ) : (
                                <p>No external reports for this patient yet.</p>
                            )}
                            <Button className="mt-4">Add Report</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </CardContent>
      </Card>

      {/* Modals */}
      <PatientHistoryModal 
        isOpen={!!selectedHistoryRecord}
        onClose={() => setSelectedHistoryRecord(null)}
        record={selectedHistoryRecord}
      />
      
      <DiagnosisTreatmentModal 
        isOpen={!!selectedDiagnosisRecord}
        onClose={() => setSelectedDiagnosisRecord(null)}
        record={selectedDiagnosisRecord}
      />
      
      <MedicalTestModal 
        isOpen={!!selectedTestRecord}
        onClose={() => setSelectedTestRecord(null)}
        record={selectedTestRecord}
      />
      
      <ExternalReportModal 
        isOpen={!!selectedExternalRecord}
        onClose={() => setSelectedExternalRecord(null)}
        record={selectedExternalRecord}
      />
    </main>
  );
}
