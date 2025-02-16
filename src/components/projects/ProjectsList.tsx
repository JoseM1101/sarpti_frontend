import { useProjects } from "../../hooks/useProjects"
import ListView from "../common/ListView"
import { Link } from "react-router-dom"
import ProjectMenuCard from "./ProjectMenuCard"

const ProjectsList: React.FC = () => {
  const { projects, error, isLoading } = useProjects()

  return (
    <ListView>
      {isLoading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Error al cargar los datos</p>
      ) : (
        projects.map((project) => (
          <Link key={project.id} to={`/proyecto/${project.id}`}>
            <ProjectMenuCard project={project} />
          </Link>
        ))
      )}
    </ListView>
  )
}

export default ProjectsList
