import { Person } from "./Person"

export enum UserStatus {
  ONLINE = 0,
  AWAY = 1,
  OFFLINE = 2,
}

export enum UserRole {
  INVESTIGADOR = 1,
  DIRECTOR = 2,
  DECANO = 3,
}

export interface User extends Person {
  id: string
  usuario: string
  ultima_conexion: Date | null
  conectado: boolean
  token: string | null
  nivel: UserRole
  estatus: UserStatus
}
