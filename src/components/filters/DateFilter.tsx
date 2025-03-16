import { useState } from "react"
import { useFilterContext } from "./context/useFilterContext"
import FilterCard from "./FilterCard"
import BasicDatePicker from "../common/BasicDatePicker"

type DateFilterKeys =
  | "fecha_inicio_min"
  | "fecha_inicio_max"
  | "fecha_culminacion_min"
  | "fecha_culminacion_max"

const DateFilter: React.FC = () => {
  const { setFilterQuery } = useFilterContext()

  const [dates, setDates] = useState<Record<DateFilterKeys, string | null>>({
    fecha_inicio_min: null,
    fecha_inicio_max: null,
    fecha_culminacion_min: null,
    fecha_culminacion_max: null,
  })

  const parseDate = (dateStr: string | null): Date | null =>
    dateStr ? new Date(dateStr) : null

  const handleDateChange = (key: DateFilterKeys, value: Date | null): void => {
    const formattedDate = value ? value.toISOString().split("T")[0] : null

    setDates((prev) => ({ ...prev, [key]: formattedDate }))

    setFilterQuery((prevQuery: string[]) => {
      let queryArray = [...prevQuery]

      queryArray = queryArray.filter((query) => !query.startsWith(`${key}=`))

      if (formattedDate) {
        queryArray.push(`${key}=${formattedDate}`)
      }

      return queryArray
    })
  }

  return (
    <FilterCard>
      <div className="flex flex-col gap-3">
        <div>
          <label className="font-semibold text-gray-2">Fecha Inicio Min</label>
          <BasicDatePicker
            value={parseDate(dates.fecha_inicio_min)}
            onChange={(date) => handleDateChange("fecha_inicio_min", date)}
          />
        </div>
        <div>
          <label className="font-semibold text-gray-2">Fecha Inicio Max</label>
          <BasicDatePicker
            value={parseDate(dates.fecha_inicio_max)}
            onChange={(date) => handleDateChange("fecha_inicio_max", date)}
          />
        </div>
        <div>
          <label className="font-semibold text-gray-2">
            Fecha Culminación Min
          </label>
          <BasicDatePicker
            value={parseDate(dates.fecha_culminacion_min)}
            onChange={(date) => handleDateChange("fecha_culminacion_min", date)}
          />
        </div>
        <div>
          <label className="font-semibold text-gray-2">
            Fecha Culminación Max
          </label>
          <BasicDatePicker
            value={parseDate(dates.fecha_culminacion_max)}
            onChange={(date) => handleDateChange("fecha_culminacion_max", date)}
          />
        </div>
      </div>
    </FilterCard>
  )
}

export default DateFilter
