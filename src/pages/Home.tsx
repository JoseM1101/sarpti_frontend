import { useState, useCallback } from "react"
import Button from "../components/common/Button"
import SearchBar from "../components/common/SearchBar"
import InvestigationsList from "../components/investigation/InvestigationsList"
import ProjectsList from "../components/projects/ProjectsList"
import { Entity } from "../types/Entity"
import useModal from "../hooks/useModal"
import InsertModal from "../components/InsertModal"
import investigaciones from "../assets/icons/investigaciones.png"

type Modes = "Proyectos" | "Investigaciones"

const ListModeMap = {
  Proyectos: ProjectsList,
  Investigaciones: InvestigationsList,
}

const Home: React.FC = () => {
  const [mode, setMode] = useState<Modes>("Investigaciones")
  const { isOpen, openModal, closeModal} = useModal()

  const ListComponent = ListModeMap[mode]

  const toggleMode = () => {
    setMode((prevMode) =>
      prevMode === "Proyectos" ? "Investigaciones" : "Proyectos"
    )
  }

  const handleSearch = useCallback((filteredData: Entity[]) => {
    // setData(filteredData)
    console.log(filteredData)
  }, [])

  return (
    <>
      <div>
        <div className="flex gap-5">
          <div
            className="flex gap-3 items-center cursor-pointer"
            onClick={toggleMode}
          >
            <img className="object-contain" src={investigaciones} alt="" />
            <p className="text-gray-3 text-xl font-semibold">{mode}</p>
          </div>
          <SearchBar<Entity>
            data={[]}
            onSearch={handleSearch}
            getLabel={(entity) => entity.titulo}
            className="w-80"
          />
          <Button>Generar Reporte</Button>
          <Button bgColor="green" onClick={openModal}>
            Agregar
          </Button>
        </div>
        <ListComponent />
      </div>
      <InsertModal isOpen={isOpen} closeModal={closeModal} mode={mode}/>
    </>
  )
}

export default Home
