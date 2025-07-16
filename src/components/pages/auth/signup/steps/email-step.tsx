"use client";

import type React from "react";
import Link from "next/link";

import TextInput from "../../../../inputs/Text";
import Button from "../../../../inputs/Button";

interface EmailStepProps {
  form: any;
  handleChange: (val: any, type?: string, inputName?: string) => void;
  handleContinue: () => void;
}

const EmailStep: React.FC<EmailStepProps> = ({
  form,
  handleChange,
  handleContinue
}) => {
  return (
    <div className="w-full">
      <h1 className="text-center text-2xl font-bold mb-6">Create an account</h1>

      <div className="mb-6">
        <TextInput
          className="w-full mb-4"
          onChange={handleChange}
          value={form?.email || ""}
          type="email"
          label="Email Address"
          name="email"
          placeholder="Email Address"
        />
      </div>

      <div className="mb-6">
        <label className="inline-flex items-center space-x-3">
          <input
            type="checkbox"
            value={form?.termsAccepted}
            checked={form?.termsAccepted === "true"}
            onChange={() =>
              handleChange(
                form?.termsAccepted === "true" ? "false" : "true",
                "check",
                "termsAccepted"
              )
            }
            style={{ accentColor: "#D31FFF" }}
            className="w-5 h-5"
          />
          <span>
            By checking the box, you accept bridge by ALAT{" "}
            <Link href="#" className="text-[#D31FFF]">
              Terms and Condition
            </Link>
          </span>
        </label>
      </div>

      <Button
        className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl bg-[#D31FFF] hover:bg-[#B818DE]"
        paddingY="p-3.5"
        onClick={handleContinue}
      >
        Create Account
      </Button>

      <p className="mt-5 text-center">
        Already have an account?&nbsp;
        <Link href="/login">
          <span className="text-[#D31FFF] cursor-pointer">Login here</span>
        </Link>
      </p>
    </div>
  );
};

export default EmailStep;
