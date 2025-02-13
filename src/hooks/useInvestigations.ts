import useSWR from "swr"
import { fetcher } from "../api"
import { EntityRequestResponse } from "../types/Entity"

export const useInvestigations = () => {
  const { data, error, isLoading } = useSWR<EntityRequestResponse>(
    "/investigaciones",
    fetcher<EntityRequestResponse>
  )

  return {
    investigations: data?.list || [],
    error,
    isLoading,
  }
}
