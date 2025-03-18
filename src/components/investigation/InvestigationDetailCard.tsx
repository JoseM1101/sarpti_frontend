import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Investigation } from "../../types/Investigation";
import EntityCard from "../entity/EntityCard";
import Button from "../common/Button";
import pause from "../../assets/images/pause.png";
import stop from "../../assets/images/stop.png";
import descripcion from "../../assets/icons/descripcion.png";
import autores from "../../assets/icons/autores.png";
import tutores from "../../assets/icons/tutores.png";
import productos from "../../assets/icons/productos.png";
import inversion from "../../assets/icons/inversion.png";
import { updateInvestigationState, updateInvestigationDetails } from "../../api/investigations";
import { EntityStatus } from "../../types/Entity";
import { FaCheck, FaEdit, FaTimes } from "react-icons/fa";

interface InvestigationDetailCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  className?: string;
  entity: Investigation;
}

const itemHeader = (icon: string, text: string) => {
  return (
    <div className="flex gap-2 items-center">
      <img className="object-contain" src={icon} alt="" />
      <p className="font-semibold text-gray-2">{text}</p>
    </div>
  );
};

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
  );
};

const InvestigationDetailCard = ({
  className,
  entity,
}: InvestigationDetailCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(entity.titulo);
  const [editedDescription, setEditedDescription] = useState(entity.descripcion);
  const [editedInvestment, setEditedInvestment] = useState(entity.inversion);

  const baseClasses =
    "max-w-4xl w-11/12 bg-white border border-lightblue rounded-xl overflow-hidden p-6";
  const mergedClasses = twMerge(baseClasses, className);

  const handleSave = async () => {
    const updatedData = {
      titulo: editedTitle,
      descripcion: editedDescription,
      inversion: editedInvestment,
    };
  
    try {
      await updateInvestigationDetails(entity.id, updatedData);
      setIsEditing(false); // Desactiva el modo de edición
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      // Puedes mostrar un mensaje de error al usuario si lo deseas
    }
  };

  const handleCancel = () => {
    // Restaura los valores originales
    setEditedTitle(entity.titulo);
    setEditedDescription(entity.descripcion);
    setEditedInvestment(entity.inversion);
    setIsEditing(false); // Desactiva el modo de edición
  };

  return (
    <EntityCard className={mergedClasses} entity={entity}>
      <EntityCard.Badge className="w-7 h-7 rounded-br-3xl" />
      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="text-3xl border border-gray-300 p-2 rounded"
        />
      ) : (
        <EntityCard.Title className="text-3xl" />
      )}
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
            isEditing ? (
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="border border-gray-300 p-2 rounded"
              />
            ) : (
              <EntityCard.Description />
            )
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
        {/* <span className="mx-3 h-auto bg-black w-px"></span> */}
        <div className="relative mx-3 h-auto bg-black w-px flex items-center justify-center">
          <button
            onClick={isEditing ? handleCancel : () => setIsEditing(true)}
            className="absolute bg-white p-1 rounded-full shadow-lg"
          >
            {isEditing ? (
              <FaTimes className="w-6 h-6 text-red-500" /> // Ícono de cancelar
            ) : (
              <FaEdit className="w-6 h-6 text-blue-500" /> // Ícono de editar
            )}
          </button>
        </div>
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
            isEditing ? (
              <input
              type="text"
              value={editedInvestment}
              onChange={(e) => setEditedInvestment(parseFloat(e.target.value))}
              className="border border-gray-300 p-2 rounded"
            />
            ) : (
              <EntityCard.Investment
                className="text-base"
                investment={entity.inversion}
                showText={false}
              />
            ),
            "flex-row"
          )}
          <div className="flex gap-2 w-full">
           {/*  {isEditing ? (
              <Button
                onClick={handleSave}
                className="w-full flex gap-2 items-center justify-center"
              >
                Guardar Cambios
              </Button>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="w-full flex gap-2 items-center justify-center"
              >
                Editar
              </Button>
            )} */}
            {entity.estatus === EntityStatus.ACTIVE ? (
              <>
                <img
                  onClick={() =>
                    updateInvestigationState(entity.id, EntityStatus.CANCELLED)
                  }
                  className="cursor-pointer"
                  src={stop}
                  alt=""
                />
                <img
                  onClick={() =>
                    updateInvestigationState(entity.id, EntityStatus.INACTIVE)
                  }
                  className="cursor-pointer"
                  src={pause}
                  alt=""
                />
                {isEditing ? (
              <Button
                onClick={handleSave}
                className="w-full flex gap-2 items-center justify-center"
              >
                <FaCheck className="text-green-500" />
                Guardar Cambios
              </Button>
            ) : (
              <Button
                onClick={() =>
                  updateInvestigationState(entity.id, EntityStatus.FINISHED)
                }
                className="w-full flex gap-2 items-center justify-center"
              >
                <FaCheck className="text-green-500" />
                Finalizar Investigación
              </Button>
            )}
              </>
            ) : (
              <Button
                bgColor="green"
                onClick={() =>
                  updateInvestigationState(entity.id, EntityStatus.ACTIVE)
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
  );
};

export default InvestigationDetailCard;