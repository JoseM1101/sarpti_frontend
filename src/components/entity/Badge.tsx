import { EntityState } from "../../types/Entity"
import { twMerge } from "tailwind-merge"

const Badge: React.FC<{ state: EntityState; className?: string }> = ({
  state,
  className,
}) => {
  const colors: Record<EntityState, string> = {
    [EntityState.INACTIVE]: "bg-yellow",
    [EntityState.ACTIVE]: "bg-green",
    [EntityState.FINISHED]: "bg-darkblue",
    [EntityState.CANCELLED]: "bg-red",
  }

  return (
    <div
      className={twMerge(
        "absolute left-0 top-0 w-4 h-4 rounded-br-2xl",
        colors[state],
        className
      )}
    ></div>
  )
}

export default Badge
