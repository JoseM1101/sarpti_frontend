import { Entity, EntityLevel, EntityProduct } from "./Entity"
import { Person } from "./Person"

export interface InvestigationPostData {
  titulo: string
  descripcion: string
  keywords: string[]
  nivel: EntityLevel
  proyecto_id: string
  inversion: number
  autores: string[]
  tutores: string[]
  productos: Partial<EntityProduct>[]
}

export interface Investigation extends Entity {
  fecha_inicio: string
  fecha_culminacion: string | null
  nivel: EntityLevel
  proyecto: string
  inversion: number
  autores: Person[]
  tutores: Person[]
  productos: EntityProduct[]
}
