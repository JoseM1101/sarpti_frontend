import { statusItems } from "../../utils"
import FilterCard from "./FilterCard"

const StatusFilter: React.FC = () => {
  return (
    <FilterCard>
      {Object.values(statusItems).map((status) => {
        return (
          <div className="flex items-center gap-2">
            <div className={`${status.color} rounded-full w-5 h-5`}></div>
            <p className="font-semibold text-lg text-gray-3 whitespace-nowrap">
              {status.label}
            </p>
            <div className="border-lightblue border-2 rounded-full w-4 h-4">
              <div className="w-full h-full border-2 border-white rounded-full bg-lightblue"></div>
            </div>
          </div>
        )
      })}
    </FilterCard>
  )
}

export default StatusFilter
