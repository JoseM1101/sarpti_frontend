import { EntityState } from "@/types/Entity"
import { twMerge } from "tailwind-merge"

const Badge: React.FC<{ state: EntityState }> = ({ state }) => {
  const colors: Record<EntityState, string> = {
    Finished: "bg-darkblue",
    "In Progress": "bg-green",
    Inactive: "bg-yellow",
    Cancelled: "bg-red",
  }

  return (
    <div
      className={twMerge(
        "absolute left-0 top-0 w-4 h-4 rounded-br-2xl",
        colors[state]
      )}
    ></div>
  )
}

export default Badge
