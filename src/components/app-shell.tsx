import type { ReactNode } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { Nav } from './nav';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const HormonalCareLogo = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
        <path d="M16 3.5C9.09644 3.5 3.5 9.09644 3.5 16C3.5 22.9036 9.09644 28.5 16 28.5C22.9036 28.5 28.5 22.9036 28.5 16C28.5 9.09644 22.9036 3.5 16 3.5Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.9199 11.9199C13.6953 10.1446 16.2898 10.1446 18.0652 11.9199" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20.0801 20.0801C18.3047 21.8554 15.7102 21.8554 13.9348 20.0801" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


export function AppShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-3 p-2">
            <HormonalCareLogo />
            <span className="text-lg font-semibold">HormonalCare</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Nav />
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://placehold.co/100x100.png" alt="Dr. Evelyn Reed" data-ai-hint="woman doctor" />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className="font-medium">Dr. Evelyn Reed</span>
                <span className="text-xs text-muted-foreground">e.reed@hormonal.care</span>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto">
                <LogOut className="h-5 w-5"/>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <main className="flex h-svh flex-col">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
