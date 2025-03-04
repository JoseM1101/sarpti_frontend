import React from "react";

interface ProgressIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ totalSteps, currentStep }) => {
  return (
    <div className="flex justify-center items-center gap-4 mb-8">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep; 
        const isLastStep = stepNumber === totalSteps;

        return (
          <React.Fragment key={stepNumber}>

            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 
                ${
                  isLastStep && isCompleted
                    ? "border-green-500 bg-green-100 text-green "
                    : isCompleted
                    ? "border-blue-500 bg-blue-100 text-blue-600" 
                    : isCurrent
                    ? "border-blue-500 bg-blue-100 text-blue-600" 
                    : "border-gray-300 bg-gray-100 text-gray-400" 
                }`}
            >
              {isCompleted || (isLastStep && isCompleted) ? (
                <span className="font-bold">✓</span> 
              ) : (
                <span className="font-bold">{stepNumber}</span> 
              )}
            </div>

            {stepNumber < totalSteps && (
              <div
                className={`flex-1 h-1 ${
                  isCompleted ? "bg-blue-500" : "bg-gray"
                }`}
              ></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProgressIndicator;