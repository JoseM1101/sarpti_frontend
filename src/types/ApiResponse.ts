export interface ApiResponse<T> {
  success: boolean
  statusCode: number
  error: boolean
  message: string
  data: {
    row: number
    list: T[]
  }
}
