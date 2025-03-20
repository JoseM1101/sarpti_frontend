import { EntityStatus } from "../../types/Entity"
import { twMerge } from "tailwind-merge"
import { statusItems } from "../../utils"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  state: EntityStatus
  className?: string
}

const Badge: React.FC<BadgeProps> = ({ state, className, ...rest }) => {
  return (
    <div
      {...rest}
      className={twMerge(
        "absolute left-0 top-0 w-4 h-4 rounded-br-2xl",
        statusItems[state].color,
        className
      )}
    ></div>
  )
}

export default Badge
