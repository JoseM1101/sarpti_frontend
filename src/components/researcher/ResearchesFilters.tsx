import AgeFilter from "../filters/AgeFilter"
import GenderFilter from "../filters/GenderFilter"
import NationalityFilter from "../filters/NationalityFilter"
// import RoleFilter from "../filters/RoleFilter"

export const filters = [
  { label: "Edad", component: <AgeFilter /> },
  { label: "Sexo", component: <GenderFilter /> },
  { label: "Nacionalidad", component: <NationalityFilter /> },
  // { label: "Rol", component: <RoleFilter /> },
]
