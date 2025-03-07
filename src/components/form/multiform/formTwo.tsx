import { useState } from "react";
import { useFormContext } from "react-hook-form";

const FormTwo = () => {
  const { register } = useFormContext();
  const [tutorCount, setTutorCount] = useState(1); 
  const [authorCount, setAuthorCount] = useState(1); 

  const handleAddTutor = () => {
    if (tutorCount < 4) { 
      setTutorCount((prev) => prev + 1);
    } else {
      alert("No se pueden agregar más de 3 tutores."); 
    }
  };

  const handleRestTutor = () => {
    if (tutorCount > 1) { 
      setTutorCount((prev) => prev - 1);
    } else {
      alert("No se pueden eliminar más tutores."); 
    }
  }

  const handleAddAuthor = () => {
    if (authorCount < 4) { 
      setAuthorCount((prev) => prev + 1);
    } else {
      alert("No se pueden agregar más de 3 autores.");
    }
  };

  const handleRestAuthor = () => {
    if (authorCount > 1) { 
      setAuthorCount((prev) => prev - 1);
    } else {
      alert("No se pueden eliminar más autores.");
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-4">Tutores</h2>
          {[...Array(tutorCount)].map((_, index) => (
            <div key={index} className="flex flex-col gap-3 ">
              <input
                type="text"
                {...register(`cedula-${index + 1}`, { required: true })}
                placeholder="Cédula"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTutor}
            className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
          >
            Agregar Cédula
          </button>

          {tutorCount > 1 && (
          <button
            type="button"
            onClick={handleRestTutor}
            className="mt-4 p-2 bg-red text-white rounded-lg ml-1"
          >
            Eliminar Cédula
          </ button>
          )}
        </div>

        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-4">Autores</h2>
          {[...Array(authorCount)].map((_, index) => (
            <div key={index} className="flex flex-col gap-3">
              <input
                type="text"
                {...register(`cedula-${index + 5}`, { required: index < 1 })} 
                placeholder="Cédula"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddAuthor}
            className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
          >
            Agregar Cédula
          </button>

          {authorCount > 1 && (
            <button
              type="button"
              onClick={handleRestAuthor}
              className="mt-4 p-2 bg-red text-white rounded-lg ml-1"
            >
              Eliminar Cédula
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormTwo;