import Card from "../common/Card"
import { twMerge } from "tailwind-merge"

interface FilterCardProps {
  children: React.ReactNode
  className?: string
}

const FilterCard: React.FC<FilterCardProps> = ({ className, children }) => {
  return (
    <Card
      className={twMerge(
        "flex flex-col gap-4 border-2 border-gray rounded-xl p-4",
        className
      )}
    >
      {children}
    </Card>
  )
}

export default FilterCard
