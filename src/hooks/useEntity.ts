import useSWR from "swr"
import { fetcher } from "../api"
import { EntityMap } from "../types/Entity"
import { ApiResponse } from "../types/ApiResponse"

export const useEntity = <T extends keyof EntityMap>(
  entityType: T,
  id: string | undefined
) => {
  const { data, error, isLoading } = useSWR<ApiResponse<EntityMap[T]>>(
    id ? `/${entityType}/${id}` : null,
    fetcher<ApiResponse<EntityMap[T]>>
  )

  return {
    data: data?.data,
    error,
    isLoading,
  }
}
