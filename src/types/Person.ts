export enum typeIdentification {
    V = "Venezolano",
    E = "Extranjero",
    J = "Juridico",
}

export enum academicDegree {
    NONE = "Ninguno",
    BACHELOR = "Bachiller",
    TECHNICIAN = "Técnico Superior Universitario",
}

export interface Person {
  id_persona: string
  id_tipo_identificacion: typeIdentification
  nombres: string
  apellidos: string
  estado_civil: string
  grado_academicos: academicDegree
  identificacion: number
  edad: number
  correo: string
}
