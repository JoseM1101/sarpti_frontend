import { useState } from "react";
import { useFormContext } from "react-hook-form";

const FormTwo = () => {
  const { register } = useFormContext();
  const [tutorCount, setTutorCount] = useState(1); 
  const [authorCount, setAuthorCount] = useState(1); 

  const handleAddTutor = () => {
    setTutorCount((prev) => prev + 1);
  };

  const handleAddAuthor = () => {
    setAuthorCount((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-4">Tutores</h2>
          {[...Array(tutorCount)].map((_, index) => (
            <div key={index} className="flex flex-col gap-3">
              <input
                type="text"
                {...register(`cedula-${index + 1}`, { required: true })}
                placeholder="Cédula"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        </div>

        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-4">Autores</h2>
          {[...Array(authorCount)].map((_, index) => (
            <div key={index} className="flex flex-col gap-3">
              <input
                type="text"
                {...register(`cedula-${index + 5}`, { required: index < 1 })} // Solo el primer autor es requerido
                placeholder="Cédula"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        </div>
      </div>
    </div>
  );
};

export default FormTwo;