import Card from "../common/Card"
import { twMerge } from "tailwind-merge"
import { Entity } from "../../types/Entity"
import Badge from "./Badge"
import EntityCard from "./EntityCard"

interface EntityMenuCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  className?: string
  entity: Entity
}

const EntityMenuCard = ({ className, entity }: EntityMenuCardProps) => {
  const baseClasses = "w-full overflow-hidden"
  const mergedClasses = twMerge(baseClasses, className)
  const truncateCharsClassName =
    "overflow-hidden whitespace-nowrap text-ellipsis truncate"

  return (
    <Card className={mergedClasses}>
      <Badge state={entity.estatus} />
      <div className="p-2 flex">
        <div className="w-8/12">
          <EntityCard.Title
            className={twMerge("text-lg", truncateCharsClassName)}
          >
            {entity.titulo}
          </EntityCard.Title>
          <div className="flex justify-between gap-6 mt-2">
            <div className="flex flex-col w-1/2">
              <div className="flex">
                <p className="text-gray-2 text-sm font-semibold">
                  Autores:&nbsp;
                </p>
                <EntityCard.Authors
                  className={twMerge("text-sm", truncateCharsClassName)}
                  authors={entity.autores}
                />
              </div>
              <div className="flex">
                <p className="text-gray-2 text-sm font-semibold">
                  Tutores:&nbsp;
                </p>
                <EntityCard.Tutors
                  className={twMerge("text-sm", truncateCharsClassName)}
                  tutors={entity.tutores}
                />
              </div>
            </div>
            <div className="flex flex-col w-1/2">
              <div className="flex">
                <p className="text-gray-2 text-sm font-semibold">
                  Productos:&nbsp;
                </p>
                <EntityCard.RelatedProducts
                  className={twMerge("text-sm", truncateCharsClassName)}
                  products={entity.productos}
                />
              </div>
              <div className="flex">
                <p className="text-gray-2 text-sm font-semibold">
                  Inversión:&nbsp;
                </p>
                <EntityCard.Investment
                  className={twMerge(
                    "text-sm font-semibold",
                    truncateCharsClassName
                  )}
                  investment={entity.inversion}
                />
              </div>
            </div>
          </div>
        </div>
        <span className="mx-3 h-auto bg-black w-px"></span>
        <div className="flex-grow">
          <EntityCard.Dates
            startDate={entity.fecha_inicio}
            endDate={entity.fecha_culminacion}
            className="text-sm"
          />
          <div className={twMerge("flex flex-col", className)}></div>
          <p className="text-sm font-semibold text-gray-2">Palabras clave:</p>
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
