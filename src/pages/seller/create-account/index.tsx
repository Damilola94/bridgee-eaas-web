import { useState } from "react";
import BvnValidation from "../../../components/pages/seller/create-account/BvnValidation";
import StaticLayout from "../../../components/pages/seller/create-account/StaticLayout";
import Button from "../../../components/inputs/Button";
import Logo from "../../../assets/svgs/logos/full-pink.svg";
import WemaLogoSmall from "../../../assets/svgs/wema-logo-small.svg";
import Image from "next/image";
import Link from "next/link";
import LivenessCheck from "../../../components/pages/seller/create-account/LivenessCheck";
import PersonalInfo from "../../../components/pages/seller/create-account/PersonalInfo";
import LinkBankAccount from "../../../components/pages/seller/create-account/LinkBankAccount";
import Success from "../../../components/pages/seller/create-account/Success";

export interface StepData {
  bvn: string;
  livenessSelfie: File | null; // Use File type for image uploads
  personalInfo: {
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    businessName: string;
    password: string;
  };
  bankAccount: {
    bank: string;
    accountNumber: string;
  };
}


const stepsConfig = [
  {
    id: "bvnValidation",
    description: "BVN Validation",
    Component: BvnValidation,
  },
  {
    id: "livenessCheck",
    description: "Liveness Check",
    Component: LivenessCheck,
  },
  {
    id: "personalInfo",
    description: "Personal Information Validation",
    Component: PersonalInfo,
  },
  {
    id: "linkBankAccount",
    description: "Link a Nigerian Bank Account for Payout",
    Component: LinkBankAccount,
  },
  {
    id: "success",
    description: "",
    Component: Success,
  },
];

export default function CreateAccountPage() {
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const [formData, setFormData] = useState<StepData>({
    bvn: "",
    livenessSelfie: null,
    personalInfo: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      phoneNumber: "",
      businessName: "",
      password: "",
    },
    bankAccount: {
      bank: "",
      accountNumber: "",
    },
  });

  // --- DERIVED VALUES (No magic numbers) ---
  const totalSteps = stepsConfig.length;
  const isLastStep = currentStepIndex === totalSteps - 1;
  const currentStepData = stepsConfig[currentStepIndex];

  // --- NAVIGATION LOGIC (Readable and dynamic) ---
  const handleNext = () => {
      setCurrentStepIndex((prevIndex) => prevIndex + 1);
    // if (isLastStep) {
    //   console.log("Submitting form data:", formData);
    //   setIsCompleted(true);
    // } else {
    //   setCurrentStepIndex((prevIndex) => prevIndex + 1);
    // }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prevIndex) => prevIndex - 1);
    }
  };

  // --- DYNAMIC COMPONENT RENDERING ---
  const { Component: StepComponent } = currentStepData;

  // If the form is completed, show the success message.
  // if (!isCompleted) {
  //   return (
  //     <div className="min-h-screen bg-white lg:flex">
  //       <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
  //         <Success />
  //       </div>
  //       <StaticLayout />
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-white lg:flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex justify-center mt-10 lg:mt-20">
        <div className="w-full max-w-md px-6 py-8">
          <Link href="/#top" onClick={() => {}}>
            <Image
              src={Logo}
              alt="UseBridge Inc. logo"
              priority
              width={120}
              height={45}
              className="mb-12"
            />
          </Link>

          <h1 className="text-lg lg:text-2xl font-bold text-textColor mb-9">
            Create an account
          </h1>

          {/* Step indicator - DYNAMIC */}
          {currentStepData.id !== "success" && (
            <div className="mb-8">
              <div className="text-sm font-medium text-grey mb-2">
                Step {currentStepIndex + 1} of {totalSteps}
              </div>
              <div className="text-base font-semibold text-black mb-4">
                {currentStepData.description}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div
                  className="bg-purple-600 h-1 rounded-full"
                  style={{
                    width: `${((currentStepIndex + 1) / totalSteps) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Dynamic Step Content - Renders the component from our config */}
          <div className="mb-9">
            <StepComponent formData={formData} setFormData={setFormData} />
          </div>

          {/* Navigation buttons - DYNAMIC */}
          {currentStepData.id !== "success" && (
            <div className="lg:flex gap-x-4 space-y-4 lg:space-y-0">
              {currentStepData.id === "livenessCheck" && (
                <Button
                  onClick={handleBack}
                  className="w-full h-12 bg-transparent border border-grey text-greyDark"
                >
                  Try again
                </Button>
              )}
              <Button
                onClick={handleNext}
                className="w-full h-12 bg-purple-600 text-white rounded-lg"
              >
                {currentStepData.id === "livenessCheck"
                  ? "Save and Continue"
                  : isLastStep
                  ? "Continue"
                  : "Next"}
              </Button>
            </div>
          )}

          {["bvnValidation", "personalInfo"].includes(currentStepData.id) && (
            <div className="text-center mt-8">
              <span className="text-black text-sm font-bold">
                Already have an account?{" "}
              </span>
              <a href="/login" className="text-success font-bold text-sm">
                Login here
              </a>
            </div>
          )}

          <section className="flex justify-center">
            <div className="mx-auto flex items-center gap-x-2 mt-5">
              <p>Insured by NDIC and powered by</p>
              <Image
                src={WemaLogoSmall}
                alt="Wema logo"
                width={26}
                height={26}
              />
            </div>
          </section>
        </div>
      </div>

      {/* Right side - Static Design (Desktop only) */}
      <StaticLayout />
    </div>
  );
}
