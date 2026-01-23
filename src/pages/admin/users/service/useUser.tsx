import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../../shared/api";

export const users = "users";

interface GetUsersParams {
  page: number;
  limit: number;
  search?: string;
}

export const useUsers = () => {
  const client = useQueryClient();

  const getAllUsers = ({ page, limit, search }: GetUsersParams) =>
    useQuery({
      queryKey: [users, page, limit, search],
      queryFn: () =>
        api
          .get(`user/all`, {
            params: {
              page,
              limit,
              ...(search && { search }),
            },
          })
          .then((res) => res.data),
    });

  const getByIdUsers = ({ id }: any) =>
    useQuery({
      queryKey: [users, 'detail', id],
      queryFn: () => api.get(`user/${id}`).then((res) => res.data),
      enabled: !!id,
    });

  const getByUserIdBooking = ({ id }: any) =>
    useQuery({
      queryKey: [users,, 'bookings', id],
      queryFn: () => api.get(`booking/user-bookings/${id}`).then((res) => res.data),
      // enabled: !!id,
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
    getByUserIdBooking,
  };
};
