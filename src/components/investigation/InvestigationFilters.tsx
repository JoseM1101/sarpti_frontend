import StatusFilter from "../filters/StatusFilter"
import AreasFilter from "../filters/AreasFilter"
import ProjectsFilter from "../filters/ProjectsFilter"
import DateFilter from "../filters/DateFilter"
import InversionFilter from "../filters/InversionFilter"

export const filters = [
  { label: "Fecha", component: <DateFilter /> },
  { label: "Estatus", component: <StatusFilter /> },
  { label: "Proyecto", component: <ProjectsFilter /> },
  { label: "Area Tematica", component: <AreasFilter /> },
  { label: "Inversion", component: <InversionFilter /> },
]
