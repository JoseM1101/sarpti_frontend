import { useState, ChangeEvent, useEffect, useMemo, useRef } from "react"
import { twMerge } from "tailwind-merge"
import { useFilterContext } from "./context/useFilterContext"
import { debounce } from "../../utils"

interface SearchBarProps {
  className?: string
  onSearch: (filterQuery: string[]) => void
  filterKey?: string // **New prop to define the filter field (default: "titulo")**
}

const SearchBar = ({
  onSearch,
  className,
  filterKey = "titulo",
}: SearchBarProps) => {
  const [query, setQuery] = useState<string>("")
  const { setFilterQuery, resetTrigger, setIsBeingFiltered } =
    useFilterContext()
  const debouncedSearch = useMemo(() => debounce(onSearch, 500), [onSearch])
  const hasBeenFiltered = useRef(false)

  useEffect(() => {
    setQuery("")
  }, [resetTrigger])

  useEffect(() => {
    if (query !== "") {
      setIsBeingFiltered(true)
      hasBeenFiltered.current = true
    }
  }, [query, setIsBeingFiltered])

  useEffect(() => {
    setFilterQuery((prevQuery) => {
      // **Remove any previous instances of this filter field**
      const updatedQuery = prevQuery.filter(
        (q) => !q.startsWith(`${filterKey}=`)
      )

      if (query.trim()) {
        updatedQuery.push(`${filterKey}=${query}`)
      }

      debouncedSearch(updatedQuery)

      return updatedQuery
    })
  }, [query, filterKey, setFilterQuery, debouncedSearch])

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <div
      className={twMerge(
        "px-4 py-2 border-2 border-gray-2 rounded-3xl flex items-center gap-2",
        className
      )}
    >
      {/* **Search Input** */}
      <input
        type="text"
        value={query}
        onChange={handleQueryChange}
        placeholder="Buscar..."
        className="text-lg focus:outline-none w-full"
      />
    </div>
  )
}

export default SearchBar
