import React, { useState } from "react";
import { useMutation } from "react-query";
import AuthCode from "react-auth-code-input";

import handleFetch from "../../../services/api/handleFetch";

import notification from "../../../utilities/notification";

import Loading from "../../../components/common/Loading";
import Button from "../../inputs/Button";
import Modal from "../../common/Modal";

interface Props {
  orderReference?: string;
  onClose: () => void;
  onSuccess?: () => void;
}

const ValidateDeliveryPinModal: React.FC<Props> = ({
  orderReference,
  onClose,
  onSuccess
}) => {
  const [pin, setPin] = useState("");

  const validateMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      notification({
        message: res?.data?.message || "Delivery confirmed successfully",
        type: "success"
      });

      onClose();
      onSuccess?.();
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Invalid delivery pin",
        type: "danger"
      });
    }
  });

  const handleValidate = () => {
    if (!pin || pin.length < 4) {
      notification({
        title: "Form Error",
        message: "Please enter a valid delivery pin",
        type: "danger"
      });
      return;
    }

    validateMutation.mutate({
      service: "wallet-service/api/v1/",
      endpoint: "escrows/orders",
      extra: "validate-deliverypin",
      method: "POST",
      body: {
        pin,
        orederReference: orderReference
      }
    });
  };

  const { isLoading } = validateMutation;

  return (
    <Modal
      isOpen={true}
      isCloseOnOverlayClick
      maxWidth="max-w-[400px]"
      onClose={onClose}
    >
      <div className="">

        {isLoading && <Loading />}

        <h2 className="text-lg font-bold mb-2 text-center">
          Confirm Delivery
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Enter the delivery pin provided at delivery
        </p>

        <AuthCode
          length={4}
          allowedCharacters="numeric"
          containerClassName="flex justify-between mb-6"
          inputClassName="w-12 h-14 border rounded text-center"
          onChange={(val: string) => setPin(val)}
        />

        <Button
          className="w-full"
          paddingY="p-3.5"
          onClick={handleValidate}
        >
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

export default ValidateDeliveryPinModal;
