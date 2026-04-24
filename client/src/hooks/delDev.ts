import { deleteDeveloper } from "@/services/devService";

export const useDeleteDeveloper = () => {
  const deleteDev = async (id: string) => {
    await deleteDeveloper(id);
  };

  return { deleteDev };
};
