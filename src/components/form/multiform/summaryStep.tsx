import React from 'react';

interface SummaryStepProps {
  data: Record<string, any>;
  mode: "Proyectos" | "Investigaciones";
}

const SummaryStep: React.FC<SummaryStepProps> = ({ data,  }) => {
  const fieldLabels: Record<string, string> = {
    titulo: "Título",
    descripcion: "Descripción",
    areas_tematicas_id: "Áreas Temáticas",
    proyecto_id: "Proyecto",
    inversion: "Inversión",
    responsable: "Responsable",
    creador: "Creador",
    "palabra-1": "Palabra Clave 1",
    "palabra-2": "Palabra Clave 2",
    "palabra-3": "Palabra Clave 3",
  };


  const getFieldLabel = (key: string): string => {
    if (key.startsWith("cedula-")) {
      const index = key.split("-")[1]; 
      return `Cédula ${index}`;
    }
    return fieldLabels[key] || key; 
  };


  const autores = Object.entries(data)
    .filter(([key]) => key.startsWith("cedula-") && parseInt(key.split("-")[1]) <= 4)
    .map(([_, value]) => value);

  const tutores = Object.entries(data)
    .filter(([key]) => key.startsWith("cedula-") && parseInt(key.split("-")[1]) > 4)
    .map(([_, value]) => value);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-semibold text-2xl text-green text-center mb-4">
        Revisión Final
      </h2>


      <h2 className="font-semibold text-xl text-lightblue">
        {data.titulo}
      </h2>


      {data["palabra-1"] || data["palabra-2"] || data["palabra-3"] ? (
        <div className="flex gap-2">
          {data["palabra-1"] && <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{data["palabra-1"]}</span>}
          {data["palabra-2"] && <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{data["palabra-2"]}</span>}
          {data["palabra-3"] && <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{data["palabra-3"]}</span>}
        </div>
      ) : null}


      <div className="flex gap-6">

        <div className="w-3/4 border-r border-gray-300 pr-6"> 
          <h3 className="font-medium text-sm text-gray-500 mb-2">Descripción</h3> 
          <p className="text-gray-700 mb-4">{data.descripcion}</p>

          <h3 className="font-medium text-sm text-gray-500 mb-2">Autores</h3>
          <ul className="list-disc list-inside mb-4">
            {autores.map((autor, index) => (
              <li key={index}>{autor}</li>
            ))}
          </ul>

          <h3 className="font-medium text-sm text-gray-500 mb-2">Tutores</h3>
          <ul className="list-disc list-inside mb-4">
            {tutores.map((tutor, index) => (
              <li key={index}>{tutor}</li>
            ))}
          </ul>

          <h3 className="font-medium text-sm text-gray-500 mb-2">Áreas Temáticas</h3>
          <p className="text-gray-700">{data.areas_tematicas_id}</p>
        </div>


        <div className="w-1/4 pl-6"> 
          {data.proyecto_id && (
            <>
              <h3 className="font-medium text-sm text-gray-500 mb-2">Proyecto</h3>
              <p className="text-gray-700 mb-4">{data.proyecto_id}</p>
            </>
          )}

          {data.responsable && (
            <>
              <h3 className="font-medium text-sm text-gray-500 mb-2">Responsable</h3>
              <p className="text-gray-700 mb-4">{data.responsable}</p>
            </>
          )}

          {data.creador && (
            <>
              <h3 className="font-medium text-sm text-gray-500 mb-2">Creador</h3>
              <p className="text-gray-700 mb-4">{data.creador}</p>
            </>
          )}

          <h3 className="font-medium text-sm text-gray-500 mb-2">Inversión</h3>
          <p className="text-gray-700">${data.inversion}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryStep;