import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import notification from "../../../utilities/notification";

import Modal from "../../common/Modal";
import Button from "../../inputs/Button";
import handleFetch from "../../../services/api/handleFetch";
import Loading from "../../common/Loading";
import TextInput from "../../inputs/Text";
import useGetQuery from "../../../hooks/useGetQuery";

type Props = {
  onClose: () => void;
  escrowId?: string;
  rateId?: string;
  invoiceId?: string;
  recipientDetails?: {
    address: string;
    phoneNumber: string;
    email: string;
  };
};

function UpdateAddressModal({
  onClose,
  escrowId,
  invoiceId,
  recipientDetails
}: Props) {
  const [newAddress, setNewAddress] = useState(recipientDetails?.address || "");
  const [debouncedAddress, setDebouncedAddress] = useState('');

  const queryClient = useQueryClient();
  const addUpdateMutation = useMutation(handleFetch, {
    onSuccess: () => {
      queryClient.invalidateQueries(["escrow", escrowId]);
      onClose();
    },
    onError: (err) => {
      notification({
        title: "Error",
        message:
            String(err) || "An error occurred while requesting for payment OTP",
        type: "danger"
      });
    }
  });

  const updateRecipientAddress = () => {
    if (newAddress?.length < 6) {
      notification({
        title: "Form Error",
        message: "Please, enter a valid Address",
        type: "danger"
      });
      return;
    }

    const body = {
      address: newAddress,
      phone: recipientDetails?.phoneNumber,
      email: recipientDetails?.email,
      invoiceId: invoiceId
    };

    addUpdateMutation.mutate({
      endpoint: "escrow",
      extra: "address/update",
      method: "PUT",
      body,
      auth: true
    });
  };

  const handleUpdateAddBlur = () => {
    setDebouncedAddress(newAddress);
  };

  const { status, isLoading: validateLoading } = useGetQuery({
    endpoint: 'logistic',
    extra: `address/validation`,
    param: debouncedAddress,
    queryKey: ['validate-address'],
    enabled: !!debouncedAddress
  });

  const disabledBtn = status === "success" ? false : true;
  const errorMsg = status === "error" ? "Address is Invalid" : "";

  useEffect(() => {
    if (status === "error"){
      setDebouncedAddress("");
    } else if (status === "success"){
      setDebouncedAddress("");
    }
  }, [status]);

  const { isLoading } = addUpdateMutation;

  return (
    <>
      {isLoading && <Loading message="Updating Recipient Address"/>}
      {validateLoading && <Loading message="Validating Address"/>}
      <Modal isOpen onClose={onClose} maxWidth="max-w-[400px]">
        <div className="w-full py-5">
          <div className="mb-7">
            <h1 className="w-full text-textColor ff-bold text-xl">
                Update Recipient’s Delivery Details
            </h1>
          </div>

          <div className="w-full mb-10">
            <TextInput
              onChange={(e) => setNewAddress(e?.target?.value)}
              onBlur={handleUpdateAddBlur}
              className="w-full mb-5"
              value={newAddress || ""}
              name="email"
              type="email"
              label="Recipient’s Address"
              placeholder="54 Marina, Lagos Island"
            />
            <p className="text-red-600 -mt-4 ml-1 text-xs">{errorMsg}</p>
          </div>
          <div className="w-full">
            <div className="px-2">
              <Button
                disabled={disabledBtn}
                onClick={updateRecipientAddress}
                paddingX="px-10"
                className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl"
                paddingY="p-2.5"
              >
                  Save and Continue
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default UpdateAddressModal;
