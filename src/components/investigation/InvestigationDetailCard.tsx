import { useState, useEffect, useCallback } from "react";
import { twMerge } from "tailwind-merge";
import { Investigation } from "../../types/Investigation";
import EntityCard from "../entity/EntityCard";
import Button from "../common/Button";
import descripcion from "../../assets/icons/descripcion.png";
import autores from "../../assets/icons/autores.png";
import tutores from "../../assets/icons/tutores.png";
import productos from "../../assets/icons/productos.png";
import inversion from "../../assets/icons/inversion.png";
import { updateInvestigationState, updateInvestigationDetails } from "../../api/investigations";
import { EntityStatus } from "../../types/Entity";
import { FaCheck, FaEdit, FaTimes, FaPlus, FaTrash } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import { useMessage } from "../../hooks/useMessage";
import { MessageType } from "../../types/Message";
import pause from "../../assets/images/pause.png";
import stop from "../../assets/images/stop.png";
import Legend from "../entity/Legend";
import { createPortal } from "react-dom";

interface InvestigationDetailCardProps {
  className?: string;
  entity: Investigation;
}

const itemHeader = (icon: string, text: string) => (
  <div className="flex gap-2 items-center">
    <img className="object-contain" src={icon} alt="" />
    <p className="font-semibold text-gray-2">{text}</p>
  </div>
);

const renderItem = (header: React.ReactElement, body: React.ReactElement, className?: string) => (
  <div className={twMerge("flex flex-col gap-1", className)}>{header}{body}</div>
);

