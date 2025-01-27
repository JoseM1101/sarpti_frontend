import { useState, useCallback } from "react"
import EntityMenuCard from "../components/EntityMenuCard"
import projects from "../data/projects"
import Button from "../components/Button"
import SearchBar from "../components/SearchBar"
import Entity from "../types/Entity"
import { Link } from "react-router-dom"

const Home: React.FC = () => {
  const [data, setData] = useState<Entity[]>(projects)

  const handleSearch = useCallback((filteredData: Entity[]) => {
    setData(filteredData)
  }, [])

  return (
    <div>
      <div className="flex gap-2">
        <SearchBar<Entity>
          data={projects}
          onSearch={handleSearch}
          getLabel={(entity) => entity.title}
          className="w-80"
        />
        <Button>Generar Reporte</Button>
        <Button bgColor="green">Agregar</Button>
      </div>
      <div className="flex flex-col gap-3 mt-5">
        {data.map((d) => (
          <Link key={d.title} to={`/${d.title}`}>
            <EntityMenuCard entity={d} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home
