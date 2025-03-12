import FilterCard from "./FilterCard"
import { useProjects } from "../../hooks/useProjects"

const ProjectsFilter: React.FC = () => {
  const { projects } = useProjects()

  return (
    <FilterCard className="h-72 overflow-y-scroll overflow-x-hidden">
      {projects.map((project) => {
        return (
          <p
            key={project.id}
            className="text-gray-3 font-semibold text-lg cursor-pointer"
          >
            {project.titulo}
          </p>
        )
      })}
    </FilterCard>
  )
}

export default ProjectsFilter
