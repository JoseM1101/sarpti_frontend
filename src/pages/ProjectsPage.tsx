import { useState, useMemo } from "react"
import Button from "../components/common/Button"
import SearchBar from "../components/common/SearchBar"
import investigaciones from "../assets/icons/investigaciones.png"
import { Project } from "../types/Project"
import ProjectsList from "../components/projects/ProjectsList"
import { fetchFilteredData } from "../api/investigations"
import { debounce } from "../utils"
import { Link } from "react-router-dom"

const ProjectsPage: React.FC = () => {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])

  const debouncedSearch = useMemo(
    () =>
      debounce(
        (query: string) =>
          fetchFilteredData<Project>("/proyectos", query).then((result) =>
            setFilteredProjects(result.data.list)
          ),
        500
      ),
    []
  )

  return (
    <>
      <div className="flex gap-5">
        <div className="flex gap-3 items-center cursor-pointer">
          <img className="object-contain" src={investigaciones} alt="" />
          <Link to="/investigaciones">
            <p className="text-gray-3 text-xl font-semibold">Proyectos</p>
          </Link>
        </div>
        <SearchBar
          onSearch={(query) => {
            debouncedSearch(query)
          }}
          className="w-80"
        />
        <Button>Generar Reporte</Button>
        <Button bgColor="green" onClick={() => console.log("Agregar")}>
          Agregar
        </Button>
      </div>
      <ProjectsList filteredProjects={filteredProjects} />
    </>
  )
}

export default ProjectsPage
