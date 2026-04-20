import { useEffect, useState } from "react";
import {
  dashboardColumns,
  type DashboardData,
} from "../components/table/dashboard-columns";
import { DataTable } from "../components/table/data-table";

async function getDashboardData(): Promise<DashboardData[]> {
  return [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      status: "New",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      status: "Contacted",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      status: "Qualified",
    },
  ];
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData[]>([]);

  useEffect(() => {
    getDashboardData().then(setData);
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <DataTable columns={dashboardColumns} data={data} />
    </div>
  );
}
