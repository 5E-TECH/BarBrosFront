import { useQuery } from "@tanstack/react-query"
import { api } from "../../../../shared/api";

export const barbershop = "barbershop"

export const useBarberShop = () => {

    const getBarbershops = () =>
    useQuery({
      queryKey: [barbershop],
      queryFn: () =>
        api.get("barber-shop").then((res) => res.data),
      // staleTime: 1000 * 60 * 60 * 24,
      // refetchOnWindowFocus: false,
    });

    return {
        getBarbershops
    }
}
