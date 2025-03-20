import { Link } from "react-router-dom"
import { useProjects } from "../../hooks/useProjects"
import ProjectMenuCard from "./ProjectMenuCard"
import EntityList from "../entity/EntityList"
import { Project } from "../../types/Project"
import { useFilterContext } from "../filters/context/useFilterContext"
interface ProjectListProps {
  filteredProjects: Project[]
}

const renderFunction = (entity: Project) => {
  return (
    <Link to={`/proyectos/${entity.id}`}>
      <ProjectMenuCard project={entity} />
    </Link>
  )
}

const ProjectsList: React.FC<ProjectListProps> = ({ filteredProjects }) => {
  const { projects } = useProjects()
  const { isBeingFiltered } = useFilterContext()

  return isBeingFiltered ? (
    filteredProjects.length > 0 ? (
      <EntityList<Project>
        entities={filteredProjects}
        renderEntity={(entity) => renderFunction(entity)}
      />
    ) : (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-3 text-lg font-semibold">
          No se encontraron resultados
        </p>
      </div>
    )
  ) : (
    <EntityList<Project>
      entities={projects}
      renderEntity={(entity) => renderFunction(entity)}
    />
  )
}

export default ProjectsList
