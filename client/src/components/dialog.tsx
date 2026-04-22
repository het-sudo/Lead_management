import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export function DialogDemo({ onSuccess }: { onSuccess: () => void }) {
  const [category, setCategory] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", category: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  // fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/technology/categories",
      );
      setCategory(res.data.data || []);
    } catch {
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.category) {
      return setError("Please fill in all fields");
    }

    try {
      setIsSubmitting(true);
      setError("");

      await axios.post("http://localhost:8080/api/v1/technology/", form);

      setForm({ name: "", category: "" });

      setOpen(false);

      onSuccess();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to save");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <p className="p-4">Loading...</p>;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Add Technology
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Your Technology</DialogTitle>
            <DialogDescription>Select category and add tech</DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. React JS"
              />
            </Field>

            <Field>
              <Label>Category</Label>
              <NativeSelect
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="">Select a category</option>
                {category.map((cat) => (
                  <NativeSelectOption key={cat} value={cat}>
                    {cat}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </Field>
          </FieldGroup>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
