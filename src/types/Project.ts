import { Entity } from "./Entity"

export interface Project extends Entity {
  fecha_creacion: string
  responsable: string
  creador: string
  areas_tematicas: string
}
export interface ProjectPostData {
  titulo: string;
  descripcion: string;
  responsable: string;
  areas_tematicas_id: string;
/*   fecha_creacion: string; 
  estatus: number; 
  creador: string;
  areas_tematicas: string;
  autores: string[]; 
  tutores: string[]; 
  inversion: number;
  inversionista: string; */
 
}
