import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Patient } from "@/lib/types";
import { PlusCircle, Search } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const patients: Patient[] = [
    { id: 'pat_1', name: 'Olivia Martin', email: 'olivia.martin@email.com', lastCheckIn: 'July 20, 2024', status: 'Stable', avatar: 'https://placehold.co/100x100.png', initials: 'OM' },
    { id: 'pat_2', name: 'Liam Garcia', email: 'liam.g@email.com', lastCheckIn: 'July 18, 2024', status: 'At Risk', avatar: 'https://placehold.co/100x100.png', initials: 'LG' },
    { id: 'pat_3', name: 'Emma Johnson', email: 'emma.j@email.com', lastCheckIn: 'June 30, 2024', status: 'Needs Review', avatar: 'https://placehold.co/100x100.png', initials: 'EJ' },
    { id: 'pat_4', name: 'Noah Brown', email: 'noah.b@email.com', lastCheckIn: 'July 21, 2024', status: 'Stable', avatar: 'https://placehold.co/100x100.png', initials: 'NB' },
    { id: 'pat_5', name: 'Ava Rodriguez', email: 'ava.r@email.com', lastCheckIn: 'July 15, 2024', status: 'Stable', avatar: 'https://placehold.co/100x100.png', initials: 'AR' },
    { id: 'pat_6', name: 'James Wilson', email: 'james.w@email.com', lastCheckIn: 'July 22, 2024', status: 'Stable', avatar: 'https://placehold.co/100x100.png', initials: 'JW' },
];

export default function PatientsListPage() {
  const selectedPatientId = 'pat_1'; // This would be dynamic in a real app

  return (
    <aside className="w-full max-w-sm border-r flex flex-col">
        <header className="flex items-center justify-between gap-4 border-b p-4">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden" />
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Patients</h1>
                </div>
            </div>
            <Button size="icon">
                <PlusCircle className="h-5 w-5" />
                <span className="sr-only">Add Patient</span>
            </Button>
        </header>
        <div className="p-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search patients..." className="pl-9" />
            </div>
        </div>
        <ScrollArea className="flex-1">
            <div className="p-4 pt-0">
                <div className="flex flex-col gap-2">
                    {patients.map((patient) => (
                        <Link href={`/patients/${patient.id}`} key={patient.id} >
                            <Card className={cn("hover:bg-accent transition-colors", selectedPatientId === patient.id && "bg-accent")}>
                                <CardContent className="p-3">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10 border">
                                            <AvatarImage src={patient.avatar} alt={patient.name} data-ai-hint="person portrait" />
                                            <AvatarFallback>{patient.initials}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium">{patient.name}</div>
                                            <div className="text-sm text-muted-foreground">{patient.email}</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </ScrollArea>
    </aside>
  );
}
