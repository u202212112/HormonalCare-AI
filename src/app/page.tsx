import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Users, Calendar, Activity, BarChart3, FileText, FlaskConical } from "lucide-react";

export default function Home() {
  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center gap-4 border-b p-4">
        <SidebarTrigger className="md:hidden" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back, Dr. Reed! Here's an overview of your clinic.</p>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Patients
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Appointments Today
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12</div>
              <p className="text-xs text-muted-foreground">
                3 scheduled for this afternoon
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">57</div>
              <p className="text-xs text-muted-foreground">
                +2 since yesterday
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Quick Access</CardTitle>
                    <CardDescription>Navigate to key sections of the application.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-4 rounded-lg border p-4 hover:bg-accent transition-colors">
                        <BarChart3 className="h-8 w-8 text-primary"/>
                        <div>
                            <h3 className="font-semibold">Analytics</h3>
                            <p className="text-sm text-muted-foreground">View patient trends</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border p-4 hover:bg-accent transition-colors">
                        <FileText className="h-8 w-8 text-primary"/>
                        <div>
                            <h3 className="font-semibold">Reports</h3>
                            <p className="text-sm text-muted-foreground">Generate patient reports</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-4 rounded-lg border p-4 hover:bg-accent transition-colors">
                        <FlaskConical className="h-8 w-8 text-primary"/>
                        <div>
                            <h3 className="font-semibold">Lab Results</h3>
                            <p className="text-sm text-muted-foreground">Review new test results</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
