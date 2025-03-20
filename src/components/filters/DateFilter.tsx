import { useState, useEffect } from "react"
import { useFilterContext } from "./context/useFilterContext"
import FilterCard from "./FilterCard"
import BasicDatePicker from "../common/BasicDatePicker"

type DateFilterKeys =
  | "fecha_inicio_min"
  | "fecha_inicio_max"
  | "fecha_culminacion_min"
  | "fecha_culminacion_max"

interface DateFilterProps {
  visibleFields?: DateFilterKeys[] // Controls which fields are visible
}

const DateFilter: React.FC<DateFilterProps> = ({ visibleFields }) => {
  const { setFilterQuery, resetTrigger } = useFilterContext()

  const [dates, setDates] = useState<Record<DateFilterKeys, string | null>>({
    fecha_inicio_min: null,
    fecha_inicio_max: null,
    fecha_culminacion_min: null,
    fecha_culminacion_max: null,
  })

  useEffect(() => {
    setDates({
      fecha_inicio_min: null,
      fecha_inicio_max: null,
      fecha_culminacion_min: null,
      fecha_culminacion_max: null,
    })
  }, [resetTrigger])

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

  const allFields: { key: DateFilterKeys; label: string }[] = [
    { key: "fecha_inicio_min", label: "Fecha Inicio Min" },
    { key: "fecha_inicio_max", label: "Fecha Inicio Max" },
    { key: "fecha_culminacion_min", label: "Fecha Culminación Min" },
    { key: "fecha_culminacion_max", label: "Fecha Culminación Max" },
  ]

  const fieldsToRender = visibleFields || allFields.map((field) => field.key)

  return (
    <FilterCard>
      <div className="flex flex-col gap-3">
        {allFields
          .filter(({ key }) => fieldsToRender.includes(key))
          .map(({ key, label }) => (
            <div key={key}>
              <label className="font-semibold text-gray-2">{label}</label>
              <BasicDatePicker
                value={parseDate(dates[key])}
                onChange={(date) => handleDateChange(key, date)}
              />
            </div>
          ))}
      </div>
    </FilterCard>
  )
}

export default DateFilter
