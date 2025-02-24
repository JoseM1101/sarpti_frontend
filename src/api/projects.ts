import { mutate } from "swr"
import axios from "axios"
import { EntityStatus } from "../types/Entity"

export const updateProjectState = async (
  id: string,
  newState: EntityStatus
) => {
  const key = `/proyectos/${id}`

  mutate(
    key,
    async (currentData) => {
      if (!currentData) return currentData

      return { ...currentData, estatus: newState }
    },
    false
  )

  try {
    const response = await axios.patch(key, { estatus: newState })
    mutate(key)

    return response.data
  } catch (error) {
    console.error("Error updating project state:", error)
    mutate(key)

    throw error
  }
}
