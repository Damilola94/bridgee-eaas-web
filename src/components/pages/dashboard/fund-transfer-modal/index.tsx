"use client";

import Image from "next/image";
import { useState } from "react";
import { useMutation } from "react-query";

import SuccessSvg from "../../../../assets/svgs/success-tick.svg";
// import { useAccountsContext } from "../../../../context/Accounts";
import handleFetch from "../../../../services/api/handleFetch";
import type { FundTransferProps } from "../../../../types/transaction";
import notification from "../../../../utilities/notification";
import Loading from "../../../common/Loading";

import Modal from "../../../common/Modal";
import Button from "../../../inputs/Button";

import { useAccountsContext } from "../../../../context/Accounts";

import AccountEnquiryForm from "./AccountEnquiryForm";
import AmountDetails from "./AmountDetails";
import PINValidation from "./PINValidation";
import TransactionSummary from "./TransactionSummary";

type Props = {
  onClose: () => void
}

function Index({ onClose }: Props) {
  const { accounts } = useAccountsContext();
  const { wallet, identity } = accounts || {};
  const primaryAccount = identity?.accountDetails[0];

  const [formIndex, setFormIndex] = useState(0);
  const [form, setForm] = useState<FundTransferProps>({});

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
    } else {
      setForm((prev) => ({ ...prev, [inputName]: val }));
    }
  };

  const processAccountEnquiry = () => {
    let error;
    if (!primaryAccount.bankName) error = "Please, select a bank";
    if (!primaryAccount.accountNumber) error = "Please, enter a valid account number";
    if (!primaryAccount.accountName) error = "Please, enter a valid account number";

    if (error) {
      notification({ title: "Form Error", message: error, type: "danger" });
      return;
    }
    setFormIndex(1);
  };

  const processAmountDetails = () => {
    const balance = wallet?.wallets?.[0]?.balance || 0;
    const amount = Number(form?.amount) || 0;

    if (balance < amount) {
      notification({
        title: "Insufficient Balance",
        message: "Your wallet balance is lower than the entered amount.",
        type: "danger"
      });
      return;
    }

    setFormIndex(2);
  };

  const authenticateTransaction = () => {
    if (!form?.pin?.length || form?.pin?.length < 4) {
      notification({
        title: "Form Error",
        message: "Please, enter a valid PIN",
        type: "danger"
      });
      return;
    }

    const body = {
      amount: Number(form?.amount),
      accountNumber: primaryAccount.accountNumber,
      pin: form?.pin
    };

    transferMutation.mutate({
      service: 'wallet-service/api/v1',
      endpoint: "wallets",
      extra: "withdraw-fund",
      body,
      method: "POST",
      auth: true
    });
  };

  const { isLoading } = transferMutation;

  return (
    <>
      {isLoading && <Loading message="Processing transfer..." />}

      <Modal isOpen onClose={onClose} maxWidth="max-w-[400px]">
        {formIndex === 0 && (
          <AccountEnquiryForm
            form={form}
            onChange={handleChange}
            onNext={processAccountEnquiry}
          />
        )}

        {formIndex === 1 && (
          <AmountDetails
            form={form}
            onChange={handleChange}
            onPrev={() => setFormIndex(0)}
            onNext={processAmountDetails}
          />
        )}

        {formIndex === 2 && (
          <TransactionSummary form={form} onPrev={() => setFormIndex(1)} onNext={() => setFormIndex(3)} />
        )}

        {formIndex === 3 && (
          <PINValidation onChange={handleChange} onPrev={() => setFormIndex(2)} onSubmit={authenticateTransaction} />
        )}

        {formIndex === 4 && (
          <div className="w-full py-5">
            <div className="mb-7">
              <h1 className="w-full pr-10 text-textColor ff-bold text-xl">
                Transaction has been initiated successfully
              </h1>
            </div>

            <div className="w-full mb-10">
              <Image src={SuccessSvg} alt="" className="mx-auto" />
            </div>

            <Button
              onClick={onClose}
              paddingX="px-10"
              className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl"
              paddingY="p-2.5"
            >
              Close
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
}

export default Index;
