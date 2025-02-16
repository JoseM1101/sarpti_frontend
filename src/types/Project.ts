import { Entity } from "./Entity"
import { Person } from "./Person"

export interface Project extends Entity {
  fecha_creacion: string
  responsable: Person[]
  creador: Person[]
}
