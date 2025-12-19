import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../../shared/api";

export const admin = "admins";

interface GetAdminsParam {
  page: number;
  limit: number;
}

export const useAdmins = () => {
  const client = useQueryClient();

  const createAdmin = useMutation({
    mutationFn: (data: any) => api.post("admin/create", data),
    onSuccess: () => {
        client.invalidateQueries({queryKey: [admin]})
    }
  })

  const getAllAdmins = ({ page, limit }: GetAdminsParam) =>
    useQuery({
      queryKey: [admin, page, limit],
      queryFn: () =>
        api.get(`admin/all?page=${page}&limit=${limit}`).then((res) => res.data),
    });

  const getByIdAdmin = ({ id }: any) =>
    useQuery({
      queryKey: [admin, id],
      queryFn: () => api.get(`admin/one/${id}`).then((res) => res.data),
      enabled: !!id,
    });

  const updateAdmin = useMutation({
    mutationFn: ({ id, data }: { id: string | undefined; data: any }) =>
      api.patch(`admin/update/${id}`, data),
    onSuccess: () => client.invalidateQueries({ queryKey: [admin] }),
  });

  return {
    createAdmin,
    getAllAdmins,
    getByIdAdmin,
    updateAdmin,
  };
};
