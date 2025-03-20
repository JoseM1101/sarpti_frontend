import { mutate } from "swr"
import axios from "axios"
import { EntityStatus } from "../types/Entity"
import { Project, ProjectPostData } from "../types/Project"
import { ApiResponse } from "../types/ApiResponse"


export const updateProjectDetails = async (
  id: string,
  updatedData: Partial<Project>
): Promise<ApiResponse<Project>> => {
  const key = `/proyectos/${id}`;

  mutate(
    key,
    async (currentData: ApiResponse<Project> | undefined) => {
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
    const response = await axios.patch(key, updatedData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    mutate(key);
    return response.data;
  } catch (error) {
    console.error("Error updating project details:", error);
    mutate(key);
    throw error;
  }
};

export const updateProjectState = async (
  id: string,
  newState: EntityStatus
) => {
  const key = `/proyectos/${id}`

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
    console.error("Error updating project state:", error)
    mutate(key)

    throw error
  }
}
export const createProject = async (data: ProjectPostData) => {
  const response = await axios.post("/proyectos", data);
  return response.data;
};