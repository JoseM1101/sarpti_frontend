import useSWR from "swr"
import { fetcher } from "../api"
import { ApiResponse } from "../types/ApiResponse"
import { User } from "../types/User"

export const useUsers = () => {
  const { data, error, isLoading } = useSWR<ApiResponse<User>>(
    "/usuarios",
    fetcher<ApiResponse<User>>
  )

  return {
    users: data?.data.list || [],
    error,
    isLoading,
  }
}
