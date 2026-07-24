// pages/signup/submitted.tsx
import React from "react";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import ClickableLogo from "../../components/pages/auth/ClickableLogo";

export default function Submitted() {
  return (
    <div className="min-h-screen bg-[#F4F5F9] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-sm px-10 py-14 text-center">
        <ClickableLogo className="mb-8 justify-center" />

        <CheckCircle2
          size={72}
          strokeWidth={1.5}
          className="text-[#A3195B] mx-auto mb-6"
        />

        <h1 className="text-2xl ff-bold text-textColor mb-3">Submitted</h1>
        <p className="text-gray-500 text-sm max-w-xs mx-auto mb-8">
          Your account creation request has been successfully submitted for
          review
        </p>

        <p className="text-center text-sm">
          Already have an account?&nbsp;
          <Link href="/login">
            <span className="text-[#A3195B] cursor-pointer font-medium">
              Login
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}