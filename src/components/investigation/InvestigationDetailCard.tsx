import { useState, useEffect } from "react";
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
  const [editedAutoresCedulas, setEditedAutoresCedulas] = useState<string[]>([""]); // Cédulas de autores
  const [editedTutoresCedulas, setEditedTutoresCedulas] = useState<string[]>([""]); // Cédulas de tutores
  const [editedAutoresIds, setEditedAutoresIds] = useState<string[]>([]); // IDs de autores
  const [editedTutoresIds, setEditedTutoresIds] = useState<string[]>([]); // IDs de tutores
  const [authorVerifications, setAuthorVerifications] = useState<{ [key: string]: { isValid: boolean; nombre?: string; id?: string } }>({});
  const [tutorVerifications, setTutorVerifications] = useState<{ [key: string]: { isValid: boolean; nombre?: string; id?: string } }>({});
  const [isLoading, setIsLoading] = useState(false);

  const baseClasses = "max-w-4xl w-11/12 bg-white border border-lightblue rounded-xl overflow-hidden p-6";
  const mergedClasses = twMerge(baseClasses, className);

  const verifyCedula = async (cedula: string, type: "tutor" | "author") => {
    if (cedula.length === 8) {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(`/personas?identificacion=${cedula}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        if (data.success && data.data.list.length > 0) {
          const persona = data.data.list[0];
          const nombreCompleto = `${persona.nombre} ${persona.apellido}`.trim();
          const id = persona.id; // Asumiendo que el ID está en el campo 'id'

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
              [cedula]: { isValid: false, nombre: "Cédula no se encuentra" },
            }));
          } else {
            setAuthorVerifications((prev) => ({
              ...prev,
              [cedula]: { isValid: false, nombre: "Cédula no se encuentra" },
            }));
          }
        }
      } catch (error) {
        console.error("Error al verificar la cédula:", error);
        if (type === "tutor") {
          setTutorVerifications((prev) => ({
            ...prev,
            [cedula]: { isValid: false, nombre: "Cédula no se encuentra" },
          }));
        } else {
          setAuthorVerifications((prev) => ({
            ...prev,
            [cedula]: { isValid: false, nombre: "Cédula no se encuentra" },
          }));
        }
      }
    }
  };

  useEffect(() => {
    if (isEditing) {
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
    }
  }, [editedAutoresCedulas, editedTutoresCedulas, isEditing]);

  // Actualizar IDs cuando cambian las verificaciones
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

  const handleAutorChange = (index: number, value: string) => {
    const newCedulas = [...editedAutoresCedulas];
    newCedulas[index] = value;
    setEditedAutoresCedulas(newCedulas);
    if (value.length === 8) {
      verifyCedula(value, "author");
    }
  };

  const handleAddTutor = () => {
    setEditedTutoresCedulas([...editedTutoresCedulas, ""]);
  };

  const handleRemoveTutor = (index: number) => {
    const newCedulas = [...editedTutoresCedulas];
    newCedulas.splice(index, 1);
    setEditedTutoresCedulas(newCedulas.length > 0 ? newCedulas : [""]);
  };

  const handleTutorChange = (index: number, value: string) => {
    const newCedulas = [...editedTutoresCedulas];
    newCedulas[index] = value;
    setEditedTutoresCedulas(newCedulas);
    if (value.length === 8) {
      verifyCedula(value, "tutor");
    }
  };

  const handleSave = async () => {
    if (!editedTitle.trim() || !editedDescription.trim()) {
      alert("El título y la descripción no pueden estar vacíos.");
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

    console.log("Datos enviados al backend:", updatedData);

    setIsLoading(true);
    try {
      await updateInvestigationDetails(entity.id, updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      alert("Hubo un error al guardar los cambios. Por favor, inténtalo de nuevo.");
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
    setIsEditing(false);
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
          aria-label="Título de la investigación"
        />
      ) : (
        <EntityCard.Title className="text-3xl" />
      )}

      <div className="flex gap-2 flex-wrap mt-3">
        {isEditing ? (
          <div className="flex flex-col gap-2">
            {editedKeywords.map((keyword, index) => (
              <div key={index} className="flex items-center border border-gray-300 p-2 rounded">
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
            <button onClick={handleAddKeyword} className="p-2 bg-green text-white rounded-lg flex items-center gap-2">
              <FaPlus />
              Agregar palabra
            </button>
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
                className="border border-gray-300 p-2 rounded"
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
                    <div className="flex items-center border border-gray-300 p-2 rounded">
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
                      <div className="flex items-center gap-2">
                        {authorVerifications[cedula] ? (
                          <>
                            <span style={{ color: authorVerifications[cedula].isValid ? "green" : "red" }}>
                              {authorVerifications[cedula].isValid ? "✓" : "X"}
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
                <button onClick={handleAddAutor} className="p-2 bg-green text-white rounded-lg flex items-center gap-2">
                  <FaPlus />
                  Agregar Autor
                </button>
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
                    <div className="flex items-center border border-gray-300 p-2 rounded">
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
                      <div className="flex items-center gap-2">
                        {tutorVerifications[cedula] ? (
                          <>
                            <span style={{ color: tutorVerifications[cedula].isValid ? "green" : "red" }}>
                              {tutorVerifications[cedula].isValid ? "✓" : "X"}
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
                <button onClick={handleAddTutor} className="p-2 bg-green text-white rounded-lg flex items-center gap-2">
                  <FaPlus />
                  Agregar Tutor
                </button>
              </div>
            ) : (
              <EntityCard.RelatedPeople people={entity.tutores} showText={false} />
            )
          )}
        </div>

        <div className="relative mx-3 h-auto bg-black w-px flex items-center justify-center">
          <button
            onClick={isEditing ? handleCancel : () => setIsEditing(true)}
            className="absolute bg-white p-1 rounded-full shadow-lg"
            aria-label={isEditing ? "Cancelar edición" : "Editar investigación"}
          >
            {isEditing ? <FaTimes className="w-6 h-6 text-red-500" /> : <FaEdit className="w-6 h-6 text-blue-500" />}
          </button>
        </div>

        <div className="w-2/5 flex flex-col gap-3 justify-between">
          <EntityCard.StartDate className="text-base" startDate={entity.fecha_inicio} icon />
          <EntityCard.EndDate className="text-base" endDate={entity.fecha_culminacion} icon />
          {entity.productos && renderItem(
            itemHeader(productos, "Productos"),
            <EntityCard.Products showText={false} className="text-base text-lightblue" products={entity.productos} />
          )}
          {renderItem(
            itemHeader(inversion, "Inversión"),
            isEditing ? (
              <input
                type="text"
                value={editedInvestment}
                onChange={(e) => setEditedInvestment(parseFloat(e.target.value))}
                className="border border-gray-300 p-2 rounded"
                aria-label="Inversión de la investigación"
              />
            ) : (
              <EntityCard.Investment className="text-base" investment={entity.inversion} showText={false} />
            ),
            "flex-row"
          )}
          <div className="flex gap-2 w-full">
            {isEditing ? (
              <Button onClick={handleSave} disabled={isLoading} className="w-full flex gap-2 items-center justify-center">
                {isLoading ? "Guardando..." : (
                  <>
                    <FaCheck className="text-green-500" />
                    Guardar Cambios
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={() => updateInvestigationState(entity.id, EntityStatus.FINISHED)}
                disabled={isEditing}
                className="w-full flex gap-2 items-center justify-center"
              >
                <FaCheck className="text-green-500" />
                Finalizar Investigación
              </Button>
            )}
          </div>
        </div>
      </div>
    </EntityCard>
  );
};

export default InvestigationDetailCard;