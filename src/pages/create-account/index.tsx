// pages/signup/index.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { SingleValue } from "react-select";

import Button from "../../components/inputs/Button";
import Loading from "../../components/common/Loading";
import TextInput from "../../components/inputs/Text";
import RadioCard from "../../components/inputs/RadioCard";
import SelectInput, { SelectOptionType } from "../../components/inputs/Select";
import ClickableLogo from "../../components/pages/auth/ClickableLogo";
import StaticLayout from "../../components/pages/auth/StaticLayout";
import notification from "../../utilities/notification";
import handleFetch from "../../services/api/handleFetch";
import useGetQuery from "../../hooks/useGetQuery";
import { useSignupContext } from "../../context/Signupcontext";

interface BusinessType {
  value: string;
  label: string;
  cacVerifiable: boolean;
}

export default function CreateAccount() {
  const router = useRouter();
  const { data, updateSignupData } = useSignupContext();

  const [isRegistered, setIsRegistered] = useState(data.isRegistered ?? true);
  const [businessType, setBusinessType] = useState(data.businessType || "");
  const [regNumber, setRegNumber] = useState(data.cacNumber || "");
  const [companyName, setCompanyName] = useState(data.companyName || "");

  const { data: businessTypesData, status: businessTypesStatus } = useGetQuery({
    endpoint: "escrow-service/api/v1/onboarding/business-types",
    queryKey: ["business-types"],
  });

  const businessTypes: BusinessType[] = useMemo(
    () =>
      businessTypesStatus === "success" && businessTypesData?.isSuccess
        ? businessTypesData.data
        : [],
    [businessTypesData, businessTypesStatus],
  );

  const businessTypeOptions = useMemo(
    () => businessTypes.map((t) => ({ label: t.label, value: t.value })),
    [businessTypes],
  );

  const selectedBusinessType = businessTypes.find(
    (t) => t.value === businessType,
  );

  const isCacVerifiable = selectedBusinessType?.cacVerifiable === true;

  useEffect(() => {
    if (businessTypesStatus === "error") {
      notification({
        title: "Error",
        message: "Could not load business types. Please refresh and try again.",
        type: "danger",
      });
    }
  }, [businessTypesStatus]);

  const validateMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      const validatedName = res?.data?.companyName || "";

      setCompanyName(validatedName);

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

  const handleBusinessTypeChange = (val: SingleValue<SelectOptionType>) => {
    setBusinessType(val?.value || "");
    setCompanyName("");
  };

  const handleValidate = () => {
    if (!businessType) {
      notification({
        title: "Form Error",
        message: "Please select your business type",
        type: "danger",
      });
      return;
    }

    if (!regNumber) {
      notification({
        title: "Form Error",
        message: "Please enter your CAC / business registration number",
        type: "danger",
      });
      return;
    }

    validateMutation.mutate({
      service: "escrow-service/",
      endpoint: "api/v1/onboarding/validate-cac",
      extra: "",
      method: "POST",
      body: { cacNumber: regNumber, businessType },
    });
  };

  const handleProceed = () => {
    if (isRegistered) {
      if (!businessType) {
        notification({
          title: "Form Error",
          message: "Please select your business type",
          type: "danger",
        });
        return;
      }

      if (isCacVerifiable && !companyName) {
        notification({
          title: "Form Error",
          message: "Please validate your CAC registration number first",
          type: "danger",
        });
        return;
      }
    }

    updateSignupData({
      isRegistered,
      businessType: isRegistered ? businessType : "",
      cacNumber: isRegistered && isCacVerifiable ? regNumber : "",
      companyName,
    });

    router.push("/signup/company-information");
  };

  return (
    <div className="min-h-screen bg-[#F4F5F9] lg:flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center min-h-screen px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-sm px-10 py-12">
          <ClickableLogo className="mb-10" />

          {validateMutation.isLoading && <Loading />}

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
            <>
              <SelectInput
                className="w-full mb-6"
                onChange={(val) =>
                  handleBusinessTypeChange(val as SingleValue<SelectOptionType>)
                }
                value={
                  businessTypeOptions.find(
                    (option) => option.value === businessType,
                  ) || null
                }
                label="Business Type"
                options={businessTypeOptions}
                placeholder="Select business type"
              />

              {isCacVerifiable && (
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
                      maxValue={10}
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

              {businessType && !isCacVerifiable && (
                <p className="mb-8 text-sm text-gray-500">
                  CAC validation isn&apos;t required for this business type.
                </p>
              )}
            </>
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
            <Link href="/">
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