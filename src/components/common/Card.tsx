import { twMerge } from "tailwind-merge"

interface CardProps {
  className?: string
  children: React.ReactNode
}

const Card: React.FC<CardProps> = ({ className, children }) => {
  const baseClasses = "relative rounded-md p-2 shadow-md bg-white"
  const mergedClasses = twMerge(baseClasses, className)

  return <div className={mergedClasses}>{children}</div>
}

export default Card
