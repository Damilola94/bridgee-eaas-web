/* eslint-disable no-nested-ternary */
// /* eslint-disable no-nested-ternary */
// "use client";

// import { useState, useEffect } from "react";
// import { useCookies } from "react-cookie";
// import { useMutation } from "react-query";
// import { CheckCircle } from "lucide-react";

// import notification from "../../../../utilities/notification";

// import handleFetch from "../../../../services/api/handleFetch";

// import type { SignupFormProps } from "../../../../types/auth";

// import ClickLogo from "../ClickLogo";

// import EmailStep from "./steps/email-step";
// import AccountTypeStep from "./steps/account-type-step";
// import VerificationStep from "./steps/verification-step";
// import VerificationCodeStep from "./steps/verification-code-step";
// import PasswordStep from "./steps/password-step";
// import SuccessStep from "./steps/success-step";

// function SignupStepper() {
//   const [cookie, setCookie] = useCookies(["data", "form"]);
//   const [form, setForm] = useState<SignupFormProps>({ isBusiness: "false" });
//   const [currentStep, setCurrentStep] = useState(0);
//   const [phoneNumber, setPhoneNumber] = useState("");

//   useEffect(() => {
//     if (cookie?.form?.email) {
//       setForm(cookie?.form);
//     }
//   }, [cookie]);

//   const steps = [
//     { id: "email", label: "Email" },
//     { id: "accountType", label: "Account type" },
//     { id: "verification", label: "Verification" },
//     { id: "password", label: "Password" }
//   ];

//   const handleChange = (val: any, type = "input", inputName = "") => {
//     if (type === "input") {
//       const { value, name } = val.target;
//       setForm((prev) => ({ ...prev, [name]: value }));
//     } else {
//       setForm((prev) => ({ ...prev, [inputName]: val }));
//     }
//   };

//   const signupMutation = useMutation(handleFetch, {
//     onSuccess: (res: any) => {
//       notification({
//         message: res?.message || "Account created successfully",
//         type: "success"
//       });
//       setCookie("form", form);
//       goToNextStep();
//     },
//     onError: (err: any) => {
//       notification({
//         title: "Error",
//         message: err?.toString() || "Something went wrong.",
//         type: "danger"
//       });
//     }
//   });

//   const validateEmailStep = () => {
//     const errors = [];
//     if (!form?.email) errors.push("Email address is required");
//     if (
//       !/^([a-zA-Z0-9_\-.&]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(
//         form?.email || ""
//       )
//     ) {
//       errors.push("Please enter a valid email");
//     }
//     if (form?.termsAccepted !== "true")
//       errors.push("Please, accept terms and condition to proceed");
//     return errors;
//   };

//   const validateAccountTypeStep = () => {
//     const errors = [];
//     if (form?.isBusiness === "true") {
//       if (!form?.businessName) errors.push("Business name is required");
//       if (!form?.businessType?.value) errors.push("Business type is required");
//     }
//     return errors;
//   };

//   const validateVerificationStep = () => {
//     const errors = [];
//     if (!form?.phoneNumber) errors.push("Phone number is required");
//     if (form?.phoneNumber?.length !== 11)
//       errors.push("Phone number is not valid");
//     return errors;
//   };

//   const validatePasswordStep = () => {
//     const errors = [];
//     if (!form?.password) errors.push("Password is required");
//     if (
//       !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&~`'"])[A-Za-z\d@$#!%*?&~`'"]{8,}$/.test(
//         form?.password || ""
//       )
//     ) {
//       errors.push(
//         "Your password must be minimum of eight characters, with at least one uppercase letter, one lowercase letter, one digit and one special character (@$#!%*?&~`'\")"
//       );
//     }
//     return errors;
//   };

//   const validateCurrentStep = () => {
//     switch (currentStep) {
//     case 0:
//       return validateEmailStep();
//     case 1:
//       return validateAccountTypeStep();
//     case 2:
//       return validateVerificationStep();
//     case 3:
//       return validatePasswordStep();
//     default:
//       return [];
//     }
//   };

//   const goToNextStep = () => {
//     if (currentStep < steps.length) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const goToPreviousStep = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const handleContinue = () => {
//     const errors = validateCurrentStep();
//     if (errors.length) {
//       errors.forEach((item) =>
//         notification({ title: "Form Error", message: item, type: "danger" })
//       );
//       return;
//     }

