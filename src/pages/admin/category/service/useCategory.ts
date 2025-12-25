import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../../shared/api";

export const category = "category";

export const useCategory = () => {
  const client = useQueryClient();

  const createCategory = useMutation({
    mutationFn: (data: any) => api.post("/category/create", data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [category] });
    },
  });

  const getCategory = useQuery({
    queryKey: [category],
    queryFn: () => api.get("/category/getAll").then((res) => res.data),
  });

  const getCategoryMan = useQuery({
    queryKey: [category, "man"],
    queryFn: () => api.get("/category/getAll-man").then((res) => res.data),
  });

  const getCategoryWoman = useQuery({
    queryKey: [category, "woman"],
    queryFn: () => api.get("/category/getAll-woman").then((res) => res.data),
  });

  const updateCategory = useMutation({
    mutationFn: ({ id, data }: { id: any; data: any }) =>
      api.patch(`/category/update/${id}`, data),
    onSuccess: () => client.invalidateQueries({ queryKey: [category] }),
  });

  const deleteCategory = useMutation({
    mutationFn: ({ id }: { id: string | undefined; }) =>
      api.delete(`/category/${id}`),
    onSuccess: () => client.invalidateQueries({ queryKey: [category] }),
  });

  return { createCategory, getCategory, getCategoryMan, getCategoryWoman, updateCategory, deleteCategory };
};
