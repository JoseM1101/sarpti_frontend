import { useState, useEffect } from "react"
import { useFilterContext } from "./context/useFilterContext"
import FilterCard from "./FilterCard"

const NATIONALITIES = [
  { id: "V", label: "Venezolano" },
  { id: "E", label: "Extranjero" },
]

const NationalityFilter: React.FC = () => {
  const { setFilterQuery, resetTrigger } = useFilterContext()
  const [selectedNationality, setSelectedNationality] = useState<string | null>(
    null
  )

  // Reset filter when the reset trigger is activated
  useEffect(() => {
    setSelectedNationality(null)
  }, [resetTrigger])

  const handleNationalityChange = (nationality: string) => {
    setSelectedNationality((prev) =>
      prev === nationality ? null : nationality
    )

    setFilterQuery((prevQuery: string[]) => {
      let queryArray = [...prevQuery]

      // Remove previous nationality filter
      queryArray = queryArray.filter(
        (query) => !query.startsWith("nacionalidad=")
      )

      if (selectedNationality !== nationality) {
        queryArray.push(`nacionalidad=${nationality}`)
      }

      return queryArray
    })
  }

  return (
    <FilterCard>
      <div className="flex flex-col gap-3">
        {NATIONALITIES.map((nat) => (
          <div
            key={nat.id}
            className={`flex items-center gap-2 cursor-pointer font-semibold text-lg ${
              selectedNationality === nat.id ? "text-lightblue" : "text-gray-3"
            }`}
            onClick={() => handleNationalityChange(nat.id)}
          >
            <span>{nat.label}</span>
          </div>
        ))}
      </div>
    </FilterCard>
  )
}

export default NationalityFilter
