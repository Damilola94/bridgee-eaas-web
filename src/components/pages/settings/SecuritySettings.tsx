"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import AuthCode from "react-auth-code-input";
import Image from "next/image";

import Button from "../../inputs/Button";

import handleFetch from "../../../services/api/handleFetch";
import notification from "../../../utilities/notification";
import { encryptWithPublicKey } from "../../../utilities/encryptionLogic";
import Loading from "../../common/Loading";
import CheckCircle from "../../../assets/svgs/check-circle.svg";

import ChangePassword from "./ChangePassword";

export default function SecuritySettings() {
  const [securitySubTab, setSecuritySubTab] = useState("Password");

  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [formIndex, setFormIndex] = useState(0);

  const queryClient = useQueryClient();

  const changePinMutation = useMutation(handleFetch, {
    onSuccess: (res: {message: string}) => {
      setFormIndex(1);
      queryClient.invalidateQueries(["wallet-service-accounts"]);
      notification({
        title: "Success",
        message: res?.message || "You have successfully changed your PIN",
        type: "success"
      });
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Failed to change PIN. Please try again.",
        type: "danger"
      });
    }
  });

  const handleChangePin = async () => {
    if (!currentPin || !newPin || !confirmPin) {
      return notification({
        title: "Form Error",
        message: "All PIN fields are required.",
        type: "danger"
      });
    }
    if (newPin !== confirmPin) {
      return notification({
        title: "Form Error",
        message: "New PINs do not match.",
        type: "danger"
      });
    }
    if (newPin.length < 4 || currentPin.length < 4) {
      return notification({
        title: "Form Error",
        message: "PIN must be at least 4 digits.",
        type: "danger"
      });
    }

    try {
      const encryptedCurrentPin = encryptWithPublicKey(currentPin);
      const encryptedNewPin = encryptWithPublicKey(newPin);

      changePinMutation.mutate({
        service: "wallet-service/api/v1",
        endpoint: "walletsecurity",
        extra: "change-pin",
        body: { encryptedCurrentPin, encryptedNewPin },
        method: "POST",
        auth: true
      });
    } catch {
      notification({
        title: "Encryption Error",
        message: "Failed to encrypt PIN. Please try again.",
        type: "danger"
      });
    }
  };

  return (
    <div className="space-y-8">
      {changePinMutation.isLoading && <Loading message="Updating your PIN..." />}

      <div>
        <nav
          className="flex flex-col xl:flex-row gap-x-8 gap-y-2"
          aria-label="Security Tabs"
        >
          {["Password", "Pin"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSecuritySubTab(tab)}
              className={`py-8 pl-7 pr-40 border-2 rounded-lg bg-white font-medium text-sm whitespace-nowrap flex ${
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
          {formIndex === 0 && (
            <div className="space-y-6">
              <h2 className="font-bold text-xl mb-9">Update PIN</h2>

              <div className="space-y-11">
                <div>
                  <div className="text-sm font-medium text-textColor pb-5">
                    Current PIN
                  </div>
                  <AuthCode
                    length={4}
                    isPassword
                    autoFocus
                    allowedCharacters="numeric"
                    containerClassName="w-full flex justify-between mb-2"
                    inputClassName="w-[15%] rounded-lg h-[60px] border border-[#777] outline-none text-center text-xl"
                    onChange={(val) => setCurrentPin(val)}
                  />
                </div>

                <div>
                  <div className="text-sm font-medium text-textColor pb-5">
                    New PIN
                  </div>
                  <AuthCode
                    length={4}
                    isPassword
                    autoFocus={false}
                    allowedCharacters="numeric"
                    containerClassName="w-full flex justify-between mb-2"
                    inputClassName="w-[15%] rounded-lg h-[60px] border border-[#777] outline-none text-center text-xl"
                    onChange={(val) => setNewPin(val)}
                  />
                </div>

                <div>
                  <div className="text-sm font-medium text-textColor pb-5">
                    Re-enter New PIN
                  </div>
                  <AuthCode
                    length={4}
                    isPassword
                    autoFocus={false}
                    allowedCharacters="numeric"
                    containerClassName="w-full flex justify-between mb-2"
                    inputClassName="w-[15%] rounded-lg h-[60px] border border-[#777] outline-none text-center text-xl"
                    onChange={(val) => setConfirmPin(val)}
                  />
                </div>
              </div>

              <Button
                onClick={handleChangePin}
                paddingY="p-3"
                className="w-full bg-success mt-12"
              >
                Save
              </Button>
            </div>
          )}

          {formIndex === 1 && (
            <div className="text-center py-10">
              <Image
                src={CheckCircle || "/placeholder.svg"}
                alt="success"
                className="mx-auto mb-6"
              />
              <h2 className="font-bold text-2xl mb-4">
                PIN Updated Successfully
              </h2>
              <p className="text-lightText text-lg mb-8">
                Your withdrawal PIN has been updated securely.
              </p>
              <Button
                onClick={() => setFormIndex(0)}
                className="w-full bg-success"
              >
                Back to Settings
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
