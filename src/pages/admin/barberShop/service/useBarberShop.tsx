import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../../shared/api";

export const barbershop = "barbershop";

export const useBarberShop = () => {
  const client = useQueryClient();

  const getBarbershops = () =>
    useQuery({
      queryKey: [barbershop],
      queryFn: () => api.get("barber-shop").then((res) => res.data),
      // staleTime: 1000 * 60 * 60 * 24,
      // refetchOnWindowFocus: false,
    });

  const getByIdBarbershop = ({ id }: { id: any }) =>
    useQuery({
      queryKey: [barbershop, id],
      queryFn: () => api.get(`barber-shop/${id}`).then((res) => res.data),
    });

  const updateBarbershop = useMutation({
    mutationFn: ({ id, data }: { id: any; data: any }) =>
      api.patch(`barber-shop/${id}`, data),
    onSuccess: () => client.invalidateQueries({ queryKey: [barbershop] }),
  });

  const updateStatusBarbershop = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      api.patch(`barber-shop/status/${id}`, { status }),
    onSuccess: () => client.invalidateQueries({ queryKey: [barbershop] }),
  });

  const deleteBarberShop = useMutation({
    mutationFn: ({ id }: { id: any }) => api.delete(`barber-shop/${id}`),
    onSuccess: () => client.invalidateQueries({ queryKey: [barbershop] }),
  });

  return {
    getBarbershops,
    getByIdBarbershop,
    updateBarbershop,
    updateStatusBarbershop,
    deleteBarberShop,
  };
};
