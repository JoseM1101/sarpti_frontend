import { mutate } from "swr"
import axios from "axios"
import { EntityStatus } from "../types/Entity"
import { ProjectPostData } from "../types/Investigation"

export const updateProjectState = async (
  id: string,
  newState: EntityStatus
) => {
  const key = `/proyectos/${id}`

  mutate(
    key,
    async (currentData: any) => {
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
export const createProject = async (data: ProjectPostData) => {
  const response = await axios.post("/proyectos", data);
  return response.data;
};