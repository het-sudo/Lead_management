import { updateDeveloper } from "@/services/devService";
import type { UpdateDeveloperInput } from "@/types/developer";

export const useDeleteDeveloper = () => {
  const updateDev = async (id: string, data: UpdateDeveloperInput) => {
    await updateDeveloper(id, data);
  };

  return { updateDev };
};
