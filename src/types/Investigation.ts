import { Entity, EntityProduct } from "./Entity"
/* import { Person } from "./Person" */

export type StartDate = string
export type EndDate = string | null
export type Keywords = string[]

export enum InvestigationLevel {
  PREGRADO = 1,
  ESPECIALIZACION = 2,
  MAESTRIA = 3,
  DOCTORADO = 4,
}
export interface InvestigationPostData {
  titulo: string
  descripcion: string
  keywords: string[]
  nivel: InvestigationLevel
  proyecto_id: string
  inversion: number
  autores: string[]
  tutores: string[]
  productos: Partial<EntityProduct>[]
}

export interface Investigation extends Entity {
  fecha_inicio: StartDate
  fecha_culminacion: EndDate
  nivel: InvestigationLevel
  proyecto: string
  inversion: number
  autores: string[]
  tutores: string[]
  keywords: Keywords
  productos: EntityProduct[] | null
}
