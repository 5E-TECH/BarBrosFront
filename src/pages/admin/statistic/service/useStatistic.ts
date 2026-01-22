import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../shared/api";

export const stattistic = "stattistic";

const useStatistic = () => {
  const getAdminSummary = useQuery({
    queryKey: ["adminSummary"],
    queryFn: async () => {
      const res = await api.get("/admin/summary");
      return res.data.data;
    },
  });

  const getStatistic = () =>
    useQuery({
      queryKey: [stattistic],
      queryFn: () => api.get(`/transactions`).then((res) => res.data),
    });
  const getStatisticMyShop = () =>
    useQuery({
      queryKey: [stattistic],
      queryFn: () => api.get(`/transactions/my-shop`).then((res) => res.data),
    });

  return { getAdminSummary, getStatistic, getStatisticMyShop };
};

export default useStatistic;
