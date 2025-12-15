import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../shared/api";

export const users = "users";

interface GetUsersParams {
  page: number;
  limit: number;
}

export const useUsers = () => {
  const getAllUsers = ({ page, limit }: GetUsersParams) =>
    useQuery({
      queryKey: [users, page, limit], 
      queryFn: () =>
        api
          .get(`user/all?page=${page}&limit=${limit}`)
          .then((res) => res.data),
    });

  return {
    getAllUsers,
  };
};
