import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

import { Sidebar } from "./sidebar";
import { Header } from "./header";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar />

      <SidebarInset>
        <Header />

        <main className="p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
