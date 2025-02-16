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
      <div className="flex">
        <div className="w-8/12">
          <EntityCard.Title className={truncateCharsClassName} />
          <EntityCard.Description className={truncateCharsClassName} />
        </div>
        <span className="mx-3 h-auto bg-black w-px"></span>
        <div className="flex-grow flex flex-col justify-between">
          <EntityCard.StartDate startDate={project.fecha_creacion} />
          {/* <EntityCard.RelatedPeople
            namespace="Responsable"
            people={project.responsable}
          /> */}
        </div>
      </div>
    </EntityCard>
  )
}

export default ProjectMenuCard
