import FilterCard from "./FilterCard"
import BasicDatePicker from "../common/BasicDatePicker"

const DateFilter: React.FC = () => {
  return (
    <FilterCard>
      <BasicDatePicker />
      <BasicDatePicker />
    </FilterCard>
  )
}

export default DateFilter
