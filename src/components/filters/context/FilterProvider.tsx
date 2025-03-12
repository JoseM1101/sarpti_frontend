import React, { useState, useEffect } from "react"
import { FilterContext } from "./FilterContext"

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filterQuery, setFilterQuery] = useState<string[]>([])

  useEffect(() => {
    console.log(filterQuery)
  }, [filterQuery])

  return (
    <FilterContext.Provider value={{ filterQuery, setFilterQuery }}>
      {children}
    </FilterContext.Provider>
  )
}
