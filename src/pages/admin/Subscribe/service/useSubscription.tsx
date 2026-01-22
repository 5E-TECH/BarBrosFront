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

  const getSubscriptionById = (id:any) =>
    useQuery({
      queryKey: [subscription, id],
      queryFn: () => api.get(`/subscription/by-plan/${id}`).then((res) => res.data),
    });

  const createSubscription = useMutation({
    mutationFn: (data: any) => api.post("/subscription/plans", data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [subscription] });
    },
  });

  const updateSubscription = useMutation({
      mutationFn: ({ id, data }: { id: any; data: any }) =>
        api.patch(`subscription/plans/${id}`, data),
      onSuccess: () => client.invalidateQueries({ queryKey: [subscription] }),
    });

  return { getAllSubscription, createSubscription, getSubscriptionById, updateSubscription };
};
