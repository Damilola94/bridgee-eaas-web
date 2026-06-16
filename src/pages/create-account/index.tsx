import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import StaticLayout from "../../components/pages/auth/create-account/StaticLayout";
import Logo from "../../assets/svgs/logos/full-pink.svg";
import WemaLogoSmall from "../../assets/svgs/wema-logo-small.svg";
import PersonalInfo from "../../components/pages/auth/create-account/PersonalInfo";
import EmailVerification from "../../components/pages/auth/create-account/EmailVerification";
import { OnboardingStepData, UserType } from "../../types/auth";
import RegisterSelectionModal from "../../components/pages/homepage/modals/RegisterSelectionModal";
import LinkBankAccount from "../../components/pages/auth/create-account/LinkBankAccount";

const stepsConfig = [
  {
    id: "personalInfo",
    description: "Personal Information",
    Component: PersonalInfo,
  },
  {
    id: "emailVerification",
    description: "Email Verification",
    Component: EmailVerification,
  },
  {
    id: "bankAccount",
    description: "Link Bank Account",
    Component: LinkBankAccount,
  },
];

export default function CreateAccountPage() {
  const router = useRouter();
  const userType = router.query.userType as UserType | undefined;
  const isSeller = userType === "Seller";

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const totalSteps = stepsConfig.length;
  const currentStepData = stepsConfig[currentStepIndex];

  const [formData, setFormData] = useState<OnboardingStepData>({
    bvn: "",
    livenessSelfie: null,
    personalInfo: {
      emailAddress: "",
      phoneNumber: "",
      businessName: "",
      password: "",
      partnerCode: "",
    },
    otpValidationTicket: "",
  });

  useEffect(() => {
    if (router.query.ref) {
      setFormData((prev) => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          partnerCode: router.query.ref as string,
        },
      }));
    }
  }, [router.query.ref, currentStepIndex]);

  const handleNext = () => {
    setCurrentStepIndex((prevIndex) => prevIndex + 1);
  };

  const handleSelectSeller = () => {
    router.push(
      `/create-account?userType=Seller&ref=${router.query.ref || ""}`,
    );
  };

  const handleSelectBuyer = () => {
    router.push(`/create-account?userType=Buyer&ref=${router.query.ref || ""}`);
  };

  if (!userType) {
    return (
      <RegisterSelectionModal
        isOpen={true}
        onClose={() => {}}
        isShowCloseIcon={false}
        onSelectSeller={handleSelectSeller}
        onSelectBuyer={handleSelectBuyer}
      />
    );
  }

  const renderStepComponent = () => {
    switch (currentStepData.id) {
      case "personalInfo":
        return (
          <PersonalInfo
            formData={formData}
            setFormData={setFormData}
            onOtpSentSuccess={handleNext}
            isSeller={isSeller}
          />
        );
      case "emailVerification":
        return (
          <EmailVerification
            formData={formData}
            setFormData={setFormData}
            onNavigateNext={handleNext}
            isSeller={isSeller}
          />
        );
      case "bankAccount":
        return (
          <LinkBankAccount
            formData={formData}
            setFormData={setFormData}
            isSeller={isSeller}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white lg:flex">
      <div className="w-full lg:w-1/2 flex justify-center mt-10 lg:mt-20">
        <div className="w-full max-w-md px-6 py-8">
          <Link href="/#top">
            <Image
              src={Logo}
              alt="UseBridgee Inc. logo"
              priority
              width={120}
              height={45}
              className="mb-12"
            />
          </Link>

          <h1 className="text-lg lg:text-2xl font-bold text-textColor mb-9">
            Create an account
          </h1>

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

          <div className="mb-9">{renderStepComponent()}</div>

          {["personalInfo", "emailVerification"].includes(
            currentStepData.id,
          ) && (
            <div className="text-center mt-8">
              <span className="text-black text-sm font-bold">
                Already have an account?{" "}
              </span>
              <Link className="text-success font-bold text-sm" href={"/login"}>
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
      <StaticLayout />
    </div>
  );
}
