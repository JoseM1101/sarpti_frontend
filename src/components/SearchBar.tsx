import { useState, ChangeEvent } from "react"
import { twMerge } from "tailwind-merge"

interface SearchBarProps<T> {
  data: T[]
  onSearch: (filteredData: T[], query: string) => void
  getLabel: (item: T) => string
  className?: string
}

const SearchBar = <T,>({
  data,
  onSearch,
  getLabel,
  className,
}: SearchBarProps<T>) => {
  const [query, setQuery] = useState<string>("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    const filteredData = data.filter((item) =>
      getLabel(item).toLowerCase().includes(value.toLowerCase())
    )

    onSearch(filteredData, value)
  }

  return (
    <div
      className={twMerge(
        "px-4 py-2 border-2 border-zinc-400 rounded-3xl gap-2",
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
