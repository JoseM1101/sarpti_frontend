import { useState, ChangeEvent } from "react"
import { twMerge } from "tailwind-merge"

interface SearchBarProps {
  onSearch: (query: string) => void
  className?: string
}

const SearchBar = ({ onSearch, className }: SearchBarProps) => {
  const [query, setQuery] = useState<string>("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    onSearch(value)
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
