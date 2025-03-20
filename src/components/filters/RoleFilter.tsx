import { useState, useEffect } from "react"
import { useFilterContext } from "./context/useFilterContext"
import FilterCard from "./FilterCard"

const ROLES = [
  { id: "autores", label: "Autor" },
  { id: "tutores", label: "Tutor" },
]

const RoleFilter: React.FC = () => {
  const { setFilterQuery, resetTrigger } = useFilterContext()
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])

  // Reset filter when the reset trigger is activated
  useEffect(() => {
    setSelectedRoles([])
  }, [resetTrigger])

  const handleRoleChange = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    )

    setFilterQuery((prevQuery: string[]) => {
      let queryArray = [...prevQuery]

      // Remove existing role filters before adding new ones
      queryArray = queryArray.filter((q) => !q.startsWith(`${role}=`))

      if (!selectedRoles.includes(role)) {
        queryArray.push(`${role}=true`)
      }

      return queryArray
    })
  }

  return (
    <FilterCard>
      <div className="flex flex-col gap-3">
        {ROLES.map((role) => (
          <div
            key={role.id}
            className={`text-lg cursor-pointer ${
              selectedRoles.includes(role.id)
                ? "text-lightblue font-bold"
                : "text-gray-3"
            }`}
            onClick={() => handleRoleChange(role.id)}
          >
            {role.label}
          </div>
        ))}
      </div>
    </FilterCard>
  )
}

export default RoleFilter
