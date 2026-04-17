import { useEffect, useState } from "react";
import { columns, type Payment } from "../components/table/column";
import { DataTable } from "../components/table/data-table";

// import {
//   SidebarProvider,
//   SidebarInset,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";

// import { Sidebar } from "@/components/layout/sidebar";
import { AppLayout } from "@/components/layout/app-layout";

function getData(): Promise<Payment[]> {
  return Promise.resolve([
    {
      id: "728ed52f",
      name: "Het Patel",
      category: "Tech",
    },
  ]);
}

export default function DemoPage() {
  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    getData().then(setData);
  }, []);

  return (
    // <SidebarProvider>
    //   <Sidebar />

    //   <SidebarInset>
    //     <div className="flex items-center border-b p-4">
    //       <SidebarTrigger />
    //       <h1 className="ml-4 text-xl font-bold">Dashboard</h1>
    //     </div>

    //     <div className="p-6">
    //       <DataTable columns={columns} data={data} />
    //     </div>
    //   </SidebarInset>
    // </SidebarProvider>
    <AppLayout>
      <DataTable columns={columns} data={data} />
    </AppLayout>
  );
}
