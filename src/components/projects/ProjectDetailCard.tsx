import { twMerge } from "tailwind-merge"
import { Project } from "../../types/Project"
import EntityCard from "../entity/EntityCard"
import Button from "../common/Button"
import descripcion from "../../assets/icons/descripcion.png"
import autores from "../../assets/icons/autores.png"
import { updateProjectState } from "../../api/projects"
import { EntityStatus } from "../../types/Entity"

interface ProjectDetailCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  className?: string
  entity: Project
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

const ProjectDetailCard = ({ className, entity }: ProjectDetailCardProps) => {
  const baseClasses =
    "w-11/12 bg-white border border-lightblue rounded-xl overflow-hidden p-6"
  const mergedClasses = twMerge(baseClasses, className)

  return (
    <EntityCard className={mergedClasses} entity={entity}>
      <EntityCard.Badge className="w-7 h-7 rounded-br-3xl" />
      <EntityCard.Title className="text-3xl" />
      <div className="flex mt-3">
        <div className="w-4/6 flex flex-col">
          {renderItem(
            itemHeader(descripcion, "Descripción"),
            <p className="text-gray-2 font-semibold">{entity.descripcion}</p>
          )}
          {renderItem(
            itemHeader(descripcion, "Lineas de Investigacion"),
            <p className="text-gray-2 ml-5 font-semibold">
              <span className="text-gray-2">Area tematica: </span>
              {entity.areas_tematicas}
            </p>,
            "mt-4"
          )}
        </div>
        <span className="mx-3 h-auto bg-black w-px"></span>
        <div className="w-2/6 flex flex-col justify-between gap-2 w-full">
          <EntityCard.StartDate
            className="text-base"
            startDate={entity.fecha_creacion}
          />
          <div className="flex gap-2">
            <img className="object-contain" src={autores} alt="" />
            <p className="text-gray-2 font-semibold">Responsable:</p>
            <p className="text-gray-3 font-semibold">{entity.responsable}</p>
          </div>
          <div className="flex gap-2">
            <img className="object-contain" src={autores} alt="" />
            <p className="text-gray-2 font-semibold">Creador:</p>
            <p className="text-gray-3 font-semibold">{entity.creador}</p>
          </div>
          {entity.estatus === EntityStatus.ACTIVE ? (
            <Button
              bgColor="red"
              onClick={() =>
                updateProjectState(entity.id, EntityStatus.INACTIVE)
              }
              className="w-full flex gap-2 items-center justify-center"
            >
              Desactivar Proyecto
            </Button>
          ) : (
            <Button
              bgColor="green"
              onClick={() => updateProjectState(entity.id, EntityStatus.ACTIVE)}
              className="w-full flex gap-2 items-center justify-center"
            >
              Activar Proyecto
            </Button>
          )}
        </div>
      </div>
    </EntityCard>
  )
}

export default ProjectDetailCard
