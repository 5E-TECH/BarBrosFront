import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../../shared/api";

export const service = "service";


export const useService = () => {
  const queryClient = useQueryClient();

  const createService = useMutation({
    mutationKey: ["service-create"],
    mutationFn: (data: {
      name: string;
      description: string;
      duration_minutes: number;
      category_id: number;
    }) => api.post("/service", data).then((res) => res.data),
  });

  const uploadServiceImage = useMutation({
    mutationKey: ["service-image"],
    mutationFn: (formData: FormData) =>
      api.post("/service-image", formData).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });

  const getServiceByCategory = (id: any) =>
    useQuery({
      queryKey: [service, id],
      queryFn: () =>
        api.get(`/service/by-category/${id}`).then((res) => res.data),
      enabled: !!id,
    });
  return {
    createService,
    uploadServiceImage,
    getServiceByCategory
  };
};
