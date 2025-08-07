'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Patient } from "@/lib/types";
import { Pencil } from "lucide-react";

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
  const age = 34; // Placeholder

  if (!patient) {
    return (
        <main className="flex-1 overflow-auto p-4 md:p-6">
            <Card className="flex h-full items-center justify-center">
                <CardHeader className="text-center">
                    <CardTitle>Patient not found</CardTitle>
                </CardHeader>
            </Card>
        </main>
    )
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
            <Tabs defaultValue="medical-record">
                <TabsList>
                    <TabsTrigger value="medical-record">Medical Record</TabsTrigger>
                    <TabsTrigger value="appointments">Appointments</TabsTrigger>
                    <TabsTrigger value="lab-results">Lab Results</TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>
                <TabsContent value="medical-record" className="mt-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>Medical History</CardTitle>
                            <CardDescription>An overview of the patient's medical history.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Condition</TableHead>
                                        <TableHead>Diagnosed On</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Polycystic Ovary Syndrome (PCOS)</TableCell>
                                        <TableCell>Jan 15, 2022</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">Ongoing</Badge>
                                        </TableCell>
                                    </TableRow>
                                     <TableRow>
                                        <TableCell>Hypothyroidism</TableCell>
                                        <TableCell>Mar 02, 2023</TableCell>
                                        <TableCell>
                                            <Badge variant="default">Managed</Badge>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                           </Table>
                           <Button className="mt-4">Add New Entry</Button>
                        </CardContent>
                     </Card>
                </TabsContent>
                <TabsContent value="appointments" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upcoming Appointments</CardTitle>
                            <CardDescription>Scheduled appointments for the patient.</CardDescription>
                        </CardHeader>
                         <CardContent>
                           <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Time</TableHead>
                                        <TableHead>Reason</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>August 5, 2024</TableCell>
                                        <TableCell>10:00 AM</TableCell>
                                        <TableCell>Follow-up consultation</TableCell>
                                    </TableRow>
                                </TableBody>
                           </Table>
                           <Button className="mt-4">Schedule New Appointment</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="lab-results" className="mt-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>Lab Results</CardTitle>
                             <CardDescription>Recent laboratory test results.</CardDescription>
                        </CardHeader>
                         <CardContent>
                            <p>No new lab results.</p>
                         </CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="notes" className="mt-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>Clinical Notes</CardTitle>
                             <CardDescription>Notes from clinical encounters.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>No notes for this patient yet.</p>
                            <Button className="mt-4">Add Note</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </CardContent>
      </Card>
    </main>
  );
}
