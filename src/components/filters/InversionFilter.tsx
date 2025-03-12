import FilterCard from "./FilterCard"
import { useFilterContext } from "./context/useFilterContext"

const InversionFilter: React.FC = () => {
  const { setFilterQuery } = useFilterContext()

  const handleChange =
    (type: "inversion_min" | "inversion_max") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim()

      setFilterQuery((prevQuery) => {
        const updatedQuery = prevQuery.filter((q) => !q.startsWith(`${type}=`))

        if (!value) return updatedQuery

        return [...updatedQuery, `${type}=${value}`]
      })
    }

  return (
    <FilterCard className="flex flex-col gap-5">
      <div className="flex gap-3">
        <p className="text-gray-2 font-semibold text-base">Desde:</p>
        <div className="flex gap text-lightblue font-semibold">
          <input
            onChange={handleChange("inversion_min")}
            className="w-20"
            type="number"
            min="0"
          />
          <span>$</span>
        </div>
      </div>
      <div className="flex gap-3">
        <p className="text-gray-2 font-semibold text-base">Hasta:</p>
        <div className="flex gap text-lightblue font-semibold">
          <input
            onChange={handleChange("inversion_max")}
            className="w-20"
            type="number"
            min="1"
          />
          <span>$</span>
        </div>
      </div>
    </FilterCard>
  )
}

export default InversionFilter
