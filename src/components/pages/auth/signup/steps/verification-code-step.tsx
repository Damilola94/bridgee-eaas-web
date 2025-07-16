// "use client";

// import React from "react";
// import AuthCode from "react-auth-code-input";
// import { useMutation } from "react-query";
// import { useCookies } from "react-cookie";

// import Button from "../../../../inputs/Button";
// import Loading from "../../../../common/Loading";
// import notification from "../../../../../utilities/notification";
// import handleFetch from "../../../../../services/api/handleFetch";

// interface VerificationCodeStepProps {
//   phoneNumber: string;
//   handleSubmit: () => void;
// }

// const VerificationCodeStep: React.FC<VerificationCodeStepProps> = ({
//   phoneNumber,
//   handleSubmit
// }) => {
//   const [cookie] = useCookies(["form", "data"]);
//   const [otp, setOtp] = React.useState("");

//   const activationMutation = useMutation(handleFetch, {
//     onSuccess: (res: any) => {
//       notification({
//         message: res?.data?.message || "Successful account verification.",
//         type: "success"
//       });
//       handleSubmit();
//     },
//     onError: (err: any) => {
//       notification({
//         title: "Error",
//         message: err?.toString() || "Something went wrong.",
//         type: "danger"
//       });
//     }
//   });

//   const resendMutation = useMutation(handleFetch, {
//     onSuccess: (res: any) => {
//       notification({
//         message: res?.data?.message || "Verification code resent successfully",
//         type: "success"
//       });
//     },
//     onError: (err: any) => {
//       notification({
//         title: "Error",
//         message: err?.toString() || "Something went wrong.",
//         type: "danger"
//       });
//     }
//   });

//   const handleValidateToken = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!otp || otp.length < 6) {
//       notification({
//         title: "Form Error",
//         message: "Please, enter a valid verification code",
//         type: "danger"
//       });
//       return;
//     }

//     const body = { email: cookie.form?.email, otp };

//     activationMutation.mutate({
//       endpoint: "auth",
//       extra: "validate-otp",
//       method: "POST",
//       body
//     });
//   };

//   const resendOtp = () => {
//     const body = { email: cookie.form?.email, purpose: "Onboarding" };

//     resendMutation.mutate({
//       endpoint: "auth",
//       extra: "resend-otp",
//       method: "POST",
//       body
//     });
//   };

//   const { isLoading, isSuccess } = activationMutation;
//   const { isLoading: resendingOtp } = resendMutation;

//   return (
//     <div className="w-full">
//       <h1 className="text-center text-2xl font-bold mb-2">
//         Enter verification code
//       </h1>
//       <p className="text-center text-gray-500 mb-8">
//         {`Proceed to your email (${cookie.form?.email}) to get code`}
//       </p>

//       {(isLoading || isSuccess) && <Loading />}
//       {resendingOtp && <Loading message="Resending code..." />}

//       <form onSubmit={handleValidateToken}>
//         <div className="mb-6">
//           <AuthCode
//             isPassword
//             allowedCharacters="numeric"
//             containerClassName="w-full flex justify-between mb-2"
//             inputClassName="w-[15%] rounded h-16 border border-[#777] text-center"
//             onChange={(val: string) => setOtp(val)}
//           />
//         </div>

//         <div className="flex justify-between items-center mb-6">
//           <span className="text-sm text-gray-500">
//             Didn&nbsp;t receive code?
//           </span>
//           <button
//             type="button"
//             onClick={resendOtp}
//             className="text-sm text-[#D31FFF] hover:text-[#B818DE]"
//           >
//             Resend
//           </button>
//         </div>

//         <Button
//           className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl bg-[#D31FFF] hover:bg-[#B818DE]"
//           paddingY="p-3.5"
//           type="submit"
//         >
//           Next
//         </Button>

//         <p className="mt-4 text-center text-sm text-gray-500">
//           We sent it to {phoneNumber ? `+234 ${phoneNumber}` : "your phone"}{" "}
//           <button className="text-[#D31FFF]">Change</button>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default VerificationCodeStep;

"use client";

import React from "react";
import { useCookies } from "react-cookie";

