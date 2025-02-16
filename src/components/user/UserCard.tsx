import { cn } from "../../utils"
import { User, UserStatus } from "../../types/User"
// import Badge from "../../components/entity/Badge"

interface UserCardProps {
  user: User
  onClick: () => void
  isExpanded?: boolean
  status: UserStatus
}

export function UserCard({ user, onClick, isExpanded = false }: UserCardProps) {
  const containerClasses = isExpanded
    ? "flex flex-col items-center"
    : "flex items-start"

  const avatarMargin = isExpanded ? "mb-4" : "mr-4"

  // Compute border class for avatar based on user status
  const statusBorderColor =
    user.status === UserStatus.ONLINE
      ? "border-green-400"
      : user.status === UserStatus.AWAY
      ? "border-yellow-400"
      : "border-red-400"

  // Responsive card dimensions and avatar size
  const cardDimensions = isExpanded
    ? "w-full max-w-[264px] h-[280px]"
    : "w-full max-w-[264px] h-[128px]"
  const avatarSize = isExpanded ? "w-32 h-32" : "w-20 h-20"

  return (
    <div
      className={cn(
        "relative rounded-xl bg-[#F2F2F2] shadow-md transition-all duration-300 ease-in-out cursor-pointer hover:shadow-md",
        cardDimensions
      )}
      onClick={onClick}
    >
      {/* Badge Positioned in top left inside the card */}
      <div className="absolute left-0 top-0 z-10">
        {/* <Badge state={user.status} /> */}
      </div>

      <div className={cn("h-full p-4", containerClasses)}>
        <div className={cn("relative flex-shrink-0", avatarMargin)}>
          <div
            className={cn(
              "rounded-full border-2 flex items-center justify-center overflow-hidden transition-all duration-300",
              statusBorderColor,
              avatarSize
            )}
          >
            <img
              src={user.avatarUrl || "/placeholder.svg"}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        <div
          className={cn(
            "flex flex-col min-w-0",
            isExpanded
              ? "items-center text-center w-full"
              : "items-start text-left"
          )}
        >
          <h3 className="font-medium md:text-xs lg:text-md text-gray-900 text-base leading-tight">
            {user.firstName}
          </h3>
          <h3 className="font-medium md:text-xs lg:text-md text-gray-900 text-base leading-tight">
            {user.lastName}
          </h3>
          <p className="text-xs text-gray-500 mt-1">{user.education}</p>
          {user.location && (
            <p className="text-xs text-gray-500 mt-1">{user.location}</p>
          )}
          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
            <span>Edad {user.age}</span>
            <span>{user.gender}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
