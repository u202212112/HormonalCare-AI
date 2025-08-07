import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function PatientDetailsDefault() {
    return (
        <main className="flex-1 overflow-auto p-4 md:p-6">
            <Card className="flex h-full items-center justify-center">
                <CardHeader className="text-center">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                    <CardTitle className="mt-4">No Patient Selected</CardTitle>
                    <CardDescription>Please select a patient from the list to view their details.</CardDescription>
                </CardHeader>
            </Card>
        </main>
    );
}
