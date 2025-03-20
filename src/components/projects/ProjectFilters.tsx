import StatusFilter from "../filters/StatusFilter"
import AreasFilter from "../filters/AreasFilter"
import DateFilter from "../filters/DateFilter"

export const filters = [
  { label: "Fecha", component: <DateFilter /> },
  { label: "Estatus", component: <StatusFilter /> },
  { label: "Area Tematica", component: <AreasFilter /> },
]
