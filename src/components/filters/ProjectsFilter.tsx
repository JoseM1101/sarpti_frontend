import { useState, useEffect } from "react"
import FilterCard from "./FilterCard"
import { useProjects } from "../../hooks/useProjects"
import { useFilterContext } from "./context/useFilterContext"
import selectedIcon from "../../assets/icons/selected.png"

const ProjectsFilter: React.FC = () => {
  const { projects } = useProjects()
  const { setFilterQuery, resetTrigger } = useFilterContext()
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])

  useEffect(() => {
    setSelectedProjects([])
  }, [resetTrigger])

  const handleProjectClick = (projectId: string) => {
    setSelectedProjects((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    )

    setFilterQuery((prevQuery: string[]) => {
      let queryArray = [...prevQuery]
      queryArray = queryArray.filter(
        (query) => query !== `proyecto_id=${projectId}`
      )

      if (!selectedProjects.includes(projectId)) {
        queryArray.push(`proyecto_id=${projectId}`)
      }

      return queryArray
    })
  }

  return (
    <FilterCard className="h-72 overflow-y-scroll overflow-x-hidden">
      {projects.map((project) => (
        <div
          className="flex gap-2 items-center cursor-pointer"
          key={project.id}
          onClick={() => handleProjectClick(project.id)}
        >
          {selectedProjects.includes(project.id) && (
            <img src={selectedIcon} alt="Selected" />
          )}
          <p className="text-gray-3 font-semibold text-lg">{project.titulo}</p>
        </div>
      ))}
    </FilterCard>
  )
}

export default ProjectsFilter
