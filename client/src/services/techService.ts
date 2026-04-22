import axiosInstance from "@/lib/axiosinstance";
import type { CreateTechInput } from "@/types/technology";

export const getTechnologies = async (limit: number, page: number) => {
  const response = await axiosInstance.get(`/`, {
    params: { limit, page },
  });
  return response.data;
};

export const createTechnology = async (data: CreateTechInput) => {
  const response = await axiosInstance.post(`/`, data);
  return response.data;
};

export const deleteTechnology = async (id: string) => {
  const response = await axiosInstance.delete(`/${id}`);
  return response.data;
};
