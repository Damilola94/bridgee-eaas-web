// pages/signup/company-information.tsx
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import TextInput from "../../components/inputs/Text";
import Button from "../../components/inputs/Button";
import FileUpload from "../../components/inputs/FileUpload";
import PhoneInput from "../../components/inputs/PhoneInput";
import Stepper from "./Stepper";
import notification from "../../utilities/notification";
import handleFetch from "../../services/api/handleFetch";
import ClickableLogo from "../../components/pages/auth/ClickableLogo";

const STEPS = [
  { label: "Company Information" },
  { label: "Business Contact Information" },
  { label: "Email Verification" },
];

export default function CompanyInformation() {
  const router = useRouter();

  const [companyName, setCompanyName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [email, setEmail] = useState("");
  const [cacFile, setCacFile] = useState<File | null>(null);
  const [utilityBill, setUtilityBill] = useState<File | null>(null);
  const [tin, setTin] = useState("");

  const saveMutation = useMutation(handleFetch, {
    onSuccess: () => router.push("/signup/business-contact"),
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Something went wrong.",
        type: "danger",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cacFile || !utilityBill) {
      notification({
        title: "Form Error",
        message: "Please upload your CAC Certificate and Utility Bill",
        type: "danger",
      });
      return;
    }

    const formData = new FormData();
    formData.append("companyName", companyName);
    formData.append("businessType", businessType);
    formData.append("companyAddress", companyAddress);
    formData.append("companyPhone", companyPhone);
    formData.append("email", email);
    formData.append("cacFile", cacFile);
    formData.append("utilityBill", utilityBill);
    formData.append("tin", tin);

    saveMutation.mutate({
      service: "identity-service/",
      endpoint: "api/v1/business/company-information",
      extra: "",
      method: "POST",
      body: formData,
      isFormData: true,
    });
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

          <label className="block text-sm font-medium text-textColor mb-2">
            Business Type
          </label>
          <TextInput
            className="w-full mb-6"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            name="businessType"
            placeholder="Limited Liability Company"
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
            placeholder="Enter TIN"
          />

          <Button
            className="w-full text-lg ff-bold !rounded-xl !bg-[#A3195B] hover:!bg-[#8a1550]"
            paddingY="p-3.5"
            type="submit"
            loading={saveMutation.isLoading}
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
