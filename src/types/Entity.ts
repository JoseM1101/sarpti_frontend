import { Project } from "./Project"
import { Investigation } from "./Investigation"

export enum EntityStatus {
  INACTIVE = 0,
  ACTIVE = 1,
  FINISHED = 2,
  CANCELLED = 3,
}

export enum EntityTypes {
  PROJECT = "proyectos",
  INVESTIGATION = "investigaciones",
}

export type EntityMap = {
  proyectos: Project
  investigaciones: Investigation
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
