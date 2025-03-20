import { useState, useEffect } from "react"
import { useFilterContext } from "./context/useFilterContext"
import FilterCard from "./FilterCard"

const genders = [
  { label: "Masculino", value: "M" },
  { label: "Femenino", value: "F" },
]

const GenderFilter: React.FC = () => {
  const { setFilterQuery, resetTrigger } = useFilterContext()
  const [selectedGender, setSelectedGender] = useState<string | null>(null)

  useEffect(() => {
    setSelectedGender(null)
  }, [resetTrigger])

  const handleGenderClick = (gender: string) => {
    setSelectedGender((prev) => (prev === gender ? null : gender))

    setFilterQuery((prevQuery) => {
      const updatedQuery = prevQuery.filter((q) => !q.startsWith("sexo="))

      if (selectedGender !== gender) {
        updatedQuery.push(`sexo=${gender}`)
      }

      return updatedQuery
    })
  }

  return (
    <FilterCard>
      <div className="flex flex-col gap-2">
        {genders.map(({ label, value }) => (
          <div
            key={value}
            className={`cursor-pointer font-semibold text-lg ${
              selectedGender === value ? "text-lightblue" : "text-gray-3"
            }`}
            onClick={() => handleGenderClick(value)}
          >
            {label}
          </div>
        ))}
      </div>
    </FilterCard>
  )
}

export default GenderFilter
