import { EntityState, UserStatus } from "../../types/Entity"
import { twMerge } from "tailwind-merge"

interface BadgeProps {
  state?: UserStatus | EntityState;
  badgeVariant?: "user" | "entity";
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  state,
  badgeVariant = "entity",
  className,
}) => {
  let color = "bg-gray-400"
  
  if (state !== undefined) {
    if (badgeVariant === "user") {
      const userColors: Record<UserStatus, string> = {
        [UserStatus.ONLINE]: "bg-green-400",
        [UserStatus.AWAY]: "bg-yellow-400",
        [UserStatus.OFFLINE]: "bg-red-400",
      }
      color = userColors[state as UserStatus]
    } else {
      const entityColors: Record<EntityState, string> = {
        [EntityState.INACTIVE]: "bg-yellow",
        [EntityState.ACTIVE]: "bg-green",
        [EntityState.FINISHED]: "bg-darkblue",
        [EntityState.CANCELLED]: "bg-red",
      }
      color = entityColors[state as EntityState]
    }
  }

  return (
    <div
      className={twMerge(
        "absolute left-0 top-0 w-4 h-4 rounded-br-2xl rounded-tl-md",
        color,
        className
      )}
    ></div>
  )
}

export default Badge