//     if (currentStep === 3) {
//       const body = {
//         ...form,
//         isBusiness: form?.isBusiness === "true",
//         businessType: form?.businessType?.value,
//         termsAccepted: form?.termsAccepted === "true"
//       };

//       signupMutation.mutate({
//         endpoint: "auth",
//         extra: "register",
//         method: "POST",
//         body
//       });
//     } else {
//       goToNextStep();
//     }
//   };

//   const handleVerificationCodeSubmit = () => {
//     goToNextStep();
//   };

//   const renderStep = () => {
//     switch (currentStep) {
//     case 0:
//       return (
//         <EmailStep
//           form={form}
//           handleChange={handleChange}
//           handleContinue={handleContinue}
//         />
//       );
//     case 1:
//       return (
//         <AccountTypeStep
//           form={form}
//           handleChange={handleChange}
//           handleContinue={handleContinue}
//         />
//       );
//     case 2:
//       return (
//         <VerificationStep
//           form={form}
//           handleChange={handleChange}
//           handleContinue={handleContinue}
//           setPhoneNumber={setPhoneNumber}
//         />
//       );
//     case 3:
//       return (
//         <VerificationCodeStep
//           phoneNumber={phoneNumber}
//           handleSubmit={handleVerificationCodeSubmit}
//         />

//       );
//     case 4:
//       return (
//         <PasswordStep
//           form={form}
//           handleChange={handleChange}
//           handleContinue={handleContinue}
//         />
//       );
//     case 5:
//       return <SuccessStep />;
//     default:
//       return null;
//     }
//   };

//   // const { isLoading } = signupMutation;

//   return (
//     <div className="flex flex-col w-full min-h-screen">
//       <div className="w-full border-b px-8 py-4">
//         <div className="container mx-auto flex justify-between items-center">
//           <ClickLogo />

//           <div className="flex justify-center items-center">
//             {steps.map((step, index) => (
//               <div key={step.id} className="flex items-center">
//                 <div
//                   className={`flex items-center justify-center w-6 h-6 rounded-full ${
//                     index < currentStep
//                       ? "bg-[#D31FFF] text-white"
//                       : index === currentStep
//                         ? "border-2 border-[#D31FFF] text-[#D31FFF]"
//                         : "border-2 border-gray-300 text-gray-300"
//                   }`}
//                 >
//                   {index < currentStep ? (
//                     <CheckCircle className="w-4 h-4" />
//                   ) : (
//                     <span className="text-xs">{index + 1}</span>
//                   )}
//                 </div>
//                 <span
//                   className={`ml-2 text-sm ${
//                     index <= currentStep ? "text-[#D31FFF]" : "text-gray-400"
//                   }`}
//                 >
//                   {step.label}
//                 </span>
//                 {index < steps.length - 1 && (
//                   <div
//                     className={`w-16 h-[1px] mx-2 ${
//                       index < currentStep ? "bg-[#D31FFF]" : "bg-gray-300"
//                     }`}
//                   ></div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {currentStep > 0 && currentStep < 5 && (
//         <div className="border flex items-center p-3 w-fit m-8 rounded-xl border-[#0F1D86]">
//           <button
//             onClick={goToPreviousStep}
//             className="flex items-center text-[#0F1D86] hover:text-[#0F1D86]"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="20"
//               height="20"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinec-ap="round"
//               strokeLinejoin="round"
//               className="mr-1"
//             >
//               <path d="M19 12H5" />
//               <path d="M12 19l-7-7 7-7" />
//             </svg>
//               Back
//           </button>
//         </div>
//       )}
//       <div className="flex-1 flex items-center justify-center">
//         <div className="w-[35rem] px-8 py-10">
//           {renderStep()}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignupStepper;

"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

import ClickableLogo from "../ClickLogo";

import EmailStep from "./steps/email-step";
import AccountTypeStep from "./steps/account-type-step";
import VerificationStep from "./steps/verification-step";
import VerificationCodeStep from "./steps/verification-code-step";
import PasswordStep from "./steps/password-step";
import SuccessStep from "./steps/success-step";

interface SignupFormProps {
  email?: string
  isBusiness?: string
  businessName?: string
  businessType?: { value: string; label: string }
  phoneNumber?: string
  password?: string
  termsAccepted?: string
}

