import { Project } from "./Project"
import { Investigation } from "./Investigation"
import { Areas } from "./Areas"

export enum EntityStatus {
  INACTIVE = 0,
  ACTIVE = 1,
  FINISHED = 2,
  CANCELLED = 3,
}

export enum EntityTypes {
  PROJECT = "proyectos",
  INVESTIGATION = "investigaciones",
  AREAS = "areas",
}

export type EntityMap = {
  proyectos: Project
  investigaciones: Investigation
  areas: Areas
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
