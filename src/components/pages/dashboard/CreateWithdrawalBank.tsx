/* eslint-disable no-multi-spaces */
"use client";

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-duplicate-imports */
import type React from "react";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import Image from "next/image";
import Select, { type StylesConfig } from "react-select";

import TextInput from "../../inputs/Text";
import Button from "../../inputs/Button";
import Modal from "../../common/Modal";
import CheckIncompleteCircle from "../../../assets/svgs/check-incomplete-circle.svg";
import type { Bank } from "../../../types/bank";
import { getAccountName, getBanksList, addLinkedBank } from "../../../services/api/bank";
import notification from "../../../utilities/notification";

type BankOptionType = {
  value: string
  label: string
}

const selectStyles: StylesConfig<BankOptionType> = {
  control: (base) => ({
    ...base,
    height: "3rem",
    border: "1px solid #CFCFCF",
    borderRadius: "10px",
    backgroundColor: "#F8F8F8",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#CFCFCF"
    }
  })
};

export default function AccountForm() {
  const [modalOpen, setModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountValidated, setAccountValidated] = useState(false);

  const { data: bankResponse, isLoading: banksLoading } = useQuery("banks", getBanksList);

  const banks: Bank[] =
    bankResponse?.data.map((apiBank) => ({
      bankCode: apiBank.bankCode,
      bankName: apiBank.bankName
    })) || [];

  const bankOptions: BankOptionType[] = banks?.map((bank) => ({
    value: bank.bankCode,
    label: bank.bankName
  }));

  const accountNameMutation = useMutation(getAccountName, {
    onSuccess: (response) => {
      if (response.isSuccess) {
        const nameResult = response.data;
        setAccountName(nameResult);
        setAccountValidated(true);
      }
    },
    onError: (error: any) => {
      setAccountName("");
      setAccountValidated(false);
      notification({
        title: "Invalid Account",
        message: error?.message || "Account verification failed",
        type: "danger"
      });
    }
  });

  const addBankMutation = useMutation(addLinkedBank, {
    onSuccess: (response) => {
      if (response.isSuccess) {
        setShowSuccess(true);
      }
    },
    onError: (error: any) => {
      notification({
        title: "Add Account Failed",
        message: error?.message || "Failed to add account",
        type: "danger"
      });
    }
  });

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (accountValidated) {
      setAccountValidated(false);
      setAccountName("");
    }

    if (value.length === 10 && selectedBank) {
      accountNameMutation.mutate({
        accountNumber: value,
        bankCode: selectedBank.bankCode
      });
    }

    setAccountNumber(value);
  };

  const handleAddAccount = () => {
    if (isFormValid) {
      addBankMutation.mutate({
        bankCode: selectedBank!.bankCode,
        accountNumber,
        accountName,
        isPrimary: false
      });
    }
  };

  const isFormValid = selectedBank && accountNumber && accountName && accountValidated;

  const closeModal = () => {
    setModalOpen(false);
    setShowSuccess(false);
    setSelectedBank(null);
    setAccountNumber("");
    setAccountName("");
    setAccountValidated(false);
  };

  return (
    <>
      <div className="w-full bg-lightGreen py-3 px-4 sm:px-6 md:px-8 rounded-xl">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div className="flex-1 text-green text-sm sm:text-base leading-relaxed">
            <p className="text-center sm:text-left">
              Kindly add your bank for withdrawal (payout)
            </p>
          </div>
          <div className="flex justify-end">
            <Button className="w-full sm:w-auto flex items-center justify-center whitespace-nowrap bg-green text-white"
              paddingY="py-2 sm:py-1.5" onClick={() => setModalOpen(true)}>
              Add New Account
            </Button>
          </div>
        </div>
      </div>

      <Modal isCenter={true} isShowCloseIcon={true} maxWidth="max-w-[450px]" isOpen={modalOpen} onClose={closeModal}>
        {showSuccess ? (
          <div className="text-center pb-10">
            <div className="flex justify-center">
              <Image src={CheckIncompleteCircle || "/placeholder.svg"} alt="success icon" />
            </div>

            <p className="text-xl font-bold text-textColor py-4">Account details added successfully</p>

            <p className="mb-6 text-grey2">Your account details has been added successfully.</p>

            <Button onClick={closeModal} className="mt-4 w-full py-2">
              Go back to account details
            </Button>
          </div>
        ) : (
          <div className="space-y-8 p-6">
            <h2 className="text-lg font-semibold text-gray-900">New Account</h2>

            <div>
              <label className="text-sm font-bold">Select Bank</label>
              <div className="relative mt-2 mb-3">
                <Select
                  options={bankOptions}
                  isLoading={banksLoading}
                  placeholder="Search and select a bank"
                  onChange={(selectedOption: BankOptionType | null) => {
                    const bank = banks?.find((b) => b.bankCode === selectedOption?.value);
                    setSelectedBank(bank || null);
                  }}
                  styles={selectStyles}
                />
              </div>

              <p className="text-xs text-grey">Kindly ensure that your account name match your BVN name</p>
            </div>

            <TextInput
              label="Account Number"
              name="accountNumber"
              placeholder="Input your account number"
              value={accountNumber}
              onChange={handleAccountNumberChange}
              className="h-12"
            />

            <div className="flex justify-end mb-2">
              {accountNameMutation.isLoading && (
                <div className="text-sm font-medium text-[#9CA3AF]">Validating account...</div>
              )}
              {accountName && <p className="text-sm font-medium text-[#9CA3AF]">{accountName}</p>}
            </div>

            <Button
              onClick={handleAddAccount}
              disabled={!isFormValid || addBankMutation.isLoading}
              className="w-full h-12 bg-success text-white rounded-lg"
            >
              {addBankMutation.isLoading ? "Adding..." : "Add Account Details"}
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
}
