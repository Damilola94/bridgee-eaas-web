"use client";
import AuthCode from "react-auth-code-input";

import Button from "../../../inputs/Button";

type Props = {
  onSubmit: () => void
  onPrev: () => void
  onChange: (val: any, type?: string, inputName?: string) => void
}

function PINValidation({ onPrev, onSubmit, onChange }: Props) {
  return (
    <div className="w-full py-5">
      <div className="mb-7">
        <h1 className="w-full text-textColor ff-bold text-xl">Authenticate Transfer</h1>
      </div>

      <div className="w-full mb-10">
        <p className="text-sm font-bold mb-1">Enter PIN</p>
        <AuthCode
          length={4}
          isPassword
          allowedCharacters="numeric"
          containerClassName="w-full flex justify-between mb-2"
          inputClassName="w-[22%] rounded-lg h-[60px] border border-[#777] outline-none text-center text-xl"
          onChange={(val: string) => onChange(val, "pin", "pin")}
        />
      </div>
      <div className="w-full mb-10">
        <p className="text-sm font-bold mb-1">Re - enter new PIN</p>
        <AuthCode
          length={4}
          isPassword
          allowedCharacters="numeric"
          containerClassName="w-full flex justify-between mb-2"
          inputClassName="w-[22%] rounded-lg h-[60px] border border-[#777] outline-none text-center text-xl"
          onChange={(val: string) => onChange(val, "pin", "pin")}
        />
      </div>

      <div className="w-full space-y-3">
        <div className="px-2">
          <Button
            onClick={onSubmit}
            paddingX="px-10"
            className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl"
            paddingY="p-2.5"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PINValidation;
