import { useEffect, useState } from "react";
import {
  technologyColumns,
  type TechnologyData,
} from "../components/table/technology-columns";
import { DataTable } from "../components/table/data-table";

function getTechnologyData(): Promise<TechnologyData[]> {
  return Promise.resolve([
    {
      id: "1",
      name: "React",
      category: "Frontend",
      version: "18.2.0",
    },
    {
      id: "2",
      name: "Node.js",
      category: "Backend",
      version: "20.10.0",
    },
    {
      id: "3",
      name: "Prisma",
      category: "Database",
      version: "5.7.1",
    },
  ]);
}

export default function Technology() {
  const [data, setData] = useState<TechnologyData[]>([]);

  useEffect(() => {
    getTechnologyData().then(setData);
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Technologies</h1>
      <DataTable columns={technologyColumns} data={data} />
    </div>
  );
}
