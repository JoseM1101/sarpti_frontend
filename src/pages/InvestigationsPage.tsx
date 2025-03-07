import { useState, useMemo } from "react"
import Button from "../components/common/Button"
import SearchBar from "../components/common/SearchBar"
import { Investigation } from "../types/Investigation"
import InvestigationsList from "../components/investigation/InvestigationsList"
import investigaciones from "../assets/icons/investigaciones.png"
import { fetchFilteredData } from "../api/investigations"
import { debounce } from "../utils"
import { Link } from "react-router-dom"
import useModal from "../hooks/useModal"
import InsertModal from "../components/InsertModal"
import Filters from "../components/filters/Filters"

const InvestigationsPage: React.FC = () => {
  const [filteredInvestigations, setFilteredInvestigations] = useState<
    Investigation[]
  >([])
  const { isOpen, openModal, closeModal } = useModal()

  const debouncedSearch = useMemo(
    () =>
      debounce(
        (query: string) =>
          fetchFilteredData<Investigation>("/investigaciones", query).then(
            (result) => setFilteredInvestigations(result.data.list)
          ),
        500
      ),
    []
  )

  return (
    <>
      <div className="flex gap-5 items-center">
        <div className="flex gap-3 items-center cursor-pointer">
          <img className="object-contain" src={investigaciones} alt="" />
          <Link to="/proyectos">
            <p className="text-gray-3 text-xl font-semibold">Investigaciones</p>
          </Link>
        </div>
        <Filters />
        <SearchBar
          onSearch={(query) => {
            debouncedSearch(query)
          }}
          className="w-80"
        />
        <Button className="py-3">Generar Reporte</Button>
        <Button className="py-3" bgColor="green" onClick={openModal}>
          Agregar
        </Button>
      </div>
      <InvestigationsList filteredInvestigations={filteredInvestigations} />
      <InsertModal
        isOpen={isOpen}
        closeModal={closeModal}
        mode="Investigaciones"
      />
    </>
  )
}

export default InvestigationsPage
