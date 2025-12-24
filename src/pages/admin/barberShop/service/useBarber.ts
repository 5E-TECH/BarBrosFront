import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../shared/api";

export const barber = "barber";

export const useBarber = () => {
  const getAllBarbers = () =>
    useQuery({
      queryKey: [barber],
      queryFn: () => api.get("/barber/all").then((res) => res.data),
    });

  return { getAllBarbers };
};
