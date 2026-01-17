import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../shared/api";

export const service = "service";

export const useService = () => {
  const getAllServicesByBarbershop = (id:any) =>
    useQuery({
      queryKey: [service, id],
      queryFn: () => api.get(`/service/by-barber-shop/${id}`).then((res) => res.data),
    });

  const getBarberShopBarbers = (id: any) =>
    useQuery({
      queryKey: [service, id],
      queryFn: () =>
        api.get(`/barber/barbershop/${id}`).then((res) => res.data),
      enabled: !!id, 
    });

  return { getAllServicesByBarbershop, getBarberShopBarbers };
};
