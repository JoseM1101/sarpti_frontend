import { createPortal } from "react-dom"
import { useEffect, useState } from "react"
import { useFilterContext } from "./context/useFilterContext"
import Button from "../common/Button"
import FilterCard from "./FilterCard"

interface FilterItem {
  label: string
  component: JSX.Element
}

interface FilterProps {
  updateFn: (query: string[]) => void
  filters: FilterItem[]
}

function Filters({ updateFn, filters }: FilterProps) {
  const { filterQuery, clearFilters, hasFilters, setIsBeingFiltered } =
    useFilterContext()
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const handleFilterClick = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    )
  }

  const getFilterLabel = () => {
    if (selectedFilters.length === 0) return "Filtrar"
    if (selectedFilters.length === 1) return `Filtrar: ${selectedFilters[0]}`
    return "Filtrar: Mixto"
  }

  const handleSearch = () => {
    updateFn(filterQuery)
    setIsOpen(false)
    setIsBeingFiltered(true)
  }

  useEffect(() => {
    if (!isOpen) {
      setSelectedFilters([])
    }
  }, [isOpen])

  return (
    <div className="relative z-10 flex flex-wrap gap-4 items-start">
      <p
        className="font-semibold text-gray-3 text-xl cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {getFilterLabel()}
      </p>

      {createPortal(
        <div className="flex gap-4 absolute top-16 right-0 items-start w-8/12 px-3">
          {isOpen && (
            <FilterCard className="w-56 min-w-[14rem]">
              {filters.map(({ label }) => (
                <p
                  key={label}
                  className={`font-semibold text-gray-3 text-lg cursor-pointer ${
                    selectedFilters.includes(label) ? "text-lightblue" : ""
                  }`}
                  onClick={() => handleFilterClick(label)}
                >
                  {label}
                </p>
              ))}
              <div className="flex flex-col justify-start gap-2 items-center">
                <Button className="w-full" onClick={handleSearch}>
                  Buscar
                </Button>
                {hasFilters && (
                  <span
                    onClick={clearFilters}
                    className="text-sm text-red cursor-pointer"
                  >
                    Limpiar Filtros
                  </span>
                )}
              </div>
            </FilterCard>
          )}

          <div className="flex flex-wrap gap-2 items-start">
            {filters.map(({ label, component }) => (
              <div
                key={label}
                className={`w-60 transition-opacity ${
                  selectedFilters.includes(label) ? "block" : "hidden"
                }`}
              >
                {component}
              </div>
            ))}
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

export default Filters
