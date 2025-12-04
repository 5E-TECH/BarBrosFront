import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "../../../shared/api";

export const login = "login"

export const useLogin = () => {
    const client = useQueryClient();

    const loginUser = useMutation({
        mutationFn: (data: any) => api.post("admin/signin", data),
        onSuccess: () => client.invalidateQueries({queryKey: [login]})
    })

    return {
        loginUser
    }
}