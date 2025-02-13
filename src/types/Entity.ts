export enum EntityStatus {
  INACTIVE = 0,
  ACTIVE = 1,
  FINISHED = 2,
  CANCELLED = 3,
}

export enum EntityLevel {
  PREGRADO = 1,
  ESPECIALIZACION = 2,
  MAESTRIA = 3,
  DOCTORADO = 4,
}

export interface EntityProduct {
  id: string
  titulo: string
  descripcion: string
  url: string
  estatus: number
}

export interface Entity {
  id: string
  titulo: string
  descripcion: string
  keywords: string[]
  estatus: EntityStatus
}
