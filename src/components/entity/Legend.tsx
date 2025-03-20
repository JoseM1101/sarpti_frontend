import { statusItems } from "../../utils"
import Card from "../common/Card"
import { twMerge } from "tailwind-merge"

const Legend: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Card className={twMerge("flex gap-4", className)}>
      {Object.entries(statusItems).map(([key, value]) => (
        <div key={key} className="flex gap-2 items-center">
          <div className={`w-4 h-4 rounded-full ${value.color}`}></div>
          <span>{value.label}</span>
        </div>
      ))}
    </Card>
  )
}

export default Legend
