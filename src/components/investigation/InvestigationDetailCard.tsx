import { twMerge } from "tailwind-merge"
import { Investigation } from "../../types/Investigation"
import EntityCard from "../entity/EntityCard"
import Button from "../common/Button"
import pause from "../../assets/images/pause.png"
import stop from "../../assets/images/stop.png"
import descripcion from "../../assets/icons/descripcion.png"
import autores from "../../assets/icons/autores.png"
import tutores from "../../assets/icons/tutores.png"
import productos from "../../assets/icons/productos.png"
import inversion from "../../assets/icons/inversion.png"
import check from "../../assets/icons/check.png"
import { updateInvestigationState } from "../../api/investigations"
import { EntityStatus } from "../../types/Entity"

interface EntityDetailCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  className?: string
  investigation: Investigation
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

const InvestigationDetailCard = ({
  className,
  investigation,
}: EntityDetailCardProps) => {
  const baseClasses =
    "w-11/12 bg-white border border-lightblue rounded-xl overflow-hidden p-6"
  const mergedClasses = twMerge(baseClasses, className)

  return (
    <EntityCard className={mergedClasses} entity={investigation}>
      {/* <Badge state={investigation.estatus} className="w-7 h-7 rounded-br-3xl" /> */}
      <EntityCard.Title className="text-3xl" />
      <div className="flex gap-2 flex-wrap mt-3">
        <EntityCard.Keywords
          keywords={investigation.keywords}
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
            <EntityCard.Description />
          )}
          {renderItem(
            itemHeader(autores, "Autores"),
            <EntityCard.RelatedPeople people={investigation.autores} />
          )}
          {renderItem(
            itemHeader(tutores, "Tutores"),
            <EntityCard.RelatedPeople people={investigation.tutores} />
          )}
        </div>
        <span className="mx-3 h-auto bg-black w-px"></span>
        <div className="w-2/5 flex flex-col gap-3 justify-between">
          <EntityCard.StartDate startDate={investigation.fecha_inicio} icon />
          <EntityCard.EndDate endDate={investigation.fecha_culminacion} icon />
          {investigation.productos &&
            renderItem(
              itemHeader(productos, "Productos"),
              <EntityCard.Products
                className="text-lightblue"
                products={investigation.productos}
              />
            )}
          {renderItem(
            itemHeader(inversion, "Inversion:"),
            <EntityCard.Investment investment={investigation.inversion} />,
            "flex-row"
          )}
          <div className="flex gap-2 w-full">
            <img
              onClick={() =>
                updateInvestigationState(
                  investigation.id,
                  EntityStatus.CANCELLED
                )
              }
              className="cursor-pointer"
              src={stop}
              alt=""
            />
            <img
              onClick={() =>
                updateInvestigationState(
                  investigation.id,
                  EntityStatus.INACTIVE
                )
              }
              className="cursor-pointer"
              src={pause}
              alt=""
            />
            <Button
              onClick={() =>
                updateInvestigationState(
                  investigation.id,
                  EntityStatus.FINISHED
                )
              }
              className="w-full flex gap-2 items-center justify-center"
            >
              <img src={check} alt="" />
              Finalizar Investigacion
            </Button>
          </div>
        </div>
      </div>
    </EntityCard>
  )
}

export default InvestigationDetailCard
