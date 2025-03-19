import { createContext, Dispatch, SetStateAction } from "react"

interface FilterContextType {
  filterQuery: string[]
  setFilterQuery: Dispatch<SetStateAction<string[]>>
  resetTrigger: boolean
  clearFilters: () => void
  hasFilters: boolean
  isBeingFiltered: boolean
  setIsBeingFiltered: Dispatch<SetStateAction<boolean>>
}

export const FilterContext = createContext<FilterContextType>({
  filterQuery: [],
  setFilterQuery: () => {},
  resetTrigger: false,
  clearFilters: () => {},
  hasFilters: false,
  isBeingFiltered: false,
  setIsBeingFiltered: () => {},
})
