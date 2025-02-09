"use client"

import { cn } from "../../utils"
import { User, CardPosition, UserStatus } from "../../types/Entity"
import Badge from "../../components/entity/Badge"

interface UserCardProps {
  user: User
  onClick: () => void
  position: CardPosition
  isExpanded?: boolean
}

export function UserCard({ user, onClick, position, isExpanded = false }: UserCardProps) {
  // Use a column layout and center the content when expanded;
  // otherwise, use a row layout.
  const containerClasses = isExpanded ? "flex flex-col items-center" : "flex items-center"
  
  // When expanded, use a bottom margin on the image container,
  // otherwise use the margin based on position.
  const avatarMargin = isExpanded
    ? "mb-4"
    : position === "left"
    ? "mr-4"
    : position === "right"
    ? "ml-4"
    : "mr-4"

  // Avatar border color based on user status.
  const statusBorderColor = user.status === UserStatus.ONLINE
    ? "border-green-400"
    : user.status === UserStatus.AWAY
    ? "border-yellow-400"
    : "border-red-400"

  // Card dimensions and avatar size change based on expanded state.
  const cardDimensions = isExpanded ? "w-[264px] h-[280px]" : "w-[264px] h-[128px]"
  const avatarSize = isExpanded ? "w-32 h-32" : "w-20 h-20"

  return (
    <div
      className={cn(
        "relative rounded-xl bg-[#F2F2F2] shadow-md transition-all duration-300 ease-in-out cursor-pointer hover:shadow-md",
        cardDimensions
      )}
      onClick={onClick}
    >
      <div className="absolute left-0 top-0 -z-10">
        <Badge state={user.status} badgeVariant="user" />
      </div>

      <div className={cn("h-full p-4", containerClasses)}>
        {/* Avatar with Status Border */}
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

        {/* User Info */}
        <div
          className={cn(
            "flex flex-col min-w-0",
            isExpanded
              ? "items-center text-center w-full"
              : position === "center"
              ? "items-center text-center w-full"
              : position === "right"
              ? "items-end text-right w-full"
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

