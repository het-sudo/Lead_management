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
import { useDeleteDeveloper } from "@/hooks/delDev";
import { DeveloperForm } from "@/components/developer-form";
import { ViewDeveloperDialog } from "@/components/developer-view";
import type { DeveloperInput, UpdateDeveloperInput } from "@/types/developer";
import { UpdateForm } from "@/components/developer-update-form";

export default function Developer() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, totalPages, refetch } = useDevelopers(page, limit);
  const { deleteDev } = useDeleteDeveloper();

  const [viewOpen, setViewOpen] = useState(false);
  const [selectedDev, setSelectedDev] = useState<DeveloperInput | null>(null);

  const handleView = (dev: DeveloperInput) => {
    setSelectedDev(dev);
    setViewOpen(true);
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (!confirmed) return;
    await deleteDev(id);
    await refetch();
  };

  const [editOpen, setEditOpen] = useState(false);
  const [updateDev, setUpdateDev] = useState<UpdateDeveloperInput | null>(null);

  const handleEdit = async (id: string) => {
    const selected = data.find((d) => d.id === id) as
      | UpdateDeveloperInput
      | undefined;
    if (selected) {
      setUpdateDev(selected);
      setEditOpen(true);
      await refetch();
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Developer</h1>
      <br />
      <DeveloperForm onSuccess={refetch} />

      <br />
      <DataTable
        columns={developerColumns({
          onView: handleView,
          onDelete: handleDelete,
          OnUpdate: handleEdit,
        })}
        data={data}
      />
      <ViewDeveloperDialog
        open={viewOpen}
        onOpenChange={setViewOpen}
        developer={selectedDev}
      />
      <UpdateForm
        open={editOpen}
        onOpenChange={setEditOpen}
        developer={updateDev}
        onSuccess={refetch}
      />
      <div className="flex items-center justify-between gap-4">
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
