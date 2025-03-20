import React, { useState, useEffect, useCallback } from "react"
import axios from "axios"
import { ApiResponse } from "../types/ApiResponse"
import ResearcherCard from "../components/researcher/ResearcherCard"
import { useMessage } from "../hooks/useMessage"
import { MessageType } from "../types/Message"
import { Person } from "../types/Person"
import { EntityStatus } from "../types/Entity"
import { fetchFilteredData } from "../api/investigations"
import Filters from "../components/filters/Filters"
import PDFReport from "../components/reports/pdf/PDFReport"
import { PersonRender } from "../components/reports/pdf/PersonRender"
import SearchBar from "../components/filters/SearchBar"
import { filters } from "../components/researcher/ResearchesFilters"
import { FilterProvider } from "../components/filters/context/FilterProvider"

const ResearchersPage: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null)
  const { showMessage } = useMessage()

  const searchFn = useCallback(
    (filterQuery: string[]) => {
      fetchFilteredData<Person>("/personas", filterQuery)
        .then((result) => {
          setPersons(result.data.list)
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
    [setPersons, showMessage]
  )
  // Helper to map any status field from person to EntityStatus
  const mapToEntityStatus = (person: Person): EntityStatus => {
    if (person.estado_civil?.toLowerCase().includes("casado")) {
      return EntityStatus.ACTIVE
    } else if (person.estado_civil?.toLowerCase().includes("soltero")) {
      return EntityStatus.INACTIVE
    }
    return EntityStatus.ACTIVE
  }

  useEffect(() => {
    axios
      .get<ApiResponse<Person>>("/personas")
      .then((response) => {
        const personsWithStatus = response.data.data.list.map((person) => ({
          ...person,
          estatus: mapToEntityStatus(person),
        }))
        setPersons(personsWithStatus)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        showMessage({
          type: MessageType.ERROR,
          title: "Error",
          content:
            err?.response?.data?.message ||
            err.message ||
            "Error al cargar personas",
        })
      })
  }, [showMessage])

  if (loading) return <div className="p-4">Cargando investigadores...</div>

  return (
    <FilterProvider>
      <div className="flex gap-5 items-center">
        <Filters updateFn={searchFn} filters={filters} />
        <SearchBar
          onSearch={searchFn}
          filterKey="nombre_completo"
          className="w-80"
        />
        <PDFReport
          title="Reporte de Personas"
          data={persons}
          recordRenderer={(records) => <PersonRender people={records} />}
        />
      </div>
      {persons.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {persons.map((person) => (
            <ResearcherCard
              key={person.id_persona}
              person={person}
              expanded={person.id_persona === expandedCardId}
              onToggle={() =>
                setExpandedCardId(
                  person.id_persona === expandedCardId
                    ? null
                    : person.id_persona
                )
              }
              status={mapToEntityStatus(person)}
              className="h-full"
            />
          ))}
        </div>
      ) : (
        <div className="h-full flex justify-center items-center">
          <p className="text-gray-3 text-lg font-semibold">
            No se encontraron resultados
          </p>
        </div>
      )}
    </FilterProvider>
  )
}

export default ResearchersPage
