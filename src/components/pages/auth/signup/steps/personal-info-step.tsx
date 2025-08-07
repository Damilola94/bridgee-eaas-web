"use client";

import type React from "react";

import TextInput from "../../../../inputs/Text";
import Button from "../../../../inputs/Button";

interface PersonalInfoStepProps {
  form: any
  handleChange: (val: any, type?: string, inputName?: string) => void
  handleContinue: () => void
  bvnData?: any
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  form, handleChange, handleContinue, bvnData
}) => {

  const formatDateForInput = (dateString: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    } catch {
      return "";
    }
  };

  return (
    <div className="w-full">
      <h1 className="w-full text-center text-textColor ff-bold text-3xl mb-20">Personal Information</h1>
      <div className="w-full">
        <div className="flex flex-wrap -mx-2">
          <div className="w-full sm:w-1/2 px-2">
            <TextInput
              className="w-full mb-7"
              onChange={handleChange}
              value={bvnData?.firstName || form?.firstName || ""}
              label="First Name"
              name="firstName"
              placeholder="First Name"
              disabled={!!bvnData?.firstName}
            />
          </div>
          <div className="w-full sm:w-1/2 px-2">
            <TextInput
              className="w-full mb-7"
              onChange={handleChange}
              value={bvnData?.lastName || form?.lastName || ""}
              label="Last Name"
              name="lastName"
              placeholder="Last Name"
              disabled={!!bvnData?.lastName}
            />
          </div>
        </div>

        <TextInput
          className="w-full mb-7"
          onChange={handleChange}
          value={bvnData?.dateOfBirth ? formatDateForInput(bvnData.dateOfBirth) : form?.dateOfBirth || ""}
          type="date"
          label="Date of birth"
          name="dateOfBirth"
          disabled={!!bvnData?.dateOfBirth}
        />

        {bvnData?.gender && (
          <div className="w-full mb-7">
            <label className="block text-sm font-medium mb-2">Gender</label>
            <input
              type="text"
              value={bvnData.gender}
              className="w-full h-12 px-3 border border-gray-300 rounded-md bg-gray-100"
              disabled={true}
            />
          </div>
        )}

        <Button
          className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl"
          paddingY="p-3.5"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
