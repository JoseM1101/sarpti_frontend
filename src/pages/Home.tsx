import EntityCard from "../components/EntityCard"
import projects from "../data/projects"
import Button from "../components/Button"

const Home: React.FC = () => {
  return (
    <div>
      <div className="flex gap-2">
        <Button>Generar Reporte</Button>
        <Button bgColor="green">Agregar</Button>
      </div>
      <div className="flex flex-col gap-3 mt-5">
        {projects.map((project) => (
          <EntityCard key={project.title} entity={project} />
        ))}
      </div>
    </div>
  )
}

export default Home
