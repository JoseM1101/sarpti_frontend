import { mutate } from "swr"
import axios from "axios"
import { EntityStatus } from "../types/Entity"
import { InvestigationPostData } from "../types/Investigation"

export const updateInvestigationState = async (
  id: string,
  newState: EntityStatus
) => {
  const key = `/investigaciones/${id}`

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
    console.error("Error updating investigation state:", error)
    mutate(key)

    throw error
  }
}

export const createInvestigation = async (data: InvestigationPostData) => {
  const response = await axios.post("/investigaciones", data)
  return response.data
}
