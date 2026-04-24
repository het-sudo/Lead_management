import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Eye, Trash, ArrowUpDown, Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { GetDevelopersQuery } from "@/types/developer";

export const developerColumns: ColumnDef<GetDevelopersQuery>[] = [
  {
    accessorKey: "developer_name",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Developer Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "number",
    header: "Number",
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "beforeJoinExpYear",
    header: "EXP YEAR",
  },
  {
    accessorKey: "beforeJoinExpMonth",
    header: "EXP MONTHS",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "relivingDate",
    header: "RelivingDate",
  },
  {
    header: "Actions",
    id: "actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" /> View
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pen className="mr-2 h-4 w-4" /> Update
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
