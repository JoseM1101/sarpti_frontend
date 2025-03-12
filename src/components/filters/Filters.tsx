import { useFilterContext } from "./context/useFilterContext"
import Button from "../common/Button"
import FilterCard from "./FilterCard"
// import SearchFilter from "./SearchFilter"
import StatusFilter from "./StatusFilter"
import AreasFilter from "./AreasFilter"
import ProjectsFilter from "./ProjectsFilter"
import DateFilter from "./DateFilter"
import InversionFilter from "./InversionFilter"

const filters = [
  "Fecha",
  "Palabra Clave",
  "Estatus",
  "Autor",
  "Tutor",
  "Proyecto",
  "Area Tematica",
  "Inversion",
]
interface FilterProps {
  updateFn: (query: string[]) => void
}

function Filters({ updateFn }: FilterProps) {
  const { filterQuery } = useFilterContext()

  return (
    <div className="relative z-10">
      <p className="font-semibold text-gray-3 text-xl cursor-pointer">
        Filtrar
      </p>
      <div className="flex gap-2 items-start absolute top-10 left-0">
        <FilterCard className="w-56">
          {filters.map((filter, index) => (
            <p key={index} className="font-semibold text-gray-3 text-lg">
              {filter}
            </p>
          ))}
          <Button onClick={() => updateFn(filterQuery)}>Buscar</Button>
        </FilterCard>
        <div className="grid gap-2">
          <StatusFilter />
          {/* <SearchFilter endpoint="/proyectos" /> */}
          {/* <SearchFilter endpoint="/areas" />
          <SearchFilter endpoint="/personas" /> */}
          <DateFilter />
          <AreasFilter />
          <InversionFilter />
          <ProjectsFilter />
        </div>
      </div>
    </div>
  )
}

export default Filters
