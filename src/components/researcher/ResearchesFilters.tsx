import AgeFilter from "../filters/AgeFilter"
import GenderFilter from "../filters/GenderFilter"

export const filters = [
  { label: "Edad", component: <AgeFilter /> },
  { label: "Sexo", component: <GenderFilter /> },
]
