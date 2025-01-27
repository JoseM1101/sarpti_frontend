import Card from "./Card"
import { twMerge } from "tailwind-merge"
import Entity from "../types/Entity"
import Badge from "./Badge"
import EntityCard from "./EntityCard"
import Button from "./Button"
import pause from "../assets/images/pause.png"
import stop from "../assets/images/stop.png"

interface EntityDetailCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  className?: string
  entity: Entity
}

const EntityDetailCard = ({ className, entity }: EntityDetailCardProps) => {
  const baseClasses =
    "w-11/12 bg-white border border-lightblue rounded-xl overflow-hidden p-6"
  const mergedClasses = twMerge(baseClasses, className)

  return (
    <Card className={mergedClasses}>
      <Badge state={entity.currentState} className="w-7 h-7 rounded-br-3xl" />
      <EntityCard.Title className="text-3xl">{entity.title}</EntityCard.Title>
      <div className="flex gap-2 flex-wrap mt-3">
        <EntityCard.Keywords
          keywords={entity.keywords}
          className="rounded-sm text-lightblue font-medium text-sm p-2"
        />
        <div className="border border-gray-2 p-2 flex items-center justify-center">
          <div>
            <span className="h-0.5 w-5 bg-gray-2 block translate-y-0.5"></span>
            <span className="h-0.5 w-5 rotate-90 bg-gray-2 block"></span>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-10 gap-2">
        <div className="flex flex-col gap-3 w-3/5">
          <EntityCard.Description>{entity.description}</EntityCard.Description>
          <EntityCard.Authors authors={entity.authors} />
          <EntityCard.Tutors tutors={entity.tutors} />
        </div>
        <span className="mx-3 h-auto bg-black w-px"></span>
        <div className="w-2/5 flex flex-col gap-3">
          <EntityCard.Dates
            startDate={entity.startDate}
            endDate={entity.endDate}
          />
          <EntityCard.RelatedProducts products={entity.relatedProducts} />
          <EntityCard.Investment investment={entity.investment} />
          <div className="flex gap-2 w-full">
            <img src={stop} alt="" />
            <img src={pause} alt="" />
            <Button className="w-full">Finalizar Investigacion</Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default EntityDetailCard
