import { useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/api";

export const profile = "profile";

export const useProfile = () => {
  //   const client = useQueryClient();

  const getMyAccount = () =>
    useQuery({
      queryKey: [profile],
      queryFn: () => api.get("admin/my-account").then((res) => res.data),
    });

  return { getMyAccount };
};
