import { Button } from "@/components/ui/button";

export function Sidebar() {
  return (
    <div className="w-64 h-screen border-r p-4 space-y-4 bg-gray-200">
      <h1 className="text-xl font-bold">ADMIN</h1>

      <Button variant="ghost" className="w-full justify-start">
        Leads
      </Button>

      <Button variant="ghost" className="w-full justify-start">
        Developer
      </Button>

      <Button variant="ghost" className="w-full justify-start">
        Technologies
      </Button>
    </div>
  );
}
