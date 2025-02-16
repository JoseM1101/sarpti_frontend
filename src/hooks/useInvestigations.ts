import useSWR from "swr"
import { fetcher } from "../api"
import { ApiResponse } from "../types/ApiResponse"
import { Investigation } from "../types/Investigation"

export const useInvestigations = () => {
  const { data, error, isLoading } = useSWR<ApiResponse<Investigation>>(
    "/investigaciones",
    fetcher<ApiResponse<Investigation>>
  )

  return {
    investigations: data?.data.list || [],
    error,
    isLoading,
  }
}
