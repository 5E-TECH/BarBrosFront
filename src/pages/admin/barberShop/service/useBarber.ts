import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../../shared/api";

export const barber = "barber";

export const useBarber = () => {
  const client = useQueryClient();

  const getAllBarbers = () =>
    useQuery({
      queryKey: [barber],
      queryFn: () => api.get("/barber/all").then((res) => res.data),
    });

  const getBarberById = (id: any) =>
    useQuery({
      queryKey: [barber, id],
      queryFn: () => api.get(`/barber/${id}`).then((res) => res.data),
    });

  const getBarberShopBarbers = (id: any) =>
    useQuery({
      queryKey: [barber, id],
      queryFn: () =>
        api.get(`/barber/barbershop/${id}`).then((res) => res.data),
      enabled: !!id,
    });

  const updateBarbershop = useMutation({
    mutationFn: ({ id, data }: { id: any; data: any }) =>
      api.patch(`barber/update/${id}`, data),
    onSuccess: () => client.invalidateQueries({ queryKey: [barber] }),
  });
  
  return { getAllBarbers, getBarberShopBarbers, getBarberById, updateBarbershop };
};
