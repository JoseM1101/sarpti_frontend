import Card from "../common/Card"
import { twMerge } from "tailwind-merge"
import Entity from "../../types/Entity"
import Badge from "./Badge"
import EntityCard from "./EntityCard"
import Button from "../common/Button"
import pause from "../../assets/images/pause.png"
import stop from "../../assets/images/stop.png"
import descripcion from "../../assets/icons/descripcion.png"
import autores from "../../assets/icons/autores.png"
import tutores from "../../assets/icons/tutores.png"
import productos from "../../assets/icons/productos.png"
import inversion from "../../assets/icons/inversion.png"
import check from "../../assets/icons/check.png"

interface EntityDetailCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  className?: string
  entity: Entity
}

const itemHeader = (icon: string, text: string) => {
  return (
    <div className="flex gap-2 items-center">
      <img className="object-contain" src={icon} alt="" />
      <p className="font-semibold text-gray-2">{text}</p>
    </div>
  )
}

const renderItem = (
  header: React.ReactElement,
  body: React.ReactElement,
  className?: string
) => {
  return (
    <div className={twMerge("flex flex-col gap-1", className)}>
      {header}
      {body}
    </div>
  )
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
          {renderItem(
            itemHeader(descripcion, "Descripción"),
            <EntityCard.Description>
              {entity.description}
            </EntityCard.Description>
          )}
          {renderItem(
            itemHeader(autores, "Autores"),
            <EntityCard.Authors authors={entity.authors} />
          )}
          {renderItem(
            itemHeader(tutores, "Tutores"),
            <EntityCard.Tutors tutors={entity.tutors} />
          )}
        </div>
        <span className="mx-3 h-auto bg-black w-px"></span>
        <div className="w-2/5 flex flex-col gap-3 justify-between">
          <EntityCard.Dates
            startDate={entity.startDate}
            endDate={entity.endDate}
            icons
          />
          {renderItem(
            itemHeader(productos, "Productos"),
            <EntityCard.RelatedProducts
              className="text-lightblue"
              products={entity.relatedProducts}
            />
          )}
          {renderItem(
            itemHeader(inversion, "Inversion:"),
            <EntityCard.Investment investment={entity.investment} />,
            "flex-row"
          )}
          <div className="flex gap-2 w-full">
            <img src={stop} alt="" />
            <img src={pause} alt="" />
            <Button className="w-full flex gap-2 items-center">
              <img src={check} alt="" />
              Finalizar Investigacion
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default EntityDetailCard
