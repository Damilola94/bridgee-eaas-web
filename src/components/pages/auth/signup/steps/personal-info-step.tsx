"use client";
import type React from "react";

import TextInput from "../../../../inputs/Text";
import Button from "../../../../inputs/Button";

interface PersonalInfoStepProps {
  form: any
  handleChange: (val: any, type?: string, inputName?: string) => void
  handleContinue: () => void
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ form, handleChange, handleContinue }) => {
  return (
    <div className="w-full">
      <h1 className="w-full text-textColor ff-bold text-xl mb-5">Personal Information</h1>

      <div className="w-full">
        <div className="flex flex-wrap -mx-2">
          <div className="w-full sm:w-1/2 px-2">
            <TextInput
              className="w-full mb-7"
              onChange={handleChange}
              value={form?.firstName || ""}
              label="First Name"
              name="firstName"
              placeholder="First Name"
            />
          </div>
          <div className="w-full sm:w-1/2 px-2">
            <TextInput
              className="w-full mb-7"
              onChange={handleChange}
              value={form?.lastName || ""}
              label="Last Name"
              name="lastName"
              placeholder="Last Name"
            />
          </div>
        </div>

        <TextInput
          className="w-full mb-7"
          onChange={handleChange}
          value={form?.dateOfBirth || ""}
          type="date"
          label="Date of birth"
          name="dateOfBirth"
        />

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
