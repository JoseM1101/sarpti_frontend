import { useInvestigations } from "../../hooks/useInvestigations"
import ListView from "../common/ListView"
import InvestigationMenuCard from "./InvestigationMenuCard"
import { Link } from "react-router-dom"

const InvestigationsList: React.FC = () => {
  const { investigations, error, isLoading } = useInvestigations()

  return (
    <ListView>
      {isLoading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Error al cargar los datos</p>
      ) : (
        investigations.map((investigation) => (
          <Link
            key={investigation.id}
            to={`/investigaciones/${investigation.id}`}
          >
            <InvestigationMenuCard investigation={investigation} />
          </Link>
        ))
      )}
    </ListView>
  )
}

export default InvestigationsList
