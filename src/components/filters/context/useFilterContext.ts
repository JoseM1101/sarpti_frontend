import { useContext } from "react"
import { FilterContext } from "./FilterContext"

export function useFilterContext() {
  return useContext(FilterContext)
}
