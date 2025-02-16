import { EntityStatus } from "../../types/Entity"
import { twMerge } from "tailwind-merge"

const Badge: React.FC<{ state: EntityStatus; className?: string }> = ({
  state,
  className,
}) => {
  const colors: Record<EntityStatus, string> = {
    [EntityStatus.INACTIVE]: "bg-yellow",
    [EntityStatus.ACTIVE]: "bg-green",
    [EntityStatus.FINISHED]: "bg-darkblue",
    [EntityStatus.CANCELLED]: "bg-red",
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
