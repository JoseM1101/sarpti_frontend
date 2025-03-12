import FilterCard from "./FilterCard"
import { useAreas } from "../../hooks/useAreas"

const AreasFilter: React.FC = () => {
  const { areas } = useAreas()

  return (
    <FilterCard className="h-72 overflow-y-scroll overflow-x-hidden">
      {areas.map((area) => {
        return (
          <p
            key={area.id}
            className="text-gray-3 font-semibold text-lg cursor-pointer"
          >
            {area.titulo}
          </p>
        )
      })}
    </FilterCard>
  )
}

export default AreasFilter
