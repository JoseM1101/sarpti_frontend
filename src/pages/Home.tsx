import { useState, useCallback } from "react"
import EntityCard from "../components/EntityCard"
import projects from "../data/projects"
import Button from "../components/ui/Button"
import SearchBar from "../components/SearchBar"
import Entity from "../types/Entity"

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
          <EntityCard key={d.title} entity={d} />
        ))}
      </div>
    </div>
  )
}

export default Home
