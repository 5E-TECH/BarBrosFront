import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../shared/api";


export const stattistic = "stattistic";

const useStatistic = () => {
    const getStatistic = () => useQuery({
        queryKey: [stattistic],
        queryFn: () => api.get(`/transactions`).then((res) => res.data),
    })
    const getStatisticMyShop = () => useQuery({
        queryKey: [stattistic],
        queryFn: () => api.get(`/transactions/my-shop`).then((res) => res.data),
    })

    return {getStatistic, getStatisticMyShop};
}


export default useStatistic;