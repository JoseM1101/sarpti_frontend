import { Link } from "react-router-dom"
import { useInvestigations } from "../../hooks/useInvestigations"
import InvestigationMenuCard from "./InvestigationMenuCard"
import EntityList from "../entity/EntityList"
import { Investigation } from "../../types/Investigation"
import { useFilterContext } from "../filters/context/useFilterContext"
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
  const { investigations } = useInvestigations()
  const { isBeingFiltered } = useFilterContext()

  return isBeingFiltered ? (
    filteredInvestigations.length > 0 ? (
      <EntityList<Investigation>
        entities={filteredInvestigations}
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
    <EntityList<Investigation>
      entities={investigations}
      renderEntity={(entity) => renderFunction(entity)}
    />
  )
}

export default InvestigationsList
