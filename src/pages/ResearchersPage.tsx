import React, { useState, useEffect } from "react"
import axios from "axios"
import { ApiResponse } from "../types/ApiResponse"
import ResearcherCard from "../components/researcher/ResearcherCard"
import { useMessage } from "../hooks/useMessage"
import { MessageType } from "../types/Message"
import { Person } from "../types/Person"
import { EntityStatus } from "../types/Entity"

const ResearchersPage: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null)
  const { showMessage } = useMessage()

  useEffect(() => {
    axios
      .get<ApiResponse<Person>>("/personas")
      .then((response) => {
        // Map the estatus field if needed
        const personsWithStatus = response.data.data.list.map(person => ({
          ...person,
          estatus: mapToEntityStatus(person)
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
            "Error al cargar personas"
        })
      })
  }, [showMessage])

  // Helper to map any status field from person to EntityStatus
  // Modify this based on your actual data
  const mapToEntityStatus = (person: Person): EntityStatus => {
    // Example mapping logic - adjust based on your data
    if (person.estado_civil?.toLowerCase().includes('casado')) {
      return EntityStatus.ACTIVE
    } else if (person.estado_civil?.toLowerCase().includes('soltero')) {
      return EntityStatus.INACTIVE
    }
    return EntityStatus.ACTIVE // Default
  }

  if (loading) return <div className="p-4">Cargando investigadores...</div>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Investigadores</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {persons.map((person) => (
          <ResearcherCard
            key={person.id_persona}
            person={person}
            expanded={person.id_persona === expandedCardId}
            onClick={() => setExpandedCardId(
              person.id_persona === expandedCardId ? null : person.id_persona
            )}
            status={mapToEntityStatus(person)}
            className="h-full"
          />
        ))}
      </div>
    </div>
  )
}

export default ResearchersPage
