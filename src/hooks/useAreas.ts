import useSWR from "swr"
import { fetcher } from "../api"
import { ApiResponse } from "../types/ApiResponse"
import { Areas } from "../types/Areas"

export const useAreas = () => {
  const { data, error, isLoading } = useSWR<ApiResponse<Areas>>(
    "/areas",
    fetcher<ApiResponse<Areas>>
  )

  return {
    areas: data?.data.list || [],
    error,
    isLoading,
  }
}
