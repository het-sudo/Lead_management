import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  return (
    <div className="flex items-center border-b p-4">
      <SidebarTrigger />
      <h1 className="ml-4 text-xl font-bold">Admin</h1>
    </div>
  );
}
