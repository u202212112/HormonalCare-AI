
'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Patient, MedicalRecord } from "@/lib/types";
import { Pencil, FileText } from "lucide-react";
import medicalRecords from '@/data/medical-records.json';

const patients: Patient[] = [
  { id: 'pat_1', name: 'Olivia Martin', email: 'olivia.martin@email.com', lastCheckIn: 'July 20, 2024', status: 'Stable', avatar: 'https://placehold.co/100x100.png', initials: 'OM' },
  { id: 'pat_2', name: 'Liam Garcia', email: 'liam.g@email.com', lastCheckIn: 'July 18, 2024', status: 'At Risk', avatar: 'https://placehold.co/100x100.png', initials: 'LG' },
  { id: 'pat_3', name: 'Emma Johnson', email: 'emma.j@email.com', lastCheckIn: 'June 30, 2024', status: 'Needs Review', avatar: 'https://placehold.co/100x100.png', initials: 'EJ' },
  { id: 'pat_4', name: 'Noah Brown', email: 'noah.b@email.com', lastCheckIn: 'July 21, 2024', status: 'Stable', avatar: 'https://placehold.co/100x100.png', initials: 'NB' },
  { id: 'pat_5', name: 'Ava Rodriguez', email: 'ava.r@email.com', lastCheckIn: 'July 15, 2024', status: 'Stable', avatar: 'https://placehold.co/100x100.png', initials: 'AR' },
  { id: 'pat_6', name: 'James Wilson', email: 'james.w@email.com', lastCheckIn: 'July 22, 2024', status: 'Stable', avatar: 'https://placehold.co/100x100.png', initials: 'JW' },
];

const statusVariant: Record<Patient['status'], 'default' | 'secondary' | 'destructive'> = {
  'Stable': 'default',
  'At Risk': 'secondary',
  'Needs Review': 'destructive',
};

export default function PatientDetailsPage({ params }: { params: { patientId: string } }) {
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
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {record.patientHistory.map(entry => (
                                      <TableRow key={entry.id}>
                                          <TableCell>{entry.condition}</TableCell>
                                          <TableCell>{entry.diagnosedOn}</TableCell>
                                          <TableCell>
                                              <Badge variant={entry.status === 'Ongoing' ? 'secondary' : 'default'}>{entry.status}</Badge>
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
                                  <div key={entry.id} className="border-b pb-4">
                                    <p className="font-semibold">{entry.diagnosis} <span className="text-sm font-normal text-muted-foreground">({entry.date})</span></p>
                                    <p className="text-sm">{entry.treatment}</p>
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
                                          <TableHead>Result</TableHead>
                                      </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                      {record.medicalTest.map(test => (
                                        <TableRow key={test.id}>
                                            <TableCell>{test.testName}</TableCell>
                                            <TableCell>{test.date}</TableCell>
                                            <TableCell>
                                                <Button variant="outline" size="sm"><FileText className="mr-2 h-4 w-4"/> View</Button>
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
                    </card>
                </TabsContent>
                 <TabsContent value="external-reports" className="mt-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>External Reports</CardTitle>
                             <CardDescription>External medical reports.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {record.externalReports.length > 0 ? (
                                <p>External reports are available.</p>
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
    </main>
  );
}

    