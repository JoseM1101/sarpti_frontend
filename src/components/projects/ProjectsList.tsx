import { Link } from "react-router-dom"
import { useProjects } from "../../hooks/useProjects"
import ProjectMenuCard from "./ProjectMenuCard"
import EntityList from "../entity/EntityList"
import { Project } from "../../types/Project"
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
  const { projects, error, isLoading } = useProjects()

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <EntityList<Project>
      entities={filteredProjects.length > 0 ? filteredProjects : projects}
      renderEntity={(entity) => renderFunction(entity)}
    />
  )
}

export default ProjectsList
