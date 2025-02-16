import { useParams } from "react-router-dom"
import InvestigationDetailCard from "../components/investigation/InvestigationDetailCard"
import { useInvestigation } from "../hooks/useInvestigation"

const detailMap = {
  investigacion: InvestigationDetailCard,
  proyecto: InvestigationDetailCard,
}

const DetailedEntity: React.FC = () => {
  const { id } = useParams()
  const { investigation } = useInvestigation(id)

  if (!investigation) {
    return null
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* <EntityDetailCard entity={investigation} /> */}
    </div>
  )
}

export default DetailedEntity
