import { useState, ChangeEvent, useEffect, useMemo, useRef } from "react"
import { twMerge } from "tailwind-merge"
import { useFilterContext } from "./context/useFilterContext"
import { debounce } from "../../utils"

interface SearchBarProps {
  className?: string
  onSearch: (filterQuery: string[]) => void
}

const SearchBar = ({ onSearch, className }: SearchBarProps) => {
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
      const updatedQuery = prevQuery.filter((q) => !q.startsWith("titulo="))

      if (query.trim()) {
        updatedQuery.push(`titulo=${query}`)
      }

      debouncedSearch(updatedQuery)

      return updatedQuery
    })
  }, [query, setFilterQuery, debouncedSearch])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <div
      className={twMerge(
        "px-4 py-2 border-2 border-gray-2 rounded-3xl gap-2",
        className
      )}
    >
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Buscar..."
        className="text-lg focus:outline-none"
      />
    </div>
  )
}

export default SearchBar
