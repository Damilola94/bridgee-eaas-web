"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";

import CheckCircle from "../../../../assets/svgs/check-circle.svg";
// import { useAccountsContext } from "../../../../context/Accounts";
import useGetQuery from "../../../../hooks/useGetQuery";
import handleFetch from "../../../../services/api/handleFetch";
import type { FundTransferProps } from "../../../../types/transaction";
import notification from "../../../../utilities/notification";
import Loading from "../../../common/Loading";

import Modal from "../../../common/Modal";
import Button from "../../../inputs/Button";

import PINValidation from "./PINValidation";

type Props = {
  onClose: () => void
}

function Index({ onClose }: Props) {
  // const { accounts } = useAccountsContext();
  const [formIndex, setFormIndex] = useState(0);
  const [form, setForm] = useState<FundTransferProps>({});

  const [accountNoToBeVerified, setAccountNoToBeVerified] = useState<string | undefined>(undefined);
  const accountNoIsVerified = useRef(false);

  // const { defaultWallets } = accounts || {};

  const { status: categoryStatus } = useGetQuery({
    endpoint: "category",
    queryKey: ["get-transaction-categories"]
  });
  const { data: accountDetails, status: enquiryStatus } = useGetQuery({
    endpoint: "transaction",
    extra: "account-name-enquiry",
    pQuery: {
      myDestinationBankCode: form?.bankCode?.value,
      myDestinationAccountNumber: accountNoToBeVerified
    },
    queryKey: ["account-name-enquiry", form?.bankCode?.value, accountNoToBeVerified],
    enabled: !!accountNoToBeVerified && !!form?.bankCode?.value
  });

  useEffect(() => {
    if (accountNoToBeVerified) {
      if (enquiryStatus === "success") {
        setForm((prev) => ({
          ...prev,
          accountName: accountDetails?.data?.accountName
        }));
        setAccountNoToBeVerified(undefined);
        accountNoIsVerified.current = true;
      } else if (enquiryStatus === "error") {
        setAccountNoToBeVerified(undefined);
        notification({
          message: "Account name enquiry failed.",
          type: "danger"
        });
      }
    }
  }, [accountDetails, accountNoToBeVerified, enquiryStatus]);

  const transferMutation = useMutation(handleFetch, {
    onSuccess: () => {
      setFormIndex(4);
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Something went wrong.",
        type: "danger"
      });
    }
  });

  const handleChange = (val: any, type = "input", inputName = "") => {
    if (type === "input") {
      const { value, name } = val.target;
      setForm((prev) => ({ ...prev, [name]: value }));

      if (name === "accountNumber") {
        accountNoIsVerified.current = false;
        setForm((prev) => ({ ...prev, accountName: undefined }));
        if (value?.length === 10 && !accountNoIsVerified.current) {
          setAccountNoToBeVerified(value);
        }
      }
    } else {
      setForm((prev) => ({ ...prev, [inputName]: val }));
    }

    if (inputName === "bankCode" && form?.accountNumber?.length === 10 && !accountNoIsVerified.current) {
      setAccountNoToBeVerified(form?.accountNumber);
    }
  };

  const authenticateTransaction = () => {

    setFormIndex(1);

    // if (!form?.pin?.length || form?.pin?.length < 4) {
    //   notification({
    //     title: "Form Error",
    //     message: "Please, enter a valid PIN",
    //     type: "danger"
    //   });
    //   return;
    // }

    // const body = {
    //   ...form,
    //   amount: Number(form?.amount),
    //   bankCode: form?.bankCode?.value,
    //   categoryId: form?.categoryId?.value
    // };

    // delete body.processFee;
    // delete body.accountName;

    // transferMutation.mutate({
    //   endpoint: "transaction",
    //   extra: "interbank-fund-transfer",
    //   body,
    //   method: "POST",
    //   auth: true
    // });
  };

  const { isLoading } = transferMutation;

  return (
    <>
      {(status === "loading" || categoryStatus === "loading") && <Loading />}
      {enquiryStatus === "loading" && <Loading message="Verifying account..." />}
      {isLoading && <Loading message="Processing transfer..." />}

      <Modal isOpen onClose={onClose} maxWidth="max-w-[400px]">

        {formIndex === 0 && (
          <PINValidation onChange={handleChange} onPrev={() => setFormIndex(2)} onSubmit={authenticateTransaction} />
        )}

        {formIndex === 1 && (
          <div className="w-full py-5">
            <div className="w-full mb-10">
              <Image src={CheckCircle} alt="" className="mx-auto" />
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
