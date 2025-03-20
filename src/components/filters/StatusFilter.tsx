import { useState, useEffect } from "react"
import { statusItems } from "../../utils"
import FilterCard from "./FilterCard"
import { useFilterContext } from "./context/useFilterContext"

const FilterItem: React.FC<{
  status: keyof typeof statusItems
  value: (typeof statusItems)[keyof typeof statusItems]
}> = ({ status, value }) => {
  const [isActive, setIsActive] = useState<boolean>(false)
  const { setFilterQuery, resetTrigger } = useFilterContext()

  useEffect(() => {
    setIsActive(false)
  }, [resetTrigger])

  const handleClick = () => {
    const newIsActive = !isActive

    setIsActive(newIsActive)

    setFilterQuery((prevQuery) => {
      const queryArray = [...prevQuery]

      if (newIsActive) {
        if (!queryArray.includes(`estatus=${status}`)) {
          queryArray.push(`estatus=${status}`)
        }
      } else {
        return queryArray.filter((query) => query !== `estatus=${status}`)
      }

      return queryArray
    })
  }

  return (
    <div
      className="flex items-center justify-between cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center gap-2">
        <div className={`${value.color} rounded-full w-4 h-4`}></div>
        <p className="font-semibold text-lg text-gray-3 whitespace-nowrap">
          {value.label}
        </p>
      </div>
      <div className="border-lightblue border-2 rounded-full w-4 h-4">
        {isActive && (
          <div className="w-full h-full border-2 border-white rounded-full bg-lightblue"></div>
        )}
      </div>
    </div>
  )
}

const StatusFilter: React.FC = () => {
  return (
    <FilterCard>
      {Object.entries(statusItems).map(([key, value]) => {
        return <FilterItem key={key} status={key} value={value} />
      })}
    </FilterCard>
  )
}

export default StatusFilter
