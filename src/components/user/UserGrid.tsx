import { useEffect, useState } from "react"
import axios from "axios"
import { User, UserStatus } from "../../types/User"
import { UserCard } from "./UserCard"
import SearchBar from "../common/SearchBar"
import { ApiResponse } from "@/types/ApiResponse"

interface Persona {
  id: string
  nombres: string
  apellidos: string
  cedula: number
  correo: string
  telefono: string
  direccion: string
  nivel_academico: number
  sexo: string
  nivel: number
  estatus: number
}

export default function UserGrid() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get<ApiResponse<Persona>>("/personas")
        const data = res.data

        const transformed = data.list.map((persona: Persona) => {
          let status: UserStatus
          switch (persona.estatus) {
            case 1:
              status = UserStatus.ONLINE
              break
            case 2:
              status = UserStatus.AWAY
              break
            case 3:
              status = UserStatus.OFFLINE
              break
            default:
              status = UserStatus.OFFLINE
          }

          return {
            id: persona.id,
            firstName: persona.nombres,
            lastName: persona.apellidos,
            education: "",
            age: 25,
            gender: persona.sexo.toLowerCase().includes("mas")
              ? "M"
              : ("F" as "M" | "F"),
            location: persona.direccion,
            avatarUrl: "/placeholder.svg",
            status: status,
          }
        })

        console.log("Transformed users:", transformed)
        setUsers(transformed)
        setFilteredUsers(transformed)
      } catch (error) {
        console.error("Error fetching personas:", error)
      }
    }
    fetchUsers()
  }, [])

  return (
    <div className="container ml-0 px-4 py-4">
      <div className="w-fit mx-auto">
        <div className="flex flex-col sm:flex-row justify-start items-center mb-5 gap-4">
          <SearchBar<User>
            data={users}
            onSearch={(filtered) => setFilteredUsers(filtered)}
            getLabel={(user) => `${user.firstName} ${user.lastName}`}
            className="w-full sm:w-80"
          />
          <button className="w-full sm:w-auto p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Generar Reporte
          </button>
        </div>

        {/* Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {filteredUsers.map((user) => {
            return (
              <div key={user.id}>
                <UserCard
                  user={user}
                  isExpanded={expandedCardId === user.id}
                  status={user.status}
                  onClick={() =>
                    setExpandedCardId(
                      expandedCardId === user.id ? null : user.id
                    )
                  }
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
