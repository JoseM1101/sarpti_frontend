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
import { useMessage } from "../../hooks/useMessage"
import { MessageType } from "../../types/Message"

interface InvestigationDetailCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  className?: string
  entity: Investigation
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
  entity,
}: InvestigationDetailCardProps) => {
  const baseClasses =
    "max-w-4xl w-11/12 bg-white border border-lightblue rounded-xl overflow-hidden p-6"
  const mergedClasses = twMerge(baseClasses, className)
  const { showMessage } = useMessage();

  return (
    <EntityCard className={mergedClasses} entity={entity}>
      <EntityCard.Badge className="w-7 h-7 rounded-br-3xl" />
      <EntityCard.Title className="text-3xl" />
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
            <EntityCard.Description />
          )}
          {renderItem(
            itemHeader(autores, "Autores"),
            <EntityCard.RelatedPeople
              people={entity.autores}
              showText={false}
            />
          )}
          {renderItem(
            itemHeader(tutores, "Tutores"),
            <EntityCard.RelatedPeople
              people={entity.tutores}
              showText={false}
            />
          )}
        </div>
        <span className="mx-3 h-auto bg-black w-px"></span>
        <div className="w-2/5 flex flex-col gap-3 justify-between">
          <EntityCard.StartDate
            className="text-base"
            startDate={entity.fecha_inicio}
            icon
          />
          <EntityCard.EndDate
            className="text-base"
            endDate={entity.fecha_culminacion}
            icon
          />
          {entity.productos &&
            renderItem(
              itemHeader(productos, "Productos"),
              <EntityCard.Products
                showText={false}
                className="text-base text-lightblue"
                products={entity.productos}
              />
            )}
          {renderItem(
            itemHeader(inversion, "Inversion:"),
            <EntityCard.Investment
              className="text-base"
              investment={entity.inversion}
              showText={false}
            />,
            "flex-row"
          )}
          <div className="flex gap-2 w-full">
            {entity.estatus === EntityStatus.ACTIVE ? (
              <>
                <img
                  onClick={() =>
                    updateInvestigationState(entity.id, EntityStatus.CANCELLED)
                      .then(() => {
                        showMessage({
                          type: MessageType.SUCCESS,
                          title: "Investigación Cancelada",
                          content: "La investigación ha sido cancelada correctamente."
                        });
                      })
                      .catch((error) => {
                        showMessage({
                          type: MessageType.ERROR,
                          title: "Error al cancelar",
                          content:
                            error?.response?.data?.message ||
                            "No se pudo cancelar la investigación."
                        });
                      })
                  }
                  className="cursor-pointer"
                  src={stop}
                  alt=""
                />
                <img
                  onClick={() =>
                    updateInvestigationState(entity.id, EntityStatus.INACTIVE)
                      .then(() => {
                        showMessage({
                          type: MessageType.SUCCESS,
                          title: "Investigación Pausada",
                          content: "La investigación ha sido pausada correctamente."
                        });
                      })
                      .catch((error) => {
                        showMessage({
                          type: MessageType.ERROR,
                          title: "Error al pausar",
                          content:
                            error?.response?.data?.message ||
                            "No se pudo pausar la investigación."
                        });
                      })
                  }
                  className="cursor-pointer"
                  src={pause}
                  alt=""
                />
                <Button
                  onClick={() =>
                    updateInvestigationState(entity.id, EntityStatus.FINISHED)
                      .then(() => {
                        showMessage({
                          type: MessageType.SUCCESS,
                          title: "Investigación Finalizada",
                          content: "La investigación ha finalizado correctamente."
                        });
                      })
                      .catch((error) => {
                        showMessage({
                          type: MessageType.ERROR,
                          title: "Error al finalizar",
                          content:
                            error?.response?.data?.message ||
                            "No se pudo finalizar la investigación."
                        });
                      })
                  }
                  className="w-full flex gap-2 items-center justify-center"
                >
                  <img src={check} alt="" />
                  Finalizar Investigacion
                </Button>
              </>
            ) : (
              <Button
                bgColor="green"
                onClick={() =>
                  updateInvestigationState(entity.id, EntityStatus.ACTIVE)
                    .then(() => {
                      showMessage({
                        type: MessageType.SUCCESS,
                        title: "Investigación Reactivada",
                        content: "La investigación ha sido reactivada correctamente."
                      });
                    })
                    .catch((error) => {
                      showMessage({
                        type: MessageType.ERROR,
                        title: "Error al reactivar",
                        content:
                          error?.response?.data?.message ||
                          "No se pudo reactivar la investigación."
                      });
                    })
                }
                className="w-full flex gap-2 items-center justify-center"
              >
                Reactivar Investigacion
              </Button>
            )}
          </div>
        </div>
      </div>
    </EntityCard>
  )
}

export default InvestigationDetailCard
