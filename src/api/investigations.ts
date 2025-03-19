import { mutate } from "swr"
import axios from "axios"
import { EntityStatus } from "../types/Entity"
import { ApiResponse } from "../types/ApiResponse"
import { Investigation, InvestigationPostData } from "../types/Investigation"

const token = localStorage.getItem("token")

export const updateInvestigationDetails = async (
  id: string,
  updatedData: Partial<Investigation>,
  replaceKeywords: boolean = false // Nuevo parámetro para elegir PUT o PATCH
): Promise<ApiResponse<Investigation>> => {
  const key = `/investigaciones/${id}`;

  mutate(
    key,
    async (currentData: ApiResponse<Investigation> | undefined) => {
      if (!currentData) return currentData;

      return {
        ...currentData,
        data: {
          ...currentData.data,
          ...updatedData,
        },
      };
    },
    false
  );

  try {
    const response = await axios({
      method: replaceKeywords ? "PUT" : "PATCH",
      url: key,
      data: updatedData,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    mutate(key);

    return response.data;
  } catch (error) {
    console.error("Error updating investigation details:", error);
    mutate(key);
    throw error;
  }
};


export const updateInvestigationState = async (
  id: string,
  newState: EntityStatus
) => {
  const key = `/investigaciones/${id}`

  mutate(
    key,
    async (currentData: unknown) => {
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

export async function fetchFilteredData<T>(
  endpoint: string,
  queryValue: string
): Promise<ApiResponse<T>> {
  try {
    const response = await axios.get<ApiResponse<T>>(
      `${endpoint}?titulo=${encodeURIComponent(queryValue)}`,
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
      })

    console.log(response.data)
    return response.data
  } catch (error) {
    console.error("Error fetching data:", error)
    throw new Error("Error fetching data")
  }
}

export const createInvestigation = async (data: InvestigationPostData) => {
  const response = await axios.post("/investigaciones", data)
  return response.data
}
