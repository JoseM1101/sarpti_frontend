import { createPortal } from "react-dom"
import { useEffect, useState } from "react"
import { useFilterContext } from "./context/useFilterContext"
import Button from "../common/Button"
import FilterCard from "./FilterCard"
import StatusFilter from "./StatusFilter"
import AreasFilter from "./AreasFilter"
import ProjectsFilter from "./ProjectsFilter"
import DateFilter from "./DateFilter"
import InversionFilter from "./InversionFilter"

const filters = [
  { label: "Fecha", component: <DateFilter /> },
  { label: "Estatus", component: <StatusFilter /> },
  { label: "Palabra Clave", component: null },
  { label: "Autor", component: null },
  { label: "Tutor", component: null },
  { label: "Proyecto", component: <ProjectsFilter /> },
  { label: "Area Tematica", component: <AreasFilter /> },
  { label: "Inversion", component: <InversionFilter /> },
]

interface FilterProps {
  updateFn: (query: string[]) => void
}

function Filters({ updateFn }: FilterProps) {
  const { filterQuery, setFilterQuery } = useFilterContext()
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Toggle filter selection
  const handleFilterClick = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    )
  }

  // Get label for the top bar
  const getFilterLabel = () => {
    if (selectedFilters.length === 0) return "Filtrar"
    if (selectedFilters.length === 1) return `Filtrar: ${selectedFilters[0]}`
    return "Filtrar: Mixto"
  }

  // Handle search button click
  const handleSearch = () => {
    setFilterQuery([])
    updateFn(filterQuery)
    setIsOpen(false)
  }

  // Hide selected filters when the filter menu is closed
  useEffect(() => {
    if (!isOpen) {
      setSelectedFilters([]) // Clear filters when menu closes
    }
  }, [isOpen])

  return (
    <div className="relative z-10 flex flex-wrap gap-4 items-start">
      {/* Toggle filter menu */}
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
              <Button onClick={handleSearch}>Buscar</Button>
            </FilterCard>
          )}

          {/* Display selected filters only if menu is open */}
          {isOpen && (
            <div className="flex flex-wrap gap-2 items-start">
              {selectedFilters.map((label) => {
                const filter = filters.find((f) => f.label === label)
                return filter?.component ? (
                  <div className="w-60" key={label}>
                    {filter.component}
                  </div>
                ) : null
              })}
            </div>
          )}
        </div>,
        document.body
      )}
    </div>
  )
}

export default Filters
