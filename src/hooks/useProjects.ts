import useSWR from "swr"
import { fetcher } from "../api"
import { ApiResponse } from "../types/ApiResponse"
import { Project } from "../types/Project"

export const useProjects = () => {
  const { data, error, isLoading } = useSWR<ApiResponse<Project>>(
    "/investigaciones",
    fetcher<ApiResponse<Project>>
  )

  return {
    projects: data?.data.list || [],
    error,
    isLoading,
  }
}
