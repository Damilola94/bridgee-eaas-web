import type React from "react";

import Link from "next/link";
import { useCookies } from "react-cookie";

import Button from "../../../../inputs/Button";

const SuccessStep: React.FC = () => {
  const [, setCookie] = useCookies(["data"]);

  const handleProceedToDashboard = () => {
    const mockUserData = {
      accessToken: "mock-jwt-token-" + Math.random().toString(36).substring(2, 15),
      user: {
        id: "user_123",
        email: "new.user@example.com",
        firstName: "Moyinoluwa",
        lastName: "Akindele",
        isVerified: true
      },
      defaultWallets: [
        {
          id: "wallet_001",
          currency: {
            code: "NGN",
            symbol: "₦",
            name: "Nigerian Naira"
          },
          balance: 100000000000,
          virtualAccount: "0234567890"
        }
      ]
    };

    setCookie("data", mockUserData, { secure: true, sameSite: true });

    sessionStorage.setItem("accounts_data", JSON.stringify(mockUserData));
  };
  return (
    <div className="w-full text-center">
      <h1 className="text-2xl font-bold mb-6">Account created successfully</h1>

      <div className="flex justify-center mb-8">
        <div className="w-24 h-24">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#4CAF50" />

            <path
              d="M2 17L12 22L22 17"
              stroke="#4CAF50"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M2 12L12 17L22 12"
              stroke="#4CAF50"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <Link href="/dashboard" onClick={handleProceedToDashboard}>
        <Button
          className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl bg-[#D31FFF] hover:bg-[#B818DE]"
          paddingY="p-3.5"
        >
          Proceed to dashboard
        </Button>
      </Link>
    </div>
  );
};

export default SuccessStep;
