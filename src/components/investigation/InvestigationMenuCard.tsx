import { twMerge } from "tailwind-merge"
import EntityCard from "../entity/EntityCard"
import { Investigation } from "../../types/Investigation"

interface InvestigationMenuCardProps {
  investigation: Investigation
  className?: string
}

const InvestigationMenuCard: React.FC<InvestigationMenuCardProps> = ({
  investigation,
  className,
}) => {
  const baseClasses = "p-4 w-full overflow-hidden"
  const mergedClasses = twMerge(baseClasses, className)
  const truncateCharsClassName =
    "overflow-hidden whitespace-nowrap text-ellipsis truncate"

  return (
    <EntityCard className={mergedClasses} entity={investigation}>
      <EntityCard.Badge />
      <div className="flex">
        <div className="w-8/12">
          <EntityCard.Title className={truncateCharsClassName} />
          <div className="mt-2 flex gap-4 justify-between">
            <div className="w-8/12">
              <EntityCard.RelatedPeople
                namespace="Autores"
                people={investigation.autores}
                className={truncateCharsClassName}
              />
              <EntityCard.RelatedPeople
                namespace="Tutores"
                people={investigation.tutores}
                className={truncateCharsClassName}
              />
            </div>
            <div className="w-4/12 overflow-hidden">
              {investigation.productos && (
                <EntityCard.Products
                  className={truncateCharsClassName}
                  products={investigation.productos}
                />
              )}
              <EntityCard.Investment investment={investigation.inversion} />
            </div>
          </div>
        </div>
        <span className="mx-3 h-auto bg-black w-px"></span>
        <div className="flex-grow flex flex-col justify-between">
          <EntityCard.StartDate startDate={investigation.fecha_inicio} />
          <EntityCard.EndDate endDate={investigation.fecha_culminacion} />
          <EntityCard.Keywords keywords={investigation.keywords} />
        </div>
      </div>
    </EntityCard>
  )
}

export default InvestigationMenuCard
