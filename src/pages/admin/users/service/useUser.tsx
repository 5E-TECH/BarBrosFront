import { useQuery } from "@tanstack/react-query"
import { api } from "../../../../shared/api";

export const users = "users"

export const useUsers = () => {

    const getAllUsers = () =>
    useQuery({
      queryKey: [users],
      queryFn: () =>
        api.get("user/all").then((res) => res.data),
    });

    return {
        getAllUsers
    }
}
