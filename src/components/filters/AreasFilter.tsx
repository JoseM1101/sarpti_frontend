import { useState, useEffect } from "react"
import FilterCard from "./FilterCard"
import { useAreas } from "../../hooks/useAreas"
import { useFilterContext } from "./context/useFilterContext"
import selectedIcon from "../../assets/icons/selected.png"

const AreasFilter: React.FC = () => {
  const { areas } = useAreas()
  const { setFilterQuery, resetTrigger } = useFilterContext()
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])

  useEffect(() => {
    setSelectedAreas([])
  }, [resetTrigger])

  const handleAreaClick = (areaId: string) => {
    setSelectedAreas((prev) =>
      prev.includes(areaId)
        ? prev.filter((id) => id !== areaId)
        : [...prev, areaId]
    )

    setFilterQuery((prevQuery: string[]) => {
      let queryArray = [...prevQuery]
      queryArray = queryArray.filter(
        (query) => query !== `areas_tematicas_id=${areaId}`
      )

      if (!selectedAreas.includes(areaId)) {
        queryArray.push(`areas_tematicas_id=${areaId}`)
      }

      return queryArray
    })
  }

  return (
    <FilterCard className="h-72 overflow-y-scroll overflow-x-hidden">
      {areas.map((area) => (
        <div
          className="flex gap-2 items-center cursor-pointer"
          key={area.id}
          onClick={() => handleAreaClick(area.id)}
        >
          {selectedAreas.includes(area.id) && (
            <img src={selectedIcon} alt="Selected" />
          )}
          <p className={`text-gray-3 font-semibold text-lg`}>{area.titulo}</p>
        </div>
      ))}
    </FilterCard>
  )
}

export default AreasFilter
