// "use client";

// import type React from "react";

// import TextInput from "../../../../inputs/Text";
// import Button from "../../../../inputs/Button";

// interface PasswordStepProps {
//   form: any
//   handleChange: (val: any, type?: string, inputName?: string) => void
//   handleContinue: () => void
// }

// const PasswordStep: React.FC<PasswordStepProps> = ({ form, handleChange, handleContinue }) => {
//   return (
//     <div className="w-full">
//       <h1 className="text-center text-2xl font-bold mb-6">Password</h1>

//       <div className="mb-6">
//         <TextInput
//           className="w-full mb-4"
//           onChange={handleChange}
//           value={form?.password || ""}
//           type="password"
//           label="Password"
//           name="password"
//           placeholder="Password"
//         />
//       </div>

//       <Button
//         className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl bg-[#D31FFF] hover:bg-[#B818DE]"
//         paddingY="p-3.5"
//         onClick={handleContinue}
//       >
//         Done
//       </Button>
//     </div>
//   );
// };

// export default PasswordStep;
"use client";

import { useState } from "react";

import { useCookies } from "react-cookie";

import Loading from "../../../../common/Loading";

import TextInput from "../../../../inputs/Text";
import Button from "../../../../inputs/Button";

interface PasswordStepProps {
  form: any
  handleChange: (val: any, type?: string, inputName?: string) => void
  handleContinue: () => void
  isLoading?: boolean
}

export default function PasswordStep({
  form, handleChange, handleContinue, isLoading
}: PasswordStepProps) {
  const [loading, setLoading] = useState(false);
  const [, setCookie] = useCookies(["data", "form"]);

  const handleSubmit = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setLoading(false);
    handleContinue();
    setCookie("data", { accessToken: "9u39jie83uy92u9y289h2" }, { secure: true, sameSite: true });
  };

  return (
    <div className="w-full">
      <h1 className="text-center text-2xl font-bold mb-6">Password</h1>

      <div className="mb-6">
        <div className="w-full mb-4">
          <div className="mb-6">
            <TextInput
              className="w-full mb-4"
              onChange={handleChange}
              value={form?.password || ""}
              type="password"
              label="Password"
              name="password"
              placeholder="Password"
            />
          </div>
        </div>
      </div>

      <Button
        className="w-full text-lg font-bold rounded-md bg-purple-600 hover:bg-purple-700 py-3.5"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <>
            <Loading message=" Creating Account..."/>
          </>
        ) : (
          "Done"
        )}
      </Button>
    </div>
  );
}
