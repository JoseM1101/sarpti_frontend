import { useCallback } from "react"
import EntityMenuCard from "../components/entity/EntityMenuCard"
import Button from "../components/common/Button"
import SearchBar from "../components/common/SearchBar"
import { Entity } from "../types/Entity"
import { Link } from "react-router-dom"
import useModal from "../hooks/useModal"
import InsertModal from "../components/InsertModal"
import { useInvestigations } from "../hooks/useInvestigations"

const Home: React.FC = () => {
  const { investigations, error, isLoading } = useInvestigations()
  const { isOpen, openModal } = useModal()

  const handleSearch = useCallback((filteredData: Entity[]) => {
    // setData(filteredData)
    console.log(filteredData)
  }, [])

  return (
    <>
      <div>
        <div className="flex gap-2">
          <SearchBar<Entity>
            data={investigations}
            onSearch={handleSearch}
            getLabel={(entity) => entity.titulo}
            className="w-80"
          />
          <Button>Generar Reporte</Button>
          <Button bgColor="green" onClick={openModal}>
            Agregar
          </Button>
        </div>
        <div className="flex flex-col gap-3 mt-5">
          {isLoading ? (
            <p>Cargando...</p>
          ) : error ? (
            <p>Error al cargar los datos</p>
          ) : (
            investigations.map((entity) => (
              <Link key={entity.id} to={`/${entity.id}`}>
                <EntityMenuCard entity={entity} />
              </Link>
            ))
          )}
        </div>
      </div>
      <InsertModal isOpen={isOpen} />
    </>
  )
}

export default Home
