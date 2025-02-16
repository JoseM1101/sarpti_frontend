import { Person } from "./Person"

export enum UserStatus {
  ONLINE = 0,
  AWAY = 1,
  OFFLINE = 2,
}

enum UserRole {
  INVESTIGADOR = 1,
  DIRECTOR = 2,
  DECANO = 3,
}

export interface User extends Person {
  id: string
  ultima_conexion: Date | null
  conectado: boolean
  token: string | null
  rol: UserRole
  estatus: UserStatus
}
