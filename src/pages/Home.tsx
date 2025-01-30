import { useState, useCallback } from "react"
import EntityMenuCard from "../components/entity/EntityMenuCard"
import projects from "../data/projects"
import Button from "../components/common/Button"
import SearchBar from "../components/common/SearchBar"
import Entity from "../types/Entity"
import { Link } from "react-router-dom"
import Modal from "../components/common/Modal"
import useModal from "../hooks/useModal"
import Card from "../components/common/Card"
import CustomSlider from "../components/common/CustomSlider"

const Home: React.FC = () => {
  const [data, setData] = useState<Entity[]>(projects)
  const { isOpen, openModal } = useModal()

  const handleSearch = useCallback((filteredData: Entity[]) => {
    setData(filteredData)
  }, [])

  return (
    <>
      <div>
        <div className="flex gap-2">
          <SearchBar<Entity>
            data={projects}
            onSearch={handleSearch}
            getLabel={(entity) => entity.title}
            className="w-80"
          />
          <Button>Generar Reporte</Button>
          <Button bgColor="green" onClick={openModal}>
            Agregar
          </Button>
        </div>
        <div className="flex flex-col gap-3 mt-5">
          {data.map((d) => (
            <Link key={d.title} to={`/${d.title}`}>
              <EntityMenuCard entity={d} />
            </Link>
          ))}
        </div>
      </div>
      <Modal isOpen={isOpen}>
        <Card className="w-9/12 h-3/6 bg-white rounded-3xl">
          <CustomSlider
            settings={{
              className: "h-full w-full",
              dotsClass: "left-1/2 -translate-x-1/2 absolute top-10 flex gap-8",
              appendDots: () => (
                <ul>
                  <CustomSlider.Step>1</CustomSlider.Step>
                  <CustomSlider.Step>2</CustomSlider.Step>
                  <CustomSlider.Step>3</CustomSlider.Step>
                  <CustomSlider.Step>4</CustomSlider.Step>
                  <CustomSlider.Step>5</CustomSlider.Step>
                </ul>
              ),
            }}
          >
            <div className="w-full h-full flex items-center justify-center bg-red">
              1
            </div>
            <div className="w-full h-full flex items-center justify-center bg-green">
              1
            </div>
            <div className="w-full h-full flex items-center justify-center bg-lightblue">
              1
            </div>
          </CustomSlider>
        </Card>
      </Modal>
    </>
  )
}

export default Home
