import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../../shared/api";

export const users = "users";
export type SortOrder = "asc" | "desc";
export type SortBy = "full_name" | "phone_number" | "ordersCount";

interface GetUsersParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: SortBy;
  order?: SortOrder;
}

export const useUsers = () => {
  const client = useQueryClient();

  const getAllUsers = ({ page, limit, search, sortBy, order }: GetUsersParams) =>
    useQuery({
      queryKey: [users, page, limit, search, sortBy,
        order,],
      queryFn: () =>
        api.get(`user/all`, {
          params: {
            page,
            limit,
            ...(search && { search }),
            ...(sortBy && { sortBy }),
            ...(order && { order }),
          }
        }).then((res) => res.data),
    });

  const getByIdUsers = ({ id }: any) =>
    useQuery({
      queryKey: [users, id],
      queryFn: () => api.get(`user/${id}`).then((res) => res.data),
      enabled: !!id,
    });

  const getByUserIdBooking = ({ id }: any) =>
    useQuery({
      queryKey: [users, id],
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
