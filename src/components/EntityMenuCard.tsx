import Card from "./Card"
import { twMerge } from "tailwind-merge"
import Entity from "../types/Entity"
import Badge from "./Badge"
import EntityCard from "./EntityCard"

interface EntityMenuCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  className?: string
  entity: Entity
}

const EntityMenuCard = ({ className, entity }: EntityMenuCardProps) => {
  const baseClasses = "w-full"
  const mergedClasses = twMerge(baseClasses, className)

  return (
    <Card className={mergedClasses}>
      <Badge state={entity.currentState} />
      <div className="p-2 flex">
        <div className="w-8/12">
          <EntityCard.Title className="w-96 overflow-hidden whitespace-nowrap text-ellipsis truncate">
            {entity.title}
          </EntityCard.Title>
          <div className="flex justify-between mt-2">
            <div className="flex flex-col">
              <div className="flex">
                <p className="text-gray-2 text-sm font-semibold">
                  Autores:&nbsp;
                </p>
                <EntityCard.Authors
                  className="text-sm w-72 overflow-hidden whitespace-nowrap text-ellipsis truncate"
                  authors={entity.authors}
                />
              </div>
              <div className="flex">
                <p className="text-gray-2 text-sm font-semibold">
                  Tutores:&nbsp;
                </p>
                <EntityCard.Tutors
                  className="text-sm w-72 overflow-hidden whitespace-nowrap text-ellipsis truncate"
                  tutors={entity.tutors}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex">
                <p className="text-gray-2 text-sm font-semibold">
                  Productos:&nbsp;
                </p>
                <EntityCard.RelatedProducts
                  className="text-sm w-40 overflow-hidden whitespace-nowrap text-ellipsis truncate"
                  products={entity.relatedProducts}
                />
              </div>
              <div className="flex">
                <p className="text-gray-2 text-sm font-semibold">
                  Inversión:&nbsp;
                </p>
                <EntityCard.Investment
                  className="text-sm font-semibold w-64 overflow-hidden whitespace-nowrap text-ellipsis truncate"
                  investment={entity.investment}
                />
              </div>
            </div>
          </div>
        </div>
        <span className="mx-3 h-auto bg-black w-px"></span>
        <div className="flex-grow">
          <EntityCard.Dates
            startDate={entity.startDate}
            endDate={entity.endDate}
            className="text-sm"
          />
          <div className={twMerge("flex flex-col", className)}></div>
          <p className="text-sm">Palabras clave:</p>
          <div className="flex gap-2 flex-wrap">
            <EntityCard.Keywords
              keywords={entity.keywords}
              className="text-xs"
            />
          </div>
        </div>
      </div>
    </Card>
  )
}

export default EntityMenuCard
