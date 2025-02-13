import useSWR from "swr"
import { fetcher } from "../api"
import { Investigation } from "@/types/Investigation"

export const useInvestigation = (id: string | undefined) => {
  const { data, error, isLoading } = useSWR<Investigation>(
    id ? `/investigaciones/${id}` : null,
    fetcher<Investigation>
  )

  return {
    investigation: data,
    error,
    isLoading,
  }
}
