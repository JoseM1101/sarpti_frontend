import { useParams } from "react-router-dom"
import EntityDetailCard from "../components/EntityDetailCard"
import projects from "../data/projects"

const DetailedEntity: React.FC = () => {
  const { title } = useParams()
  const entity = projects.find((p) => p.title === title)

  if (!entity) {
    return null
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <EntityDetailCard entity={entity} />
    </div>
  )
}

export default DetailedEntity