const InvestigationDetailCard = ({ className, entity }: InvestigationDetailCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(entity.titulo);
  const [editedDescription, setEditedDescription] = useState(entity.descripcion);
  const [editedInvestment, setEditedInvestment] = useState(entity.inversion);
  const [editedKeywords, setEditedKeywords] = useState(entity.keywords.length > 0 ? entity.keywords : [""]);
  const [editedAutoresCedulas, setEditedAutoresCedulas] = useState<string[]>([""]);
  const [editedTutoresCedulas, setEditedTutoresCedulas] = useState<string[]>([""]);
  const [editedAutoresIds, setEditedAutoresIds] = useState<string[]>([]);
  const [editedTutoresIds, setEditedTutoresIds] = useState<string[]>([]);
  const [authorVerifications, setAuthorVerifications] = useState<{ [key: string]: { isValid: boolean; nombre?: string; id?: string } }>({});
  const [tutorVerifications, setTutorVerifications] = useState<{ [key: string]: { isValid: boolean; nombre?: string; id?: string } }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    autores?: string;
    tutores?: string;
    general?: string;
  }>({});
  
  const { showMessage } = useMessage();

  const baseClasses = "max-w-4xl w-11/12 bg-white border border-lightblue rounded-xl overflow-hidden p-6";
  const mergedClasses = twMerge(baseClasses, className);

  const verifyCedula = useCallback(async (cedula: string, type: "tutor" | "author") => {
    if (cedula.length !== 8) return;

    if ((type === "author" && authorVerifications[cedula]) || 
        (type === "tutor" && tutorVerifications[cedula])) {
      return;
    }

    try {
      const token = Cookies.get("token");
      const response = await axios.get(`/personas?identificacion=${cedula}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data;
      if (data.success && data.data.list.length > 0) {
        const persona = data.data.list[0];
        const nombreCompleto = `${persona.nombre} ${persona.apellido}`.trim();
        const id = persona.id;

        if (type === "tutor") {
          setTutorVerifications((prev) => ({
            ...prev,
            [cedula]: { isValid: true, nombre: nombreCompleto, id },
          }));
        } else {
          setAuthorVerifications((prev) => ({
            ...prev,
            [cedula]: { isValid: true, nombre: nombreCompleto, id },
          }));
        }
      } else {
        if (type === "tutor") {
          setTutorVerifications((prev) => ({
            ...prev,
            [cedula]: { isValid: false, nombre: "Cédula no encontrada" },
          }));
        } else {
          setAuthorVerifications((prev) => ({
            ...prev,
            [cedula]: { isValid: false, nombre: "Cédula no encontrada" },
          }));
        }
      }
    } catch (error) {
      console.error("Error al verificar la cédula:", error);
      if (type === "tutor") {
        setTutorVerifications((prev) => ({
          ...prev,
          [cedula]: { isValid: false, nombre: "Error al verificar" },
        }));
      } else {
        setAuthorVerifications((prev) => ({
          ...prev,
          [cedula]: { isValid: false, nombre: "Error al verificar" },
        }));
      }
    }
  }, [authorVerifications, tutorVerifications]);

  useEffect(() => {
    if (!isEditing) return;
    
    const timer = setTimeout(() => {
      editedAutoresCedulas.forEach((cedula) => {
        if (cedula && cedula.length === 8 && !authorVerifications[cedula]) {
          verifyCedula(cedula, "author");
        }
      });
      
      editedTutoresCedulas.forEach((cedula) => {
        if (cedula && cedula.length === 8 && !tutorVerifications[cedula]) {
          verifyCedula(cedula, "tutor");
        }
      });
    }, 500);
    
    return () => clearTimeout(timer);
  }, [editedAutoresCedulas, editedTutoresCedulas, isEditing, verifyCedula, authorVerifications, tutorVerifications]);

  useEffect(() => {
    const newAutoresIds = editedAutoresCedulas
      .map((cedula) => authorVerifications[cedula]?.id)
      .filter((id) => id !== undefined) as string[];
    setEditedAutoresIds(newAutoresIds);

    const newTutoresIds = editedTutoresCedulas
      .map((cedula) => tutorVerifications[cedula]?.id)
      .filter((id) => id !== undefined) as string[];
    setEditedTutoresIds(newTutoresIds);
  }, [authorVerifications, tutorVerifications, editedAutoresCedulas, editedTutoresCedulas]);

  const hasDuplicateCedulas = (cedulas: string[]): boolean => {
    const seen = new Set();
    for (const cedula of cedulas) {
      if (cedula && cedula.length === 8) {
        if (seen.has(cedula)) {
          return true;
        }
        seen.add(cedula);
      }
    }
    return false;
  };

  const hasCrossDuplicates = (autoresCedulas: string[], tutoresCedulas: string[]): boolean => {
    const autorSet = new Set(autoresCedulas.filter(cedula => cedula && cedula.length === 8));
    for (const cedula of tutoresCedulas) {
      if (cedula && cedula.length === 8 && autorSet.has(cedula)) {
        return true;
      }
    }
    return false;
  };

  const handleAddKeyword = () => {
    setEditedKeywords([...editedKeywords, ""]);
  };

  const handleRemoveKeyword = (index: number) => {
    const newKeywords = [...editedKeywords];
    newKeywords.splice(index, 1);
    setEditedKeywords(newKeywords.length > 0 ? newKeywords : [""]);
  };

  const handleKeywordChange = (index: number, value: string) => {
    const newKeywords = [...editedKeywords];
    newKeywords[index] = value;
    setEditedKeywords(newKeywords);
  };

  const handleAddAutor = () => {
    setEditedAutoresCedulas([...editedAutoresCedulas, ""]);
  };

  const handleRemoveAutor = (index: number) => {
    const newCedulas = [...editedAutoresCedulas];
    newCedulas.splice(index, 1);
    setEditedAutoresCedulas(newCedulas.length > 0 ? newCedulas : [""]);
  };

  const handleAutorChange = useCallback((index: number, value: string) => {
    const newCedulas = [...editedAutoresCedulas];
    newCedulas[index] = value;
    setEditedAutoresCedulas(newCedulas);
    
    if (value.length === 8) {
      verifyCedula(value, "author");
    }
    
    if (validationErrors.autores) {
      setValidationErrors(prev => ({ ...prev, autores: undefined }));
    }
  }, [editedAutoresCedulas, verifyCedula, validationErrors.autores]);

  const handleAddTutor = () => {
    setEditedTutoresCedulas([...editedTutoresCedulas, ""]);
  };

  const handleRemoveTutor = (index: number) => {
    const newCedulas = [...editedTutoresCedulas];
    newCedulas.splice(index, 1);
    setEditedTutoresCedulas(newCedulas.length > 0 ? newCedulas : [""]);
  };

  const handleTutorChange = useCallback((index: number, value: string) => {
    const newCedulas = [...editedTutoresCedulas];
    newCedulas[index] = value;
    setEditedTutoresCedulas(newCedulas);
    
    if (value.length === 8) {
      verifyCedula(value, "tutor");
    }
    
    if (validationErrors.tutores) {
      setValidationErrors(prev => ({ ...prev, tutores: undefined }));
    }
  }, [editedTutoresCedulas, verifyCedula, validationErrors.tutores]);

  const handleSave = async () => {
    setValidationErrors({});

    if (!editedTitle.trim() || !editedDescription.trim()) {
      showMessage({
        type: MessageType.ERROR,
        title: "Campos requeridos",
        content: "El título y la descripción no pueden estar vacíos.",
      });
      return;
    }

    const errors: typeof validationErrors = {};
    let hasErrors = false;

    if (hasDuplicateCedulas(editedAutoresCedulas)) {
      errors.autores = "Hay cédulas duplicadas en los autores";
      hasErrors = true;
    }

    if (hasDuplicateCedulas(editedTutoresCedulas)) {
      errors.tutores = "Hay cédulas duplicadas en los tutores";
      hasErrors = true;
    }

    if (hasCrossDuplicates(editedAutoresCedulas, editedTutoresCedulas)) {
      errors.general = "Una cédula no puede estar en autores y tutores";
      hasErrors = true;
    }

    const invalidAutores = editedAutoresCedulas.filter(
      cedula => cedula && cedula.length === 8 && 
      (!authorVerifications[cedula] || !authorVerifications[cedula].isValid)
    );

    const invalidTutores = editedTutoresCedulas.filter(
      cedula => cedula && cedula.length === 8 && 
      (!tutorVerifications[cedula] || !tutorVerifications[cedula].isValid)
    );

    if (invalidAutores.length > 0) {
      errors.autores = "Algunas cédulas de autores no son válidas";
      hasErrors = true;
    }

    if (invalidTutores.length > 0) {
      errors.tutores = "Algunas cédulas de tutores no son válidas";
      hasErrors = true;
    }

    if (hasErrors) {
      setValidationErrors(errors);
      return;
    }

    const updatedData: Partial<Investigation> = {
      titulo: editedTitle,
      descripcion: editedDescription,
      inversion: editedInvestment,
      keywords: editedKeywords.filter((word) => word.trim() !== ""),
      autores: editedAutoresIds,
      tutores: editedTutoresIds,
    };

    setIsLoading(true);
    try {
      await updateInvestigationDetails(entity.id, updatedData);
      setIsEditing(false);
      showMessage({
        type: MessageType.SUCCESS,
        title: "Cambios guardados",
        content: "Los cambios se han guardado exitosamente.",
      });
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      showMessage({
        type: MessageType.ERROR,
        title: "Error al guardar",
        content: "Hubo un error al guardar los cambios. Por favor, inténtalo de nuevo.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedTitle(entity.titulo);
    setEditedDescription(entity.descripcion);
    setEditedInvestment(entity.inversion);
    setEditedKeywords(entity.keywords.length > 0 ? entity.keywords : [""]);
    setEditedAutoresCedulas([""]);
    setEditedTutoresCedulas([""]);
    setAuthorVerifications({});
    setTutorVerifications({});
    setEditedAutoresIds([]);
    setEditedTutoresIds([]);
    setValidationErrors({});
    setIsEditing(false);
  };

  const handleStatusChange = async (newStatus: EntityStatus) => {
    try {
      await updateInvestigationState(entity.id, newStatus);
      showMessage({
        type: MessageType.SUCCESS,
        title: `Investigación ${getStatusText(newStatus)}`,
        content: `La investigación ha sido ${getStatusText(newStatus).toLowerCase()} correctamente.`,
      });
    } catch (error) {
      console.error(`Error al cambiar estado a ${newStatus}:`, error);
      showMessage({
        type: MessageType.ERROR,
        title: `Error al ${getStatusText(newStatus).toLowerCase()}`,
        content: error?.response?.data?.message || `No se pudo ${getStatusText(newStatus).toLowerCase()} la investigación.`,
      });
    }
  };

  const getStatusText = (status: EntityStatus): string => {
    switch (status) {
      case EntityStatus.ACTIVE: return "Reactivada";
      case EntityStatus.INACTIVE: return "Pausada";
      case EntityStatus.CANCELLED: return "Cancelada";
      case EntityStatus.FINISHED: return "Finalizada";
      default: return "";
    }
  };

  const errorMessageStyle = "bg-red text-white text-lg font-bold p-3 rounded-md mt-4";

  return (
    <EntityCard className={mergedClasses} entity={entity}>
      {createPortal(
        <Legend className="absolute top-8 left-1/2 -translate-x-1/2" />,
        document.querySelector("main") as HTMLElement
      )}
      <EntityCard.Badge className="w-7 h-7 rounded-br-3xl" />
      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="w-full text-3xl border border-lightblue text-gray-3 p-2 rounded"
          aria-label="Título de la investigación"
        />
      ) : (
        <EntityCard.Title className="text-3xl" />
      )}

      <div className="flex gap-2 flex-wrap mt-3">
        {isEditing ? (
          <div className="flex flex-col gap-2">
            {editedKeywords.map((keyword, index) => (
              <div key={index} className="flex items-center border border-lightblue text-gray-3 p-2 rounded">
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => handleKeywordChange(index, e.target.value)}
                  className="outline-none border-none bg-transparent"
                  aria-label={`Palabra clave ${index + 1}`}
                />
                <FaTrash className="ml-2 cursor-pointer text-red-500" onClick={() => handleRemoveKeyword(index)} />
              </div>
            ))}
            <Button
              bgColor="green"
              onClick={handleAddKeyword}
              className="p-2 text-white flex justify-center items-center gap-2"
            >
              <FaPlus />
              Agregar palabra
            </Button>
          </div>
        ) : (
          <EntityCard.Keywords keywords={entity.keywords} className="rounded-sm text-lightblue font-medium text-sm p-2" />
        )}
      </div>

      <div className="flex justify-between mt-10 gap-2">
        <div className="flex flex-col gap-3 w-3/5">
          {renderItem(
            itemHeader(descripcion, "Descripción"),
            isEditing ? (
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="border border-lightblue text-gray-3 p-2 rounded"
                aria-label="Descripción de la investigación"
              />
            ) : (
              <EntityCard.Description />
            )
          )}

          {renderItem(
            itemHeader(autores, "Autores"),
            isEditing ? (
              <div className="flex flex-col gap-2">
                {editedAutoresCedulas.map((cedula, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <div className="flex items-center border border-lightblue text-gray-3 p-2 rounded">
                      <input
                        type="text"
                        value={cedula}
                        onChange={(e) => handleAutorChange(index, e.target.value)}
                        className="outline-none border-none bg-transparent"
                        placeholder="Cédula"
                        aria-label={`Cédula de autor ${index + 1}`}
                      />
                      <FaTrash className="ml-2 cursor-pointer text-red-500" onClick={() => handleRemoveAutor(index)} />
                    </div>
                    {cedula && cedula.length === 8 && (
                      <div className="flex items-center gap-2 text-sm">
                        {authorVerifications[cedula] ? (
                          <>
                            <span style={{ color: authorVerifications[cedula].isValid ? "green" : "red" }}>
                              {authorVerifications[cedula].isValid ? "✓" : <span className="text-red-500">✗</span>}
                            </span>
                            <span>{authorVerifications[cedula].nombre}</span>
                          </>
                        ) : (
                          <span>Verificando...</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                <Button
                  bgColor="green"
                  onClick={handleAddAutor}
                  className="p-2 text-white flex justify-center items-center gap-2"
                >
                  <FaPlus />
                  Agregar Autor
                </Button>
              </div>
            ) : (
              <EntityCard.RelatedPeople people={entity.autores} showText={false} />
            )
          )}

          {renderItem(
            itemHeader(tutores, "Tutores"),
            isEditing ? (
              <div className="flex flex-col gap-2">
                {editedTutoresCedulas.map((cedula, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <div className="flex items-center border border-lightblue text-gray-3 p-2 rounded">
                      <input
                        type="text"
                        value={cedula}
                        onChange={(e) => handleTutorChange(index, e.target.value)}
                        className="outline-none border-none bg-transparent"
                        placeholder="Cédula"
                        aria-label={`Cédula de tutor ${index + 1}`}
                      />
                      <FaTrash className="ml-2 cursor-pointer text-red-500" onClick={() => handleRemoveTutor(index)} />
                    </div>
                    {cedula && cedula.length === 8 && (
                      <div className="flex items-center gap-2 text-sm">
                        {tutorVerifications[cedula] ? (
                          <>
                            <span style={{ color: tutorVerifications[cedula].isValid ? "green" : "red" }}>
                              {tutorVerifications[cedula].isValid ? "✓" : <span className="text-red-500">✗</span>}
                            </span>
                            <span>{tutorVerifications[cedula].nombre}</span>
                          </>
                        ) : (
                          <span>Verificando...</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                <Button
                  bgColor="green"
                  onClick={handleAddTutor}
                  className="p-2 text-white flex justify-center items-center gap-2"
                >
                  <FaPlus />
                  Agregar Tutor
                </Button>
              </div>
            ) : (
              <EntityCard.RelatedPeople people={entity.tutores} showText={false} />
            )
          )}
        </div>

        <div className="relative mx-3 h-auto bg-black w-px flex items-center justify-center">
          <Button
            onClick={isEditing ? handleCancel : () => setIsEditing(true)}
            className="absolute bg-white p-1 rounded-full shadow-none"
          >
            {isEditing ? (
              <FaTimes className="w-6 h-6 p-0.5 text-red" />
            ) : (
              <FaEdit className="w-6 h-6 p-0.5 text-lightblue" />
            )}
          </Button>
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
            itemHeader(inversion, "Inversión"),
            isEditing ? (
              <input
                type="number"
                value={editedInvestment}
                onChange={(e) => setEditedInvestment(parseFloat(e.target.value))}
                className="border border-lightblue text-gray-3 p-2 rounded"
                aria-label="Inversión de la investigación"
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
            {isEditing ? (
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="w-full flex gap-2 items-center justify-center"
              >
                {isLoading ? "Guardando..." : (
                  <>
                    <FaCheck className="text-green-500" />
                    Guardar Cambios
                  </>
                )}
              </Button>
            ) : entity.estatus === EntityStatus.ACTIVE ? (
              <>
                <img
                  onClick={() => handleStatusChange(EntityStatus.CANCELLED)}
                  className="cursor-pointer"
                  src={stop}
                  alt="Cancelar"
                />
                <img
                  onClick={() => handleStatusChange(EntityStatus.INACTIVE)}
                  className="cursor-pointer"
                  src={pause}
                  alt="Pausar"
                />
                <Button
                  onClick={() => handleStatusChange(EntityStatus.FINISHED)}
                  className="w-full flex gap-2 items-center justify-center"
                >
                  <FaCheck className="text-green-500" />
                  Finalizar Investigación
                </Button>
              </>
            ) : (
              <Button
                bgColor="green"
                onClick={() => handleStatusChange(EntityStatus.ACTIVE)}
                className="w-full flex gap-2 items-center justify-center"
              >
                Reactivar Investigación
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mensajes de error al final del componente */}
      <div className="flex flex-col gap-2 mt-4">
        {validationErrors.autores && (
          <div className={errorMessageStyle}>
            {validationErrors.autores}
          </div>
        )}
        {validationErrors.tutores && (
          <div className={errorMessageStyle}>
            {validationErrors.tutores}
          </div>
        )}
        {validationErrors.general && (
          <div className={errorMessageStyle}>
            {validationErrors.general}
          </div>
        )}
      </div>
    </EntityCard>
  );
};

export default InvestigationDetailCard;