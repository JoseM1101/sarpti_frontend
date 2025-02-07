export enum EntityState {
  INACTIVE = 0,
  ACTIVE = 1,
  FINISHED = 2,
  CANCELLED = 3,
}
enum EntityLevel {
  PREGRADO = 1,
  ESPECIALIZACION = 2,
  MAESTRIA = 3,
  DOCTORADO = 4,
}

interface EntityProduct {
  id: string
  titulo: string
  descripcion: string
  url: string
  estatus: number
  investigacion_id: string
}

export interface Person {
  nombre: string
  apellido: string
  correo: string
}

export interface Entity {
  id: string
  titulo: string
  descripcion: string
  keywords: string[]
  fecha_inicio: string
  fecha_culminacion: string | null
  nivel: EntityLevel
  estatus: EntityState
  proyecto: string
  inversion: number
  autores: Person[]
  tutores: Person[]
  productos: EntityProduct[]
}

export interface EntityRequestResponse {
  rows: number
  list: Entity[]
}

export interface EntityPostData {
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
