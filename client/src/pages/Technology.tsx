import { useEffect, useState } from "react";
import {
  technologyColumns,
  type TechnologyData,
} from "../components/table/technology-columns";
import { DataTable } from "../components/table/data-table";
import { DialogDemo } from "@/components/dialog";

async function getTechnologyData(): Promise<TechnologyData[]> {
  return [
    {
      id: "1",
      name: "React",
      category: "Frontend",
    },
    {
      id: "2",
      name: "Node.js",
      category: "Backend",
    },
    {
      id: "3",
      name: "Prisma",
      category: "Database",
    },
  ];
}

export default function Technology() {
  const [data, setData] = useState<TechnologyData[]>([]);

  useEffect(() => {
    getTechnologyData().then(setData);
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Technologies</h1>
      <DialogDemo />
      <DataTable columns={technologyColumns} data={data} />
    </div>
  );
}
