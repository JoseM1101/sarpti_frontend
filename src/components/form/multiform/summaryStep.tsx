import React from 'react';

interface SummaryStepProps {
  data: Record<string, any>;
  mode : "Proyectos" | "Investigaciones";
}

const SummaryStep: React.FC<SummaryStepProps> = ({ data, mode }) => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-semibold text-lg text-lightblue">
        Resumen de {mode}
      </h2>
      <div className="bg-gray-100 p-4 rounded-lg">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex justify-between border-b py-2">
            <span className="font-medium">{key}:</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SummaryStep;