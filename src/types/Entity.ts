export type EntityState = "Finished" | "In Progress" | "Inactive" | "Cancelled"

interface EntityProduct {
  type: string
  title: string
  url: string
}

export default interface Entity {
  title: string
  description: string
  authors: string[]
  tutors: string[]
  relatedProducts: EntityProduct[]
  investment: number
  startDate: string
  endDate: string
  keywords: string[]
  currentState: EntityState
}
