import React, { useState } from "react"
import { FilterContext } from "./FilterContext"

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filterQuery, setFilterQuery] = useState<string[]>([])
  const [resetTrigger, setResetTrigger] = useState<boolean>(false)
  const [isBeingFiltered, setIsBeingFiltered] = useState<boolean>(false)
  const hasFilters = filterQuery.length > 0

  const clearFilters = () => {
    setFilterQuery([])
    setResetTrigger((prev) => !prev)
    setIsBeingFiltered(false)
  }

  return (
    <FilterContext.Provider
      value={{
        filterQuery,
        setFilterQuery,
        hasFilters,
        resetTrigger,
        clearFilters,
        isBeingFiltered,
        setIsBeingFiltered,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
