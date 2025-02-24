import { useParams } from "react-router-dom"
import InvestigationDetailCard from "../components/investigation/InvestigationDetailCard"
import ProjectDetailCard from "../components/projects/ProjectDetailCard"
import { useEntity } from "../hooks/useEntity"
import { EntityTypes } from "../types/Entity"
import { Investigation } from "../types/Investigation"
import { Project } from "../types/Project"

const DetailedEntity: React.FC = () => {
  const { type, id } = useParams()
  const { data } = useEntity(type as EntityTypes, id)

  if (!data) {
    return null
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      {type === EntityTypes.INVESTIGATION ? (
        <InvestigationDetailCard entity={data as unknown as Investigation} />
      ) : (
        <ProjectDetailCard entity={data as unknown as Project} />
      )}
    </div>
  )
}

export default DetailedEntity
