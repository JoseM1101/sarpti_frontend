import { useState, useCallback } from "react"
import Button from "../components/common/Button"
import SearchBar from "../components/filters/SearchBar"
import investigaciones from "../assets/icons/investigaciones.png"
import { Project } from "../types/Project"
import { FilterProvider } from "../components/filters/context/FilterProvider"
import ProjectsList from "../components/projects/ProjectsList"
import { fetchFilteredData } from "../api/investigations"
import { Link } from "react-router-dom"
import useModal from "../hooks/useModal"
import InsertModal from "../components/InsertModal"
import Filters from "../components/filters/Filters"
import PDFReport from "../components/reports/pdf/PDFReport"
import { ProjectRender } from "../components/reports/pdf/ProjectRender"
import { filters } from "../components/projects/ProjectFilters"
import { useMessage } from "../hooks/useMessage"
import { MessageType } from "../types/Message"

const ProjectsPage: React.FC = () => {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const { isOpen, openModal, closeModal } = useModal()
  const { showMessage } = useMessage()

  const searchFn = useCallback(
    (filterQuery: string[]) => {
      fetchFilteredData<Project>("/proyectos", filterQuery)
        .then((result) => {
          setFilteredProjects(result.data.list)
        })
        .catch((err) => {
          showMessage({
            type: MessageType.ERROR,
            title: "Error",
            content:
              err?.response?.data?.message || err.message || "Error al filtrar",
          })
        })
    },
    [setFilteredProjects, showMessage]
  )

  return (
    <FilterProvider>
      <div className="flex gap-5 items-center">
        <div className="flex gap-3 items-center cursor-pointer">
          <img className="object-contain" src={investigaciones} alt="" />
          <Link to="/investigaciones">
            <p className="text-gray-3 text-xl font-semibold">Investigaciones</p>
          </Link>
        </div>
        <Filters updateFn={searchFn} filters={filters} />
        <SearchBar onSearch={searchFn} className="w-80" />
        <PDFReport
          title="Reporte de Proyectos"
          data={filteredProjects}
          recordRenderer={(records) => <ProjectRender projects={records} />}
        />
        <Button className="py-3" bgColor="green" onClick={openModal}>
          Agregar
        </Button>
      </div>
      <ProjectsList filteredProjects={filteredProjects} />
      <InsertModal isOpen={isOpen} closeModal={closeModal} mode="Proyectos" />
    </FilterProvider>
  )
}

export default ProjectsPage
