import { useState } from "react";
import { createDeveloper } from "@/services/devService";
import type { DeveloperInput } from "@/types/developer";

export const useCreateDeveloper = () => {
  const [loading, setLoading] = useState(false);

  const addDeveloper = async (data: DeveloperInput) => {
    try {
      setLoading(true);
      await createDeveloper(data);
    } finally {
      setLoading(false);
    }
  };

  return { addDeveloper, loading };
};
