// pages/signup/company-information.tsx
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import TextInput from "../../components/inputs/Text";
import SelectInput, { SelectOptionType } from "../../components/inputs/Select";
import Button from "../../components/inputs/Button";
import FileUpload from "../../components/inputs/FileUpload";
import PhoneInput from "../../components/inputs/PhoneInput";
import Stepper from "./Stepper";
import notification from "../../utilities/notification";
import ClickableLogo from "../../components/pages/auth/ClickableLogo";
import { useSignupContext } from "../../context/Signupcontext";
import { SingleValue } from "react-select";

const STEPS = [
  { label: "Company Information" },
  { label: "Business Contact Information" },
  { label: "Email Verification" },
];

const BUSINESS_TYPES = [
  { label: "Limited Liability Company", value: "LimitedLiabilityCompany" },
  { label: "Partnership", value: "Partnership" },
  { label: "Sole Proprietorship", value: "SolePropertorship" },
  { label: "Other", value: "Other" },
];

export default function CompanyInformation() {
  const router = useRouter();
  const { data, updateSignupData } = useSignupContext();

  const [companyName, setCompanyName] = useState(data.companyName || "");
  const [businessType, setBusinessType] = useState(data.businessType || "");
  const [companyAddress, setCompanyAddress] = useState(
    data.companyAddress || "",
  );
  const [companyPhone, setCompanyPhone] = useState(data.companyPhone || "");
  const [email, setEmail] = useState(data.companyEmail || "");
  const [cacFile, setCacFile] = useState<File | null>(data.cacFile || null);
  const [utilityBill, setUtilityBill] = useState<File | null>(
    data.utilityBill || null,
  );
  const [tin, setTin] = useState(data.tin || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!businessType) {
      notification({
        title: "Form Error",
        message: "Please select a business type",
        type: "danger",
      });
      return;
    }

    if (!cacFile || !utilityBill) {
      notification({
        title: "Form Error",
        message: "Please upload your CAC Certificate and Utility Bill",
        type: "danger",
      });
      return;
    }

    updateSignupData({
      companyName,
      businessType,
      companyAddress,
      companyPhone,
      companyEmail: email,
      cacFile,
      utilityBill,
      tin,
    });

    router.push("/signup/business-contact");
  };

  const handleChange = (
    value: SingleValue<SelectOptionType>,
    type: string,
    field: string,
  ) => {
    if (type === "select" && field === "businessType") {
      setBusinessType(value?.value?.toString() || "");
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F5F9] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-sm">
        <div className="flex items-center justify-between px-10 py-6 border-b border-gray-100">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-1 text-sm border border-gray-200 rounded-lg px-3 py-1.5"
          >
            <ChevronLeft size={16} /> Back
          </button>
          <ClickableLogo className="mb-10" />
          <div className="w-16" />
        </div>

        <Stepper steps={STEPS} currentStep={0} />

        <form className="px-10 py-8" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-textColor mb-2">
            Company Name
          </label>
          <TextInput
            className="w-full mb-6"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            name="companyName"
            placeholder="Verified Co Ltd"
          />
          <SelectInput
            className="w-full mb-6"
            onChange={(val) =>
              handleChange(
                val as SingleValue<SelectOptionType>,
                "select",
                "businessType",
              )
            }
            value={
              BUSINESS_TYPES.find((option) => option.value === businessType) ||
              null
            }
            label="Business Type"
            options={BUSINESS_TYPES}
            placeholder="Select business type"
          />
          <label className="block text-sm font-medium text-textColor mb-2">
            Company Address
          </label>
          <textarea
            className="w-full mb-6 border border-gray-200 rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:border-[#A3195B]"
            rows={3}
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
            placeholder="15 Broad Street, Lagos Island, Lagos"
          />

          <label className="block text-sm font-medium text-textColor mb-2">
            Company Phone
          </label>
          <div className="mb-6">
            <PhoneInput
              value={companyPhone}
              onChange={setCompanyPhone}
              placeholder="08152536637"
              
            />
          </div>

          <label className="block text-sm font-medium text-textColor mb-2">
            Email Address
          </label>
          <TextInput
            className="w-full mb-6"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="contact@verifiedco.ng"
          />

          <FileUpload
            label="Upload CAC Certificate"
            required
            fileName={cacFile?.name}
            onChange={setCacFile}
          />

          <FileUpload
            label="Upload Utility Bill"
            required
            fileName={utilityBill?.name}
            onChange={setUtilityBill}
          />

          <label className="block text-sm font-medium text-textColor mb-2">
            TIN
          </label>
          <TextInput
            className="w-full mb-8"
            value={tin}
            onChange={(e) => setTin(e.target.value)}
            name="tin"
            maxValue={10}
            placeholder="Enter TIN"
          />

          <Button
            className="w-full text-lg ff-bold !rounded-xl !bg-[#A3195B] hover:!bg-[#8a1550]"
            paddingY="p-3.5"
            type="submit"
          >
            Save & Proceed
          </Button>

          <p className="mt-6 text-center text-sm">
            Already have an account?&nbsp;
            <Link href="/login">
              <span className="text-[#A3195B] cursor-pointer font-medium">
                Login
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
