import { useEffect, useState } from "react";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  updateDeveloperSchema,
  type UpdateDeveloperInput,
} from "@/types/developer";

import { useTechnologies } from "@/hooks/useTechnologoies";
import { updateDeveloper } from "@/services/devService";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CreateTechInput } from "@/types/technology";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  developer: UpdateDeveloperInput | null;
  onSuccess?: () => void;
};

export function UpdateForm({
  open,
  onOpenChange,
  developer,
  onSuccess,
}: Props) {
  const [search, setSearch] = useState("");

  const { data: techs = [], loading: techLoading } = useTechnologies(
    search,
  ) as {
    data: CreateTechInput[];
    loading: boolean;
  };

  const form = useForm<UpdateDeveloperInput>({
    resolver: zodResolver(updateDeveloperSchema),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = form;
  const status = watch("status");

  useEffect(() => {
    if (status === "Active") {
      setValue("relivingDate", null);
    }
  }, [status, setValue]);

  const selectedTechs =
    useWatch({
      control: form.control,
      name: "tech_ids",
    }) || [];

  useEffect(() => {
    if (open && developer) {
      reset();
    }
  }, [open, developer]);

  const formatDate = (date?: string | Date | null) => {
    if (!date) return "";

    const d = new Date(date);

    if (isNaN(d.getTime())) return "";

    return d.toISOString().split("T")[0];
  };
  useEffect(() => {
    if (!developer) {
      reset();
      return;
    }

    const technologies = developer as UpdateDeveloperInput;

    let techIds = developer.tech_ids || [];
    if (!techIds.length && technologies.tech_skills) {
      techIds = technologies.tech_skills
        .map((skill) => skill.technology?.id || "")
        .filter(Boolean);
    }

    reset({
      position: developer.position,
      status: developer.status,
      beforeJoinExpYear: developer.beforeJoinExpYear,
      beforeJoinExpMonth: developer.beforeJoinExpMonth,
      salary: developer.salary,
      relivingDate: formatDate(developer.relivingDate),
      tech_ids: techIds,
    });
  }, [developer, reset]);

  const handleTechChange = (id: string, checked: boolean) => {
    const current = selectedTechs || [];

    if (checked) {
      if (!current.includes(id)) {
        setValue("tech_ids", [...current, id], {
          shouldValidate: true,
        });
      }
    } else {
      setValue(
        "tech_ids",
        current.filter((t) => t !== id),
        { shouldValidate: true },
      );
    }
  };

  const onSubmit: SubmitHandler<UpdateDeveloperInput> = async (data) => {
    if (!developer?.id) return;

    await updateDeveloper(developer.id, data);
    // console.log(developer.tech_ids, developer.tech_skills);
    onSuccess?.();
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lvh">
        <DialogHeader>
          <DialogTitle>Update Developer</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* POSITION */}
          <div>
            <Label>Position</Label>
            <Input {...register("position")} />
            {errors.position && (
              <p className="text-sm text-red-500">{errors.position.message}</p>
            )}
          </div>

          {/* STATUS */}
          <div>
            <Label>Status</Label>
            <select
              {...register("status")}
              className="w-full border rounded px-2 py-2"
            >
              <option value="Active">Active</option>
              <option value="InActive">Inactive</option>
              <option value="OnLeave">On Leave</option>
            </select>
            {errors.status && (
              <p className="text-sm text-red-500">{errors.status.message}</p>
            )}
          </div>

          {/* EXPERIENCE */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Years</Label>
              <Input
                type="number"
                {...register("beforeJoinExpYear", {
                  valueAsNumber: true,
                })}
              />
              {errors.beforeJoinExpYear && (
                <p className="text-sm text-red-500">
                  {errors.beforeJoinExpYear.message}
                </p>
              )}
            </div>

            <div>
              <Label>Months</Label>
              <Input
                type="number"
                {...register("beforeJoinExpMonth", {
                  valueAsNumber: true,
                })}
              />
              {errors.beforeJoinExpMonth && (
                <p className="text-sm text-red-500">
                  {errors.beforeJoinExpMonth.message}
                </p>
              )}
            </div>
          </div>

          {/* SALARY */}
          <div>
            <Label>Salary</Label>
            <Input
              type="number"
              {...register("salary", {
                valueAsNumber: true,
              })}
            />
            {errors.salary && (
              <p className="text-sm text-red-500">{errors.salary.message}</p>
            )}
          </div>

          {/* RELIEVING DATE */}
          <div>
            <Label>Relieving Date</Label>
            <Input
              type="date"
              {...register("relivingDate", {
                setValueAs: (value) => {
                  if (value === "") return null;
                  return value;
                },
              })}
            />
            {errors.relivingDate && (
              <p className="text-sm text-red-500">
                {errors.relivingDate.message}
              </p>
            )}
          </div>

          {/* TECHNOLOGIES */}
          <div>
            <Label>Technologies</Label>

            <Input
              placeholder="Search technologies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="border p-2 mt-2 max-h-40 overflow-y-auto rounded">
              {techLoading ? (
                <p className="text-sm text-gray-500">Loading...</p>
              ) : (
                techs.map((tech) => (
                  <label key={tech.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedTechs.includes(tech.id)}
                      onChange={(e) =>
                        handleTechChange(tech.id, e.target.checked)
                      }
                    />
                    {tech.name}
                  </label>
                ))
              )}
            </div>

            {errors.tech_ids && (
              <p className="text-sm text-red-500">{errors.tech_ids.message}</p>
            )}
          </div>

          {/* BUTTON */}
          <div className="flex justify-end">
            <Button type="submit">Update Developer</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
