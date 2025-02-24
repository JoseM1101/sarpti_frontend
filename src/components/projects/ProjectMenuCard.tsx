import { twMerge } from "tailwind-merge"
import EntityCard from "../entity/EntityCard"
import { Project } from "../../types/Project"

interface ProjectMenuCardProps {
  project: Project
  className?: string
}

const ProjectMenuCard: React.FC<ProjectMenuCardProps> = ({
  project,
  className,
}) => {
  const baseClasses = "p-4 w-full overflow-hidden"
  const mergedClasses = twMerge(baseClasses, className)
  const truncateCharsClassName =
    "overflow-hidden whitespace-nowrap text-ellipsis truncate"

  return (
    <EntityCard className={mergedClasses} entity={project}>
      <EntityCard.Badge />
      <div className="flex">
        <div className="w-8/12">
          <EntityCard.Title className={truncateCharsClassName} />
          <EntityCard.Description
            className={twMerge("text-base", truncateCharsClassName)}
          />
        </div>
        <span className="mx-3 h-auto bg-black w-px"></span>
        <div className="flex-grow flex flex-col justify-between">
          <EntityCard.StartDate startDate={project.fecha_creacion} />
          <p className="text-gray-3 text-sm font-semibold">
            <span className="text-gray-2">Responsable:</span>{" "}
            {project.responsable}
          </p>
          <p className="text-gray-3 text-sm font-semibold">
            <span className="text-gray-2">Area tematica:</span>{" "}
            {project.areas_tematicas}
          </p>
        </div>
      </div>
    </EntityCard>
  )
}

export default ProjectMenuCard
