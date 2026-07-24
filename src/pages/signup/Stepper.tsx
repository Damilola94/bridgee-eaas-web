// components/pages/auth/create-account/Stepper.tsx
import React from "react";
import { Check } from "lucide-react";

interface Step {
  label: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number; 
}

export default function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex items-center justify-center flex-wrap gap-2 py-6 border-b border-gray-100">
      {steps.map((step, i) => {
        const isComplete = i < currentStep;
        const isActive = i === currentStep;

        return (
          <React.Fragment key={step.label}>
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border text-xs shrink-0 ${
                  isComplete
                    ? "bg-[#A3195B] border-[#A3195B] text-white"
                    : isActive
                    ? "border-[#A3195B] text-[#A3195B]"
                    : "border-gray-300 text-gray-300"
                }`}
              >
                {isComplete ? <Check size={14} /> : null}
              </div>
              <span
                className={`text-sm ${
                  isComplete || isActive
                    ? "text-[#A3195B] font-medium"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="w-8 h-px bg-gray-200 mx-1" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}