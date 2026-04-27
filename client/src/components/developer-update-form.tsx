import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  developerSchema,
  type Developer,
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
  developer_tech: Developer | null;
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
    resolver: zodResolver(developerSchema),
    defaultValues: {
      developer_name: "",
      position: "",
      beforeJoinExpYear: undefined,
      beforeJoinExpMonth: undefined,
      salary: undefined,
      tech_ids: [],
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = form;

  const selectedTechs = watch("tech_ids") || [];

  useEffect(() => {
    if (!developer) return;

    reset({
      developer_name: developer.developer_name || "",
      position: developer.position || "",
      beforeJoinExpYear: developer.beforeJoinExpYear,
      beforeJoinExpMonth: developer.beforeJoinExpMonth,
      salary: developer.salary ? Number(developer.salary) : undefined,
    });
  }, [developer, reset]);

  const handleTechChange = (id: string, checked: boolean) => {
    if (checked) {
      setValue("tech_ids", [...selectedTechs, id]);
    } else {
      setValue(
        "tech_ids",
        selectedTechs.filter((t) => t !== id),
      );
    }
  };

  const onSubmit: SubmitHandler<UpdateDeveloperInput> = async (data) => {
    if (!developer?.id) return;

    await updateDeveloper(developer.id, data);

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
            </div>

            <div>
              <Label>Months</Label>
              <Input
                type="number"
                {...register("beforeJoinExpMonth", {
                  valueAsNumber: true,
                })}
              />
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
