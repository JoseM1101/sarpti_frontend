import { createContext, Dispatch, SetStateAction } from "react"

interface FilterContextType {
  filterQuery: string[]
  setFilterQuery: Dispatch<SetStateAction<string[]>>
}

export const FilterContext = createContext<FilterContextType>({
  filterQuery: [],
  setFilterQuery: () => {},
})
