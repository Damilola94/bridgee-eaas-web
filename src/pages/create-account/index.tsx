// pages/signup/index.tsx
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";

import Button from "../../components/inputs/Button";
import TextInput from "../../components/inputs/Text";
import RadioCard from "../../components/inputs/RadioCard";
import ClickableLogo from "../../components/pages/auth/ClickableLogo";
import StaticLayout from "../../components/pages/auth/create-account/StaticLayout";
import notification from "../../utilities/notification";
import handleFetch from "../../services/api/handleFetch";

export default function CreateAccount() {
  const router = useRouter();
  const [isRegistered, setIsRegistered] = useState(true);
  const [regNumber, setRegNumber] = useState("");
  const [companyName, setCompanyName] = useState("");

  const validateMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      setCompanyName(res?.data?.companyName || "");
      notification({
        title: "Validated",
        message: "Company registration number validated successfully.",
        type: "success",
      });
    },
    onError: (err: any) => {
      notification({
        title: "Validation Failed",
        message:
          err?.toString() || "Unable to validate this registration number.",
        type: "danger",
      });
    },
  });

  const handleValidate = () => {
    if (!regNumber) {
      notification({
        title: "Form Error",
        message: "Please enter your CAC / business registration number",
        type: "danger",
      });
      return;
    }
    validateMutation.mutate({
      service: "identity-service/",
      endpoint: "api/v1/business/validate-cac",
      extra: "",
      method: "POST",
      body: { registrationNumber: regNumber },
    });
  };

  const handleProceed = () => {
    if (isRegistered && !companyName) {
      notification({
        title: "Form Error",
        message: "Please validate your CAC registration number first",
        type: "danger",
      });
      return;
    }
    router.push("/signup/company-information");
  };

  return (
    <div className="min-h-screen bg-[#F4F5F9] lg:flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center min-h-screen px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-sm px-10 py-12">
          <ClickableLogo className="mb-10" />

          <h1 className="text-textColor ff-bold text-2xl mb-8">
            Create an Account
          </h1>

          <label className="block text-sm font-medium text-textColor mb-3">
            Is your company registered?
          </label>
          <div className="grid grid-cols-2 gap-3 mb-8">
            <RadioCard
              label="Yes, registered"
              selected={isRegistered}
              onClick={() => setIsRegistered(true)}
            />
            <RadioCard
              label="Not yet registered"
              selected={!isRegistered}
              onClick={() => setIsRegistered(false)}
            />
          </div>

          {isRegistered && (
            <div className="mb-8">
              <label className="block text-sm font-medium text-textColor mb-2">
                CAC / Business registration number
              </label>
              <div className="flex gap-3">
                <TextInput
                  className="flex-1"
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                  name="regNumber"
                  placeholder="e.g RC-1252535"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleValidate}
                  loading={validateMutation.isLoading}
                  className="!border-[#A3195B] !text-[#A3195B] whitespace-nowrap"
                >
                  Validate
                </Button>
              </div>
              {companyName && (
                <div className="flex items-center gap-1.5 mt-2 text-sm text-gray-600">
                  {companyName}
                  <BadgeCheck size={16} className="text-green-600" />
                </div>
              )}
            </div>
          )}

          <Button
            className="w-full text-lg ff-bold !rounded-xl !bg-[#A3195B] hover:!bg-[#8a1550]"
            paddingY="p-3.5"
            onClick={handleProceed}
          >
            Proceed
          </Button>

          <p className="mt-6 text-center text-sm">
            Already have an account?&nbsp;
            <Link href="/login">
              <span className="text-[#A3195B] cursor-pointer font-medium">
                Login
              </span>
            </Link>
          </p>
        </div>
      </div>

      <StaticLayout />
    </div>
  );
}
