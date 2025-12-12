"use client";
import { useCookies } from "react-cookie";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Image from "next/image";

import Button from "../../../../inputs/Button";
import Kite from '../../../../../assets/images/success-kite.gif';

const SuccessStep: React.FC = () => {
  const router = useRouter();
  const [, , removeCookie] = useCookies(["form"]);

  useEffect(() => () => removeCookie("form"), [removeCookie]);

  return (
    <div className="w-full text-center">
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
          <Image src={Kite} alt="Flying kite" width={250} height={250} className="inline-block w-[250px] h-[250px]" />
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-4">Account created successfully!</h1>
      <p className="text-gray-600 mb-8">
        Welcome! Your account has been created and verified. You can now access
        your dashboard.
      </p>

      <Button
        className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl mt-5"
        onClick={() => router.push("/login")}
        paddingY="p-3.5"
      >
        Login
      </Button>
    </div>
  );
};

export default SuccessStep;
