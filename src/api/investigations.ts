import axios from "axios"
import { EntityStatus } from "../types/Entity"
import { InvestigationPostData } from "../types/Investigation"

export const updateInvestigationState = async (
  id: string,
  newState: EntityStatus
) => {
  const response = await axios.patch(`/investigaciones/${id}`, {
    estatus: newState,
  })
  return response.data
}

export const createInvestigation = async (data: InvestigationPostData) => {
  const response = await axios.post("/investigaciones", data)
  return response.data
}
