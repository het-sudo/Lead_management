import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { developerSchema, type DeveloperInput } from "@/types/developer";
import { useCreateDeveloper } from "@/hooks/createDev";
import { useTechnologies } from "@/hooks/useTechnologoies";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Updateform({ onSuccess }: { onSuccess?: () => void }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data: techs, loading: techLoading } = useTechnologies(search);

  const { addDeveloper, loading: createLoading } = useCreateDeveloper();

  const form = useForm<DeveloperInput>({
    resolver: zodResolver(developerSchema),
    defaultValues: {
      developer_name: "",
      email: "",
      number: "",
      position: "",
      beforeJoinExpYear: undefined,
      beforeJoinExpMonth: undefined,
      joining_date: undefined,
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

  const onSubmit: SubmitHandler<DeveloperInput> = async (data) => {
    await addDeveloper(data);
    onSuccess?.();
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Developer</Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Add Developer</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* NAME */}
          <div>
            <Label>Name</Label>
            <Input {...register("developer_name")} />
            {errors.developer_name && (
              <p className="text-red-500 text-sm">
                {errors.developer_name.message}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <Label>Email</Label>
            <Input {...register("email")} />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Joining Date */}
          <Label>Joining Date</Label>

          <Input
            type="date"
            {...register("joining_date", {
              valueAsDate: true,
            })}
          />

          {/* status */}
          <Label>Status</Label>

          <Input
            {...register("status", {
              valueAsDate: true,
            })}
          />

          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status.message}</p>
          )}
          {/* PHONE */}
          <div>
            <Label>Phone</Label>
            <Input {...register("number")} />
            {errors.number && (
              <p className="text-red-500 text-sm">{errors.number.message}</p>
            )}
          </div>

          {/* POSITION */}
          <div>
            <Label>Position</Label>
            <Input {...register("position")} />
            {errors.position && (
              <p className="text-red-500 text-sm">{errors.position.message}</p>
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
                <p className="text-red-500 text-sm">
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
                <p className="text-red-500 text-sm">
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
              <p className="text-red-500 text-sm">{errors.salary.message}</p>
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
              ) : techs.length === 0 ? (
                <p className="text-sm text-gray-500">No results</p>
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

            {errors.tech_ids && <p className="text-red-500 text-sm"></p>}
          </div>

          {/* SUBMIT */}
          <Button type="submit" disabled={createLoading}>
            {createLoading ? "Saving..." : "Save Developer"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