import Button from "../../../../inputs/Button";
import Loading from "../../../../common/Loading";
import notification from "../../../../../utilities/notification";
interface VerificationCodeStepProps {
  phoneNumber: string
  handleSubmit: () => void
}

export default function VerificationCodeStep({ phoneNumber, handleSubmit }: VerificationCodeStepProps) {
  const [cookie] = useCookies(["form", "data"]);
  const [otp, setOtp] = React.useState("");

  // Simulate API calls
  const activationMutation = {
    mutate: async (data: any) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (otp.length === 6) {
        handleSubmit();
        notification({
          message: "Successful account verification.",
          type: "success"
        });
      } else {
        showNotification("Invalid verification code", "danger");
      }
    },
    isLoading: false,
    isSuccess: false
  };

  const resendMutation = {
    mutate: async (data: any) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 5000));
      showNotification("Verification code resent successfully", "success");
    },
    isLoading: false
  };

  // Simple notification function
  const showNotification = (message: string, type: string) => {
    alert(`${type.toUpperCase()}: ${message}`);
  };

  const handleValidateToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      showNotification("Please, enter a valid verification code", "danger");
      return;
    }

    const body = { email: cookie.form?.email, otp };

    activationMutation.mutate({
      endpoint: "auth",
      extra: "validate-otp",
      method: "POST",
      body
    });
  };

  const resendOtp = () => {
    const body = { email: cookie.form?.email, purpose: "Onboarding" };

    resendMutation.mutate({
      endpoint: "auth",
      extra: "resend-otp",
      method: "POST",
      body
    });
  };

  const { isLoading, isSuccess } = activationMutation;
  const { isLoading: resendingOtp } = resendMutation;

  // Render individual OTP input boxes
  const renderOtpInputs = () => {
    const inputs = [];
    for (let i = 0; i < 6; i++) {
      inputs.push(
        <input
          key={i}
          type="password"
          maxLength={1}
          className="w-[15%] rounded h-16 border border-gray-400 text-center text-xl"
          value={otp[i] || ""}
          onChange={(e) => {
            const newOtp = otp.split("");
            newOtp[i] = e.target.value;
            setOtp(newOtp.join(""));

            // Auto-focus next input
            if (e.target.value && i < 5) {
              const nextInput = e.target.parentElement?.children[i + 1] as HTMLInputElement;
              if (nextInput) nextInput.focus();
            }
          }}
          onKeyDown={(e) => {
            // Handle backspace to go to previous input
            if (e.key === "Backspace" && !otp[i] && i > 0) {
              if (e.key === "Backspace" && !otp[i] && i > 0) {
                const target = e.target as HTMLInputElement;
                const prevInput = target.parentElement?.children[i - 1] as HTMLInputElement;
                if (prevInput) prevInput.focus();
              }
            }
          }}
        />,
      );
    }
    return inputs;
  };

  return (
    <div className="w-full">
      <h1 className="text-center text-2xl font-bold mb-2">Enter verification code</h1>
      <p className="text-center text-gray-500 mb-8">
        {`Proceed to your email (${cookie.form?.email || "your email"}) to get code`}
      </p>

      {(isLoading || isSuccess) && (
        <div className="flex justify-center items-center mb-4">
          <Loading />
        </div>
      )}

      {resendingOtp && (
        <div className="flex justify-center items-center mb-4">
          <Loading />
          <span className="ml-2">Resending code...</span>
        </div>
      )}

      <form onSubmit={handleValidateToken}>
        <div className="mb-6">
          <div className="w-full flex justify-between mb-2">{renderOtpInputs()}</div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <span className="text-sm text-gray-500">Didn&apos;t receive code?</span>
          <button type="button" onClick={resendOtp} className="text-sm text-purple-600 hover:text-purple-700">
            Resend
          </button>
        </div>

        <Button className="w-full text-lg font-bold rounded-md bg-purple-600 hover:bg-purple-700 py-3.5" type="submit">
          Next
        </Button>

        <p className="mt-4 text-center text-sm text-gray-500">
          We sent it to {phoneNumber ? `+234 ${phoneNumber}` : "your phone"}{" "}
          <button className="text-purple-600">Change</button>
        </p>
      </form>
    </div>
  );
}
