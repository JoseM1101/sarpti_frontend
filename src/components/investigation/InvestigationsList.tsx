import { Link } from "react-router-dom"
import { useInvestigations } from "../../hooks/useInvestigations"
import InvestigationMenuCard from "./InvestigationMenuCard"
import EntityList from "../entity/EntityList"
import { Investigation } from "../../types/Investigation"
interface InvestigationListProps {
  filteredInvestigations: Investigation[]
}

const renderFunction = (entity: Investigation) => {
  return (
    <Link to={`/investigaciones/${entity.id}`}>
      <InvestigationMenuCard investigation={entity} />
    </Link>
  )
}

const InvestigationsList: React.FC<InvestigationListProps> = ({
  filteredInvestigations,
}) => {
  const { investigations, error, isLoading } = useInvestigations()

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <EntityList<Investigation>
      entities={
        filteredInvestigations.length > 0
          ? filteredInvestigations
          : investigations
      }
      renderEntity={(entity) => renderFunction(entity)}
    />
  )
}

export default InvestigationsList
