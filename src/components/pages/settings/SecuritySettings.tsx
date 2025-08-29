import { useState } from "react";
import ChangePassword from "./ChangePassword";
import AuthCode from "react-auth-code-input";
import Button from "../../inputs/Button";

export default function SecuritySettings() {
  const [securitySubTab, setSecuritySubTab] = useState("Password");

  return (
    <div className="space-y-8">
      <div className="">
        <nav className="flex space-x-8" aria-label="Security Tabs">
          {["Password", "Pin"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSecuritySubTab(tab)}
              className={`py-8 pl-7 pr-40 border-2 rounded-lg bg-white font-medium text-sm whitespace-nowrap ${
                securitySubTab === tab
                  ? "border-success text-purple-600"
                  : "border-[#C4C4C4] border-[0.1px] text-gray-500 hover:text-gray-700 hover:border-success hover:border-2"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {securitySubTab === "Password" && (
        <div className="w-full xl:w-[60%]">
          <ChangePassword />
        </div>
      )}

      {securitySubTab === "Pin" && (
        <div className="w-full xl:w-[45%] bg-white rounded-lg px-10 py-7 shadow">
          <div className="space-y-6">
            <h2 className="font-bold text-xl mb-9">Update PIN</h2>

            <div>
              <div className="space-y-11">
                <div>
                  <div className="text-sm font-medium text-textColor pb-5">
                    Enter PIN
                  </div>
                  <AuthCode
                    length={4}
                    isPassword
                    allowedCharacters="numeric"
                    containerClassName="w-full flex justify-between mb-2"
                    inputClassName="w-[15%] rounded-lg h-[60px] border border-[#777] outline-none text-center text-xl"
                    onChange={() => {}}
                  />
                </div>

                <div>
                  <div className="text-sm font-medium text-textColor pb-5">
                    Re - enter new PIN
                  </div>
                  <AuthCode
                    length={4}
                    isPassword
                    allowedCharacters="numeric"
                    containerClassName="w-full flex justify-between mb-2"
                    inputClassName="w-[15%] rounded-lg h-[60px] border border-[#777] outline-none text-center text-xl"
                    onChange={() => {}}
                  />
                </div>
              </div>

              <Button className="w-full bg-success mt-12">Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}