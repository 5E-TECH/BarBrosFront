import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../../shared/api";

export const users = "users";

interface GetUsersParams {
  page: number;
  limit: number;
}

export const useUsers = () => {
  const client = useQueryClient();

  const getAllUsers = ({ page, limit }: GetUsersParams) =>
    useQuery({
      queryKey: [users, page, limit],
      queryFn: () =>
        api.get(`user/all`).then((res) => res.data),
    });

  const getByIdUsers = ({ id }: any) =>
    useQuery({
      queryKey: [users, id],
      queryFn: () => api.get(`user/${id}`).then((res) => res.data),
      enabled: !!id,
    });

  const updateUsers = useMutation({
    mutationFn: ({ id, data }: { id: string | undefined; data: any }) =>
      api.patch(`user/${id}`, data),
    onSuccess: () => client.invalidateQueries({ queryKey: [users] }),
  });

  return {
    getAllUsers,
    getByIdUsers,
    updateUsers,
  };
};
