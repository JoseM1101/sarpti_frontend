import { useState, useEffect } from "react"
import { useFilterContext } from "./context/useFilterContext"
import FilterCard from "./FilterCard"

type AgeFilterKeys = "edad_min" | "edad_max"

const AgeFilter: React.FC = () => {
  const { setFilterQuery, resetTrigger } = useFilterContext()
  const [ages, setAges] = useState<Record<AgeFilterKeys, string | null>>({
    edad_min: null,
    edad_max: null,
  })

  // Reset filter when global reset trigger is fired
  useEffect(() => {
    setAges({
      edad_min: null,
      edad_max: null,
    })
  }, [resetTrigger])

  const handleAgeChange = (key: AgeFilterKeys, value: string) => {
    const formattedAge = value.trim() ? value : null

    setAges((prev) => ({ ...prev, [key]: formattedAge }))

    setFilterQuery((prevQuery: string[]) => {
      let queryArray = [...prevQuery]

      // Remove existing entry for this key
      queryArray = queryArray.filter((query) => !query.startsWith(`${key}=`))

      if (formattedAge) {
        queryArray.push(`${key}=${formattedAge}`)
      }

      return queryArray
    })
  }

  return (
    <FilterCard>
      <div className="flex flex-col gap-3">
        <div>
          <label className="font-semibold text-gray-2">Edad Mínima</label>
          <input
            type="number"
            min="0"
            className="border p-2 rounded w-full"
            placeholder="Ej: 18"
            value={ages.edad_min || ""}
            onChange={(e) => handleAgeChange("edad_min", e.target.value)}
          />
        </div>
        <div>
          <label className="font-semibold text-gray-2">Edad Máxima</label>
          <input
            type="number"
            min="0"
            className="border p-2 rounded w-full"
            placeholder="Ej: 65"
            value={ages.edad_max || ""}
            onChange={(e) => handleAgeChange("edad_max", e.target.value)}
          />
        </div>
      </div>
    </FilterCard>
  )
}

export default AgeFilter
