"use client";
import TextInput from "../../../../inputs/Text";
import Button from "../../../../inputs/Button";
import Loading from "../../../../common/Loading";

interface PasswordStepProps {
  form: any
  handleChange: (val: any, type?: string, inputName?: string) => void
  handleContinue: () => void
  isLoading?: boolean
}

export default function PasswordStep({
  form, handleChange, handleContinue, isLoading = false
}: PasswordStepProps) {
  return (
    <div className="w-full">
      {isLoading && <Loading />}

      <h1 className="w-full text-textColor ff-bold text-xl mb-5">Create Password</h1>

      <TextInput
        className="w-full mb-3"
        onChange={handleChange}
        value={form?.password || ""}
        type="password"
        label="Password"
        name="password"
        placeholder="Password"
      />

      <Button
        className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl"
        paddingY="p-3.5"
        onClick={handleContinue}
        disabled={isLoading}
      >
        {isLoading ? "Creating Account..." : "Create Account"}
      </Button>
    </div>
  );
}
