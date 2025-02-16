export enum EntityStatus {
  INACTIVE = 0,
  ACTIVE = 1,
  FINISHED = 2,
  CANCELLED = 3,
}

export interface EntityProduct {
  id: string
  titulo: string
  descripcion: string
  url: URL
  estatus: EntityStatus
}

export interface Entity {
  id: string
  titulo: string
  descripcion: string
  estatus: EntityStatus
}
