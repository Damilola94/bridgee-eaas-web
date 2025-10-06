import { useState } from "react";
import BvnValidation from "../../../components/pages/seller/create-account/BvnValidation";
import StaticLayout from "../../../components/pages/seller/create-account/StaticLayout";
import Logo from "../../../assets/svgs/logos/full-pink.svg";
import WemaLogoSmall from "../../../assets/svgs/wema-logo-small.svg";
import Image from "next/image";
import Link from "next/link";
import LivenessCheck from "../../../components/pages/seller/create-account/LivenessCheck";
import PersonalInfo from "../../../components/pages/seller/create-account/PersonalInfo";
import LinkBankAccount from "../../../components/pages/seller/create-account/LinkBankAccount";
import Success from "../../../components/pages/seller/create-account/Success";

export interface StepData {
  bvnValidationTicketId?: string;
  bvn: string;
  livenessSelfie?: File | null;
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
    bankCode?: string;
    accountName?: string;
  };
}

const stepsConfig = [
  {
    id: "bvnValidation",
    description: "Identity Verification",
    Component: BvnValidation,
  },
  {
    id: "livenessCheck",
    description: "Identity Verification",
    Component: LivenessCheck,
  },
  {
    id: "linkBankAccount",
    description: "Link a Nigerian Bank Account for Payout",
    Component: LinkBankAccount,
  },
  {
    id: "personalInfo",
    description: "Personal Information Validation",
    Component: PersonalInfo,
  },
  {
    id: "success",
    description: "",
    Component: Success,
  },
];

export default function CreateAccountPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

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

  const totalSteps = stepsConfig.length;
  const currentStepData = stepsConfig[currentStepIndex];

  const handleNext = () => {
    setCurrentStepIndex((prevIndex) => prevIndex + 1);
  };

  const renderStepComponent = () => {
    switch (currentStepData.id) {
      case "bvnValidation":
        return (
          <BvnValidation
            formData={formData}
            setFormData={setFormData}
            onNavigateNext={handleNext}
          />
        );
      case "livenessCheck":
        return (
          <LivenessCheck
            formData={formData}
            setFormData={setFormData}
            onNavigateNext={handleNext}
          />
        );
      case "linkBankAccount":
        return (
          <LinkBankAccount
            formData={formData}
            setFormData={setFormData}
            onNextStep={handleNext}
          />
        );
      case "personalInfo":
        return (
          <PersonalInfo
            formData={formData}
            setFormData={setFormData}
            onRegistrationSuccess={handleNext}
          />
        );
      case "success":
        return <Success />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white lg:flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex justify-center mt-10 lg:mt-20">
        <div className="w-full max-w-md px-6 py-8">
          <Link href="/#top">
            <Image
              src={Logo}
              alt="UseBridge Inc. logo"
              priority
              width={120}
              height={45}
              className="mb-12"
            />
          </Link>

          {currentStepData.id !== "success" && (
            <h1 className="text-lg lg:text-2xl font-bold text-textColor mb-9">
              Create an account
            </h1>
          )}

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
                  className="bg-success h-1 rounded-full"
                  style={{
                    width: `${
                      currentStepIndex === 0
                        ? 20
                        : ((currentStepIndex + 1) / totalSteps) * 100
                    }%`,
                  }}
                />
              </div>
            </div>
          )}

          <div className="mb-9">{renderStepComponent()}</div>

          {["bvnValidation", "personalInfo"].includes(currentStepData.id) && (
            <div className="text-center mt-8">
              <span className="text-black text-sm font-bold">
                Already have an account?{" "}
              </span>
              <Link
                className="text-success font-bold text-sm"
                href={"/seller/login"}
              >
                Login here
              </Link>
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

      {/* Right side */}
      <StaticLayout />
    </div>
  );
}
