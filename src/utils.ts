import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { EntityStatus } from "./types/Entity"

export const statusItems: Record<
  EntityStatus,
  { label: string; color: string }
> = {
  [EntityStatus.FINISHED]: {
    label: "Culminadas",
    color: "bg-lightblue",
  },
  [EntityStatus.ACTIVE]: {
    label: "En progreso",
    color: "bg-green",
  },
  [EntityStatus.INACTIVE]: {
    label: "Inactivas",
    color: "bg-yellow",
  },
  [EntityStatus.CANCELLED]: {
    label: "Canceladas",
    color: "bg-red",
  },
} as const

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export function formatItems<T>(
  items: T[],
  formatter: (item: T) => string,
  separator = "; "
): string[] {
  return items.map(
    (item, index) =>
      `${formatter(item)}${index !== items.length - 1 ? separator : ""}`
  )
}
