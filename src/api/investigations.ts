import axios from "axios"
import { EntityStatus, EntityPostData } from "../types/Entity"

export const updateInvestigationState = async (
  id: string,
  newState: EntityStatus
) => {
  const response = await axios.patch(`/investigaciones/${id}`, {
    estatus: newState,
  })
  return response.data
}

export const createInvestigation = async (data: EntityPostData) => {
  const response = await axios.post("/investigaciones", data)
  return response.data
}
