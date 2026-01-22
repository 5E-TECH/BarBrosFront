import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../../shared/api";

export const subscription = "barber";

export const useSubscription = () => {
  const client = useQueryClient();

  const getAllSubscription = () =>
    useQuery({
      queryKey: [subscription],
      queryFn: () => api.get("/subscription/plans").then((res) => res.data),
    });

  const createSubscription = useMutation({
    mutationFn: (data: any) => api.post("/subscription/plans", data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [subscription] });
    },
  });

  return { getAllSubscription, createSubscription };
};