export default function SignupStepper() {
  const [form, setForm] = useState<SignupFormProps>({ isBusiness: "false" });
  const [currentStep, setCurrentStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [, setIsLoading] = useState(false);

  const steps = [
    { id: "email", label: "Email" },
    { id: "accountType", label: "Account type" },
    { id: "verification", label: "Verification" },
    { id: "password", label: "Password" }
  ];

  const handleChange = (val: any, type = "input", inputName = "") => {
    if (type === "input") {
      const { value, name } = val.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    } else {
      setForm((prev) => ({ ...prev, [inputName]: val }));
    }
  };

  const simulateApiCall = async () => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    return { success: true, message: "Account created successfully!" };
  };

  const validateEmailStep = () => {
    const errors = [];
    if (!form?.email) errors.push("Email address is required");
    if (!/^([a-zA-Z0-9_\-.&]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(form?.email || "")) {
      errors.push("Please enter a valid email");
    }
    if (form?.termsAccepted !== "true") errors.push("Please accept terms and conditions to proceed");
    return errors;
  };

  const validateAccountTypeStep = () => {
    const errors = [];
    if (form?.isBusiness === "true") {
      if (!form?.businessName) errors.push("Business name is required");
      if (!form?.businessType?.value) errors.push("Business type is required");
    }
    return errors;
  };

  const validateVerificationStep = () => {
    const errors = [];
    if (!form?.phoneNumber) errors.push("Phone number is required");
    if (form?.phoneNumber && form?.phoneNumber?.length < 10) errors.push("Phone number is not valid");
    return errors;
  };

  const validatePasswordStep = () => {
    const errors = [];
    if (!form?.password) errors.push("Password is required");
    if (form?.password && form?.password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }
    return errors;
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
    case 0:
      return validateEmailStep();
    case 1:
      return validateAccountTypeStep();
    case 2:
      return validateVerificationStep();
    case 3:
      return validatePasswordStep();
    default:
      return [];
    }
  };

  const goToNextStep = () => {
    if (currentStep < steps.length || currentStep === steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleContinue = async () => {
    const errors = validateCurrentStep();
    if (errors.length) {
      alert(errors.join("\n"));
      return;
    }
    if (currentStep === 3) {
      try {
        const result = await simulateApiCall();
        if (result.success) {
          goToNextStep();
        }
      } catch (error) {
        alert("Something went wrong. Please try again.");
      }
    } else {
      goToNextStep();
    }
  };

  const handleVerificationCodeSubmit = () => {
    goToNextStep();
  };

  const renderStep = () => {
    switch (currentStep) {
    case 0:
      return <EmailStep form={form} handleChange={handleChange} handleContinue={handleContinue} />;
    case 1:
      return <AccountTypeStep form={form} handleChange={handleChange} handleContinue={handleContinue} />;
    case 2:
      return (
        <VerificationStep
          form={form}
          handleChange={handleChange}
          handleContinue={handleContinue}
          setPhoneNumber={setPhoneNumber}
        />
      );
    case 3:
      return <VerificationCodeStep phoneNumber={phoneNumber} handleSubmit={handleVerificationCodeSubmit} />;
    case 4:
      return (
        <PasswordStep form={form} handleChange={handleChange} handleContinue={handleContinue}
        />
      );
    case 5:
      return <SuccessStep />;
    default:
      return null;
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <div className="w-full border-b px-8 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <ClickableLogo className="" />
          <div className="flex justify-center items-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full ${
                    index < currentStep
                      ? "bg-purple-600 text-white"
                      : index === currentStep
                        ? "border-2 border-purple-600 text-purple-600"
                        : "border-2 border-gray-300 text-gray-300"
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className="text-xs">{index + 1}</span>
                  )}
                </div>
                <span className={`ml-2 text-sm ${index <= currentStep ? "text-purple-600" : "text-gray-400"}`}>
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-[1px] mx-2 ${index < currentStep ? "bg-purple-600" : "bg-gray-300"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {currentStep > 0 && currentStep < 5 && (
        <div className="border flex items-center p-3 w-fit m-8 rounded-xl border-blue-600">
          <button
            onClick={goToPreviousStep}
            className="flex items-center text-[#0F1D86] hover:text-[#0F1D86]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
              Back
          </button>
        </div>
      )}

      <div className="flex-1 flex items-center justify-center">
        <div className="w-[35rem] px-8 py-10">{renderStep()}</div>
      </div>
    </div>
  );
}

