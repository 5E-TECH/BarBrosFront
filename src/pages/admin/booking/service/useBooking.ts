import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../shared/api";

const bookingKey = "booking";

export const useBooking = () => {
 const getAllBookings = (params: { page: number; limit: number }, search: string) =>
    useQuery({
      // queryKeyga params.page va params.limitni alohida yozish ishonchliroq
      queryKey: [bookingKey, params.page, params.limit, search],
      queryFn: () =>
        api
          .get("/booking/All", { 
            params: { 
              page: params.page, 
              limit: params.limit, 
              search 
            } 
          })
          .then((res) => res.data),
      placeholderData: (previousData) => previousData, // Input qotib qolmasligi uchun
    });

  const getByIdBooking = (id: any) =>
    useQuery({
      queryKey: [bookingKey, "detail", id],
      queryFn: () => api.get(`/booking/admin/${id}`).then((res) => res.data),
      enabled: !!id,
    });

  return { getAllBookings, getByIdBooking };
};
