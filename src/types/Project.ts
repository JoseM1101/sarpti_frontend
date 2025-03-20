import { Entity } from "./Entity"

export interface Project extends Entity {
  fecha_creacion: string
  responsable: string
  creador: string
  areas_tematicas: string
}
export interface ProjectPostData {
  titulo: string
  descripcion: string
  responsable: string
  areas_tematicas_id: string
  inversion: number
  productos: ProductFormData[]
}

interface ProductFormData {
  titulo: string
  descripcion: string
  url: URL
}
