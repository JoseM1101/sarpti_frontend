"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { User, UserStatus } from "../../types/Entity"
import { UserCard } from "./user-card"
import SearchBar from "../common/SearchBar"
import type { CardPosition } from "../../types/Entity"

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

interface ApiResponse {
  row: number
  list: Persona[]
}

export default function UserGrid() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get<ApiResponse>("/personas")
        const data = res.data

        // Transform the persona data using logic similar to investigations.ts
        const transformed = data.list.map((persona: Persona) => ({
          id: persona.id, // using the provided id, e.g., "per-1a5s8e2f"
          firstName: persona.nombres,
          lastName: persona.apellidos,
          education: "",
          age: 25,
          // Check if the "sexo" property includes "mas" (case-insensitive) to determine gender
          gender: persona.sexo.toLowerCase().includes("mas") ? "M" : "F" as "M" | "F",
          location: persona.direccion,
          avatarUrl: "/placeholder.svg",
          status: persona.estatus as UserStatus
        }))

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
    <div className="container mx-auto px-4 py-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
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

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {filteredUsers.map((user, index) => {
          const posValues: CardPosition[] = ["left", "center", "center", "right"]
          const pos = posValues[index % 4]
          return (
            <div key={user.id}>
              <UserCard
                user={user}
                position={pos}
                isExpanded={expandedCardId === user.id}
                onClick={() =>
                  setExpandedCardId(expandedCardId === user.id ? null : user.id)
                }
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

