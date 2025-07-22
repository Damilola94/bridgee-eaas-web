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
      <h1 className="w-full text-center text-textColor ff-bold text-3xl mb-20">
        Create an account
      </h1>
      <TextInput
        className="w-full mb-7"
        onChange={handleChange}
        value={form?.email || ""}
        type="email"
        label="Email Address"
        name="email"
        placeholder="Email Address"
      />

      <label className="my-5 inline-flex items-center space-x-3">
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
          style={{ accentColor: "#683AB7" }}
          className="w-5 h-5"
        />
        <span>I accept the  <Link href="/terms-and-condition">
          <span className="text-success cursor-pointer">Terms and condition</span>
        </Link></span>
      </label>

      <Button
        className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl"
        paddingY="p-3.5"
        onClick={handleContinue}
      >
        Create Account
      </Button>

      <p className="mt-5 text-center">
        Already have an account?&nbsp;
        <Link href="/login">
          <span className="text-success cursor-pointer">Login here</span>
        </Link>
      </p>
    </div>
  );
};

export default EmailStep;
