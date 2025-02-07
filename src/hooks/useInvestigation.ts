import useSWR from "swr"
import { fetcher } from "../api"
import { Entity } from "../types/Entity"

export const useInvestigation = (id: string | undefined) => {
  const { data, error, isLoading } = useSWR<Entity>(
    id ? `/investigaciones/${id}` : null,
    fetcher<Entity>
  )

  return {
    investigation: data,
    error,
    isLoading,
  }
}
