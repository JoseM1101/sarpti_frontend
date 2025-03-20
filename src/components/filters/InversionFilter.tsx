import { useState, useEffect } from "react"
import FilterCard from "./FilterCard"
import { useFilterContext } from "./context/useFilterContext"

const InversionFilter: React.FC = () => {
  const { setFilterQuery, resetTrigger } = useFilterContext()
  const [invMin, setInvMin] = useState<number | null>(null)
  const [invMax, setInvMax] = useState<number | null>(null)

  const handleInvMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    const numericValue = value ? parseInt(value, 10) : null
    setInvMin(numericValue)
  }

  const handleInvMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    const numericValue = value ? parseInt(value, 10) : null
    setInvMax(numericValue)
  }

  useEffect(() => {
    setFilterQuery((prevQuery) => {
      let updatedQuery = prevQuery.filter(
        (q) =>
          !q.startsWith("inversion_min=") && !q.startsWith("inversion_max=")
      )

      if (invMin !== null) {
        updatedQuery = [...updatedQuery, `inversion_min=${invMin}`]
      }

      if (invMax !== null) {
        updatedQuery = [...updatedQuery, `inversion_max=${invMax}`]
      }

      return updatedQuery
    })
  }, [invMin, invMax, setFilterQuery])

  useEffect(() => {
    setInvMin(null)
    setInvMax(null)
  }, [resetTrigger])

  return (
    <FilterCard className="flex flex-col gap-5">
      <div className="flex gap-3">
        <p className="text-gray-2 font-semibold text-base">Desde:</p>
        <div className="flex gap text-lightblue font-semibold">
          <input
            onChange={handleInvMinChange}
            className="w-20"
            type="number"
            min="0"
            value={invMin === null ? "" : invMin}
          />
          <span>$</span>
        </div>
      </div>
      <div className="flex gap-3">
        <p className="text-gray-2 font-semibold text-base">Hasta:</p>
        <div className="flex gap text-lightblue font-semibold">
          <input
            onChange={handleInvMaxChange}
            className="w-20"
            type="number"
            min="1"
            value={invMax === null ? "" : invMax}
          />
          <span>$</span>
        </div>
      </div>
    </FilterCard>
  )
}

export default InversionFilter
