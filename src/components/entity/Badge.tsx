import { EntityStatus } from "../../types/Entity"
import { twMerge } from "tailwind-merge"
import { statusItems } from "../../utils"

const Badge: React.FC<{ state: EntityStatus; className?: string }> = ({
  state,
  className,
}) => {
  return (
    <div
      className={twMerge(
        "absolute left-0 top-0 w-4 h-4 rounded-br-2xl",
        statusItems[state].color,
        className
      )}
    ></div>
  )
}

export default Badge
