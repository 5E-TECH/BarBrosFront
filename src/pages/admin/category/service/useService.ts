import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../shared/api";

const service = "service";

export const useService = () => {
  const getByIdService = (id: any) =>
    useQuery({
      queryKey: [service, id],
      queryFn: () => api.get(`/service/${id}`).then((res) => res.data),
      enabled: !!id,
    });

  return { getByIdService };
};
