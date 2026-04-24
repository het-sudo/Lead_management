import axiosInstance from "@/lib/axiosinstance";
import type { DeveloperInput, UpdateDeveloperInput } from "@/types/developer";

export const getDeveloper = async (limit: number, page: number) => {
  const response = await axiosInstance.get(`developer/`, {
    params: { limit, page },
  });
  return response.data;
};

export const createDeveloper = async (data: DeveloperInput) => {
  const response = await axiosInstance.post(`developer/`, data);
  return response.data;
};

export const deleteDeveloper = async (id: string) => {
  const response = await axiosInstance.delete(`developer/${id}`);
  return response.data;
};

export const updateDeveloper = async (
  id: string,
  data: UpdateDeveloperInput,
) => {
  const response = await axiosInstance.patch(`developer/${id}`, data);
  return response.data;
};
