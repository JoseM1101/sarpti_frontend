export enum typeIdentification {
  V = "V",
  E = "E",
  J = "J",
}
export enum sexo {
  M = "M",
  F = "F",
}

export interface Person {
  id_persona: string
  tipo_identificacion: typeIdentification
  nombre: string
  apellido: string
  estado_civil: string
  grado_academico: string
  identificacion: number
  sexo: sexo
  edad: number
  correo: string
}
