import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../shared/api";

const booking = "booking";

export const useBooking = () => {
  const getAllBookings = () =>
    useQuery({
      queryKey: [booking],
      queryFn: () => api.get("/booking/All").then((res) => res.data),
    });

  return { getAllBookings };
};
