import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../../shared/api";

export const category = "category";

export const useCategory = () => {
  const client = useQueryClient();

  const createCategory = useMutation({
    mutationFn: (data: any) => api.post("category/create", data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [category] });
    },
  });

  const getCategory = useQuery({
    queryKey: [category],
    queryFn: () => api.get("category/getAll").then((res) => res.data),
  });

  return { createCategory, getCategory };
};
