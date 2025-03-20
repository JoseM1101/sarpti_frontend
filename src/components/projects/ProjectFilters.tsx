import StatusFilter from "../filters/StatusFilter"
import AreasFilter from "../filters/AreasFilter"
import DateFilter from "../filters/DateFilter"

export const filters = [
  {
    label: "Fecha",
    component: (
      <DateFilter visibleFields={["fecha_inicio_min", "fecha_inicio_max"]} />
    ),
  },
  { label: "Estatus", component: <StatusFilter /> },
  { label: "Area Tematica", component: <AreasFilter /> },
]
