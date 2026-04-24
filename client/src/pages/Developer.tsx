import { useState } from "react";

import { Field, FieldLabel } from "@/components/ui/field";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/table/data-table";
import { useDevelopers } from "@/hooks/getDev";
import { developerColumns } from "@/components/table/developer-columns";

export default function Developer() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);

  const { data, totalPages } = useDevelopers(page, limit);

  return (
    <div>
      <DataTable columns={developerColumns} data={data} />

      <div className="flex items-center justify-between gap-4">
        {/* LIMIT */}
        <Field orientation="horizontal" className="w-fit">
          <FieldLabel>Rows per page</FieldLabel>

          <Select
            value={String(limit)}
            onValueChange={(value) => {
              setLimit(Number(value));
              setPage(1);
            }}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        {/* PAGINATION */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            <PaginationItem>
              <span className="px-3 text-sm">
                Page {page} of {totalPages}
              </span>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                className={
                  page === totalPages ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
