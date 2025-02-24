import { Entity } from "./Entity"

export interface Project extends Entity {
  fecha_creacion: string
  responsable: string
  creador: string
  areas_tematicas: string
}
