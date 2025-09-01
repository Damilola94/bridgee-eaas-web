"use client";

import Image from "next/image";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import CheckCircle from "../../../../assets/svgs/check-circle.svg";
import handleFetch from "../../../../services/api/handleFetch";
import notification from "../../../../utilities/notification";
import Loading from "../../../common/Loading";
import Modal from "../../../common/Modal";
import Button from "../../../inputs/Button";
import { encryptWithPublicKey } from "../../../../utilities/encryptionLogic";

import PINValidation from "./PINValidation";

type Props = {
  onClose: () => void;
};

function Index({ onClose }: Props) {
  const [formIndex, setFormIndex] = useState(0);
  const [pin, setPin] = useState("");
  const queryClient = useQueryClient();

  const [confirmPin, setConfirmPin] = useState("");

  const setPinMutation = useMutation(handleFetch, {
    onSuccess: () => {
      setFormIndex(1);
      queryClient.invalidateQueries(['wallet-service-accounts']);
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Failed to set PIN. Please try again.",
        type: "danger"
      });
    }
  });

  const handleSubmitPin = async () => {
    if (!pin || !confirmPin) {
      return notification({
        title: "Form Error",
        message: "Please enter both PIN fields.",
        type: "danger"
      });
    }
    if (pin !== confirmPin) {
      return notification({
        title: "Form Error",
        message: "PINs do not match.",
        type: "danger"
      });
    }
    if (pin.length < 4) {
      return notification({
        title: "Form Error",
        message: "PIN must be at least 4 digits.",
        type: "danger"
      });
    }

    try {
      const encryptedPin = encryptWithPublicKey(pin);
      setPinMutation.mutate({
        endpoint: "wallet-service/api/v1/walletsecurity/set-pin",
        body: { encryptedPin },
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
    <>
      {setPinMutation.isLoading && <Loading message="Setting up your PIN..." />}
      <Modal isOpen onClose={onClose} maxWidth="max-w-[400px]">
        {formIndex === 0 && (
          <PINValidation
            onPrev={onClose}
            onSubmit={handleSubmitPin}
            onChange={(val: string, field: "pin" | "confirmPin") => {
              if (field === "pin") setPin(val);
              if (field === "confirmPin") setConfirmPin(val);
            }}
          />
        )}

        {formIndex === 1 && (
          <div className="w-full py-5">
            <div className="w-full mb-10">
              <Image
                src={CheckCircle || "/placeholder.svg"}
                alt=""
                className="mx-auto"
              />
            </div>
            <div className="mb-7 mx-auto ">
              <h1 className="w-full text-textColor ff-bold text-2xl text-center">
                Withdrawal Password Created Successfully
              </h1>
            </div>
            <p className="mb-10 text-center text-lightText text-lg">
              Your withdrawal password has been created successfully.
            </p>
            <Button
              onClick={onClose}
              paddingX="px-10"
              className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl"
              paddingY="p-2.5"
            >
              Go back to dashboard
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
}

export default Index;
