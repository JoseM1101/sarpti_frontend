export enum UserStatus {
  ONLINE = 0,
  AWAY = 1,
  OFFLINE = 2,
}

export interface User {
  id: string
  firstName: string
  lastName: string
  education: string
  age: number
  gender: "M" | "F"
  status: UserStatus
  avatarUrl?: string
  location?: string
}
