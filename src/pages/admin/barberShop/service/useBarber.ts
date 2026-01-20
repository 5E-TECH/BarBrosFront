import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../shared/api";

export const barber = "barber";

export const useBarber = () => {
  const getAllBarbers = () =>
    useQuery({
      queryKey: [barber],
      queryFn: () => api.get("/barber/all").then((res) => res.data),
    });

  const getBarberById = (id:number) =>
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

  return { getAllBarbers, getBarberShopBarbers, getBarberById };
};
