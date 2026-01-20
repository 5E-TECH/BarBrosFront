import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../shared/api";

const bookingKey = "booking";

export const useBooking = () => {
  const getAllBookings = (page: number, pageSize: number) =>
    useQuery({
      queryKey: [bookingKey, "all", page, pageSize],
      queryFn: () =>
        api
          .get("/booking/All", {
            params: { page, limit: pageSize },
          })
          .then((res) => res.data),
    });

  const getByIdBooking = (id: string | undefined) =>
    useQuery({
      queryKey: [bookingKey, "detail", id],
      queryFn: () =>
        api.get(`/booking/User_booking/${id}`).then((res) => res.data),
      enabled: !!id,
    });

  return { getAllBookings, getByIdBooking };
};
