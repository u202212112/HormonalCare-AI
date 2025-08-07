'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { PatientHistory, DiagnosisTreatment, MedicalTest, ExternalReport } from "@/lib/types";
import { Calendar, User, FileText, AlertTriangle, Pill, Clock, Stethoscope } from "lucide-react";

interface PatientHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: PatientHistory | null;
}

export function PatientHistoryModal({ isOpen, onClose, record }: PatientHistoryModalProps) {
  if (!record) return null;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Mild': return 'default';
      case 'Moderate': return 'secondary';
      case 'Severe': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            {record.condition}
          </DialogTitle>
          <DialogDescription>
            Detailed medical history record
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Diagnosed On</p>
                  <p className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {record.diagnosedOn}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge variant={record.status === 'Ongoing' ? 'secondary' : 'default'}>
                    {record.status}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Severity</p>
                <Badge variant={getSeverityColor(record.severity)}>
                  {record.severity}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Attending Physician</p>
                <p className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {record.physician}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{record.description}</p>
            </CardContent>
          </Card>

          {/* Symptoms */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Symptoms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {record.symptoms.map((symptom, index) => (
                  <Badge key={index} variant="outline">
                    {symptom}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Medications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Pill className="h-5 w-5" />
                Current Medications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {record.currentMedication.map((medication, index) => (
                  <div key={index} className="p-2 bg-muted rounded">
                    <p className="text-sm">{medication}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Clinical Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Clinical Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{record.notes}</p>
              <Separator className="my-3" />
              <p className="text-xs text-muted-foreground">
                Last updated: {record.lastUpdate}
              </p>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface DiagnosisTreatmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: DiagnosisTreatment | null;
}

export function DiagnosisTreatmentModal({ isOpen, onClose, record }: DiagnosisTreatmentModalProps) {
  if (!record) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {record.diagnosis}
          </DialogTitle>
          <DialogDescription>
            Diagnosis and treatment details - {record.date}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">{record.icd10Code}</p>
                  <p className="text-xs text-muted-foreground">ICD-10 Code</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm font-medium">{record.date}</p>
                  <p className="text-xs text-muted-foreground">Diagnosis Date</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm font-medium">{record.followUpDate}</p>
                  <p className="text-xs text-muted-foreground">Follow-up Date</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Clinical Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{record.description}</p>
            </CardContent>
          </Card>

          {/* Treatment Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Treatment Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{record.treatmentPlan}</p>
            </CardContent>
          </Card>

          {/* Medications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Pill className="h-5 w-5" />
                Prescribed Medications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {record.medications.map((medication, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded border-l-4 border-blue-200">
                    <p className="text-sm font-medium">{medication}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Treatment Response */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Treatment Response</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{record.treatmentResponse}</p>
            </CardContent>
          </Card>

          {/* Side Effects */}
          {record.sideEffects.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Side Effects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {record.sideEffects.map((effect, index) => (
                    <div key={index} className="p-2 bg-orange-50 rounded border-l-4 border-orange-200">
                      <p className="text-sm">{effect}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Provider and Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Provider Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Attending Physician</p>
                <p className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {record.physician}
                </p>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Clinical Notes</p>
                <p className="text-sm mt-2">{record.notes}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface MedicalTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: MedicalTest | null;
}

export function MedicalTestModal({ isOpen, onClose, record }: MedicalTestModalProps) {
  if (!record) return null;

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Normal': return 'default';
      case 'Urgent': return 'secondary';
      case 'Critical': return 'destructive';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'default';
      case 'Pending': return 'secondary';
      case 'Cancelled': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {record.testName}
          </DialogTitle>
          <DialogDescription>
            Medical test results and details - {record.date}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Test Information */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6 space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Test Type</p>
                  <p className="font-medium">{record.testType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date Performed</p>
                  <p className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {record.date}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge variant={getStatusColor(record.status)}>
                    {record.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ordered By</p>
                  <p className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {record.orderedBy}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Laboratory</p>
                  <p>{record.labName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Urgency</p>
                  <Badge variant={getUrgencyColor(record.urgency)}>
                    {record.urgency}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-mono">{record.results}</p>
              </div>
            </CardContent>
          </Card>

          {/* Normal Range */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reference Range</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-700 bg-green-50 p-3 rounded">
                {record.normalRange}
              </p>
            </CardContent>
          </Card>

          {/* Interpretation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Clinical Interpretation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{record.interpretation}</p>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {record.recommendations.map((recommendation, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded border-l-4 border-blue-200">
                    <p className="text-sm">{recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* View Report Button */}
          <div className="flex justify-center">
            <Button className="w-full sm:w-auto">
              <FileText className="mr-2 h-4 w-4" />
              View Full Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface ExternalReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: ExternalReport | null;
}

export function ExternalReportModal({ isOpen, onClose, record }: ExternalReportModalProps) {
  if (!record) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {record.reportName}
          </DialogTitle>
          <DialogDescription>
            External medical report - {record.date}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Report Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Report Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Report Type</p>
                  <p>{record.reportType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date</p>
                  <p className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {record.date}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Source</p>
                  <p>{record.source}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Provider</p>
                  <p className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {record.physician}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{record.summary}</p>
            </CardContent>
          </Card>

          {/* Key Findings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Key Findings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {record.keyFindings.map((finding, index) => (
                  <div key={index} className="p-3 bg-yellow-50 rounded border-l-4 border-yellow-200">
                    <p className="text-sm">{finding}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {record.recommendations.map((recommendation, index) => (
                  <div key={index} className="p-3 bg-green-50 rounded border-l-4 border-green-200">
                    <p className="text-sm">{recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* View Report Button */}
          <div className="flex justify-center">
            <Button className="w-full sm:w-auto">
              <FileText className="mr-2 h-4 w-4" />
              View Full Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
