import React, { useState, useEffect } from "react";

import { Dispatch, SetStateAction } from "react";

import { ChevronDown } from "lucide-react";

import { useMutation, useQuery, useQueryClient } from "react-query";

import Image from "next/image";

import ToggleInput from "../../inputs/Toggle";
import Modal from "../../common/Modal";

import CheckIncompleteCircle from "../../../assets/svgs/check-incomplete-circle.svg";
import TextInput from "../../inputs/Text";
import Button from "../../inputs/Button";
import { Account, Bank } from "../../../types/bank";

import {
  getAccountName,
  getBanksList,
  addLinkedBank,
  setPrimaryLinkedBank,
  deleteLinkedBank,
} from "../../../services/api/bank";
import notification from "../../../utilities/notification";
import { useAccountsContext } from "../../../context/Accounts";

import { QUERY_KEYS } from "../../../configs/constants";

export default function AccountDetails() {
  const { accounts } = useAccountsContext();
  const queryClient = useQueryClient();

  const accountDetails: Account[] = accounts?.identity?.accountDetails || [];
  const isSuccess = accounts?.identity;

  const sortedAccountDetails = [...accountDetails].sort(
    (a, b) => Number(b.isPrimary) - Number(a.isPrimary)
  );

  const [primaryStatuses, setPrimaryStatuses] = useState<boolean[]>([]);
  const [hasAddedAccount, setHasAddedAccount] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountValidated, setAccountValidated] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<{
    account: any;
    index: number;
  } | null>(null);

  // Initialize statuses when data loads
  useEffect(() => {
    if (isSuccess && accountDetails.length > 0) {
      setPrimaryStatuses(accountDetails.map((account) => account.isPrimary));
    }
  }, [isSuccess, accountDetails]);

  const { data: bankResponse, isLoading: banksLoading } = useQuery(
    "banks",
    getBanksList
  );

  const banks: Bank[] =
    bankResponse?.data.map((apiBank) => ({
      bankCode: apiBank.bankCode,
      bankName: apiBank.bankName,
    })) || [];

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
        type: "danger",
      });
    },
  });

  const addBankMutation = useMutation(addLinkedBank, {
    onSuccess: (response) => {
      if (response.isSuccess) {
        setShowSuccess(true);
        setHasAddedAccount(true);
      }
    },
    onError: (error: any) => {
      notification({
        title: "Add Account Failed",
        message: error?.message || "Failed to add account",
        type: "danger",
      });
    },
  });

  //set primary bank
  const setPrimaryMutation = useMutation(setPrimaryLinkedBank, {
    onSuccess: (response) => {
      if (response.isSuccess) {
        notification({
          title: "Success",
          message: "Primary account set successfully.",
          type: "success",
        });

        queryClient.invalidateQueries([QUERY_KEYS.IDENTITY_ACCOUNTS]);
      } else {
        // Revert UI on failure
        setPrimaryStatuses((prev) =>
          prev.map((status, i) =>
            i === currentToggleIndex ? !isPrimaryToRevert : status
          )
        );
        notification({
          title: "Set Primary Failed",
          message: response.message || "Failed to set primary account",
          type: "danger",
        });
      }
    },
    onError: (error: any) => {
      // Revert UI on failure
      setPrimaryStatuses((prev) =>
        prev.map((status, i) =>
          i === currentToggleIndex ? !isPrimaryToRevert : status
        )
      );
      notification({
        title: "Set Primary Failed",
        message: error?.message || "Failed to set primary account",
        type: "danger",
      });
    },
  });

  const deleteBankMutation = useMutation(deleteLinkedBank, {
    onSuccess: (response) => {
      if (response.isSuccess) {
        notification({
          title: "Success",
          message: "Bank account deleted successfully.",
          type: "success",
        });

        queryClient.invalidateQueries([QUERY_KEYS.IDENTITY_ACCOUNTS]);
      } else {
        notification({
          title: "Delete Failed",
          message: response.message || "Failed to delete bank account",
          type: "danger",
        });
      }
    },
    onError: (error: any) => {
      notification({
        title: "Delete Failed",
        message: error?.message || "Failed to delete bank account",
        type: "danger",
      });
    },
  });

  let currentToggleIndex = -1;
  let isPrimaryToRevert = false;

  const handleAccountNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    if (accountValidated) {
      setAccountValidated(false);
      setAccountName("");
    }

    if (value.length === 10 && selectedBank) {
      accountNameMutation.mutate({
        accountNumber: value,
        bankCode: selectedBank.bankCode,
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
        isPrimary: false,
      });
    }
  };

  const isFormValid =
    selectedBank && accountNumber && accountName && accountValidated;

  const handleTogglePrimary = (index: number, isPrimary: boolean) => {
    console.log(`Toggling primary for account ${index}: ${isPrimary}`);

    setPrimaryStatuses((previousStatuses) =>
      previousStatuses.map((currentStatus, statusIndex) =>
        statusIndex === index ? isPrimary : currentStatus
      )
    );

    // If set to primary
    if (isPrimary) {
      // Unset all others
      setPrimaryStatuses((previousStatuses) =>
        previousStatuses.map((currentStatus, statusIndex) =>
          statusIndex === index ? true : false
        )
      );

      const account = accountDetails[index];

      if (account && account.linkedBankId) {
        currentToggleIndex = index; // For revert on failure
        isPrimaryToRevert = false;
        setPrimaryMutation.mutate({ linkedBankId: account.linkedBankId });
      } else {
        notification({
          title: "Error",
          message: "Cannot set primary: No linked bank ID available.",
          type: "danger",
        });

        setPrimaryStatuses((prev) =>
          prev.map((status, i) => (i === index ? !status : status))
        );
      }
    }
  };

  const handleToggle =
    (index: number): Dispatch<SetStateAction<boolean>> =>
    (val: boolean | SetStateAction<boolean>) => {
      if (typeof val === "boolean") {
        handleTogglePrimary(index, val);
      }
    };

  const closeModal = () => {
    setModalOpen(false);
    setShowSuccess(false);

    if (hasAddedAccount) {
      queryClient.invalidateQueries([QUERY_KEYS.IDENTITY_ACCOUNTS]);
      setHasAddedAccount(false);
    }

    setSelectedBank(null);
    setAccountNumber("");
    setAccountName("");
    setAccountValidated(false);
  };

  const handleDeleteBank = (account: any, index: number) => {
    setAccountToDelete({ account, index });
    setDeleteModalOpen(true);
  };

  const confirmDeleteBank = () => {
    if (accountToDelete?.account?.linkedBankId) {
      deleteBankMutation.mutate({
        linkedBankId: accountToDelete.account.linkedBankId,
      });
      setDeleteModalOpen(false);
    } else {
      notification({
        title: "Error",
        message: "Cannot delete: No linked bank ID available.",
        type: "danger",
      });
      setDeleteModalOpen(false);
    }
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setAccountToDelete(null);
  };

  return (
    <>
      {isSuccess ? (
        <>
          {sortedAccountDetails.map((account: any, sortedIndex: number) => {
            const originalIndex = accountDetails.findIndex(
              (acc) => acc.accountNumber === account.accountNumber
            );

            return (
              <div
                key={account.accountNumber}
                className="bg-white rounded-lg p-10 shadow w-full xl:w-[60%] mt-12"
              >
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Account Details
                  </h2>
                  <div>
                    {/* Table Header */}
                    <div className="grid grid-cols-4 gap-4 py-3 px-4 border-b border-gray-200 text-sm font-medium text-textColor/50">
                      <div>Bank</div>
                      <div>Account Number</div>
                      <div>Account Name</div>
                      <div className="hidden lg:block text-right">Actions</div>
                    </div>
                    {/* Table Row */}
                    <div key={sortedIndex}>
                      <div className="grid grid-cols-4 gap-4 py-4 px-4 border-b border-gray-200 items-center">
                        <div className="text-sm text-gray-900">
                          {account.bankName}
                        </div>
                        <div className="text-sm text-gray-900">
                          {account.accountNumber}
                        </div>
                        <div className="text-sm text-gray-900">
                          {account.accountName}
                        </div>
                        <div className="flex items-center justify-end space-x-2">
                          {/* Delete Icon */}
                          <button
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            onClick={() =>
                              handleDeleteBank(account, originalIndex)
                            }
                            disabled={deleteBankMutation.isLoading}
                          >
                            <svg
                              width="24"
                              height="25"
                              viewBox="0 0 24 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M21 6.48C17.67 6.15 14.32 5.98 10.98 5.98C9 5.98 7.02 6.08 5.04 6.28L3 6.48"
                                stroke="#6B7280"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M8.5 5.47L8.72 4.16C8.88 3.21 9 2.5 10.69 2.5H13.31C15 2.5 15.13 3.25 15.28 4.17L15.5 5.47"
                                stroke="#6B7280"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M18.85 9.64L18.2 19.71C18.09 21.28 18 22.5 15.21 22.5H8.79002C6.00002 22.5 5.91002 21.28 5.80002 19.71L5.15002 9.64"
                                stroke="#6B7280"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M10.33 17H13.66"
                                stroke="#6B7280"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M9.5 13H14.5"
                                stroke="#6B7280"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="mt-2 px-4 py-2">
                        <ToggleInput
                          label="Set as primary account"
                          value={primaryStatuses[originalIndex]}
                          onChange={handleToggle(originalIndex)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {accountDetails.length === 0 && (
            <div className="bg-white rounded-lg p-10 shadow w-full xl:w-[60%] mt-12">
              <div className="space-y-6">
                <div className="py-4 px-4 text-sm text-gray-500">
                  No account details available.
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-lg p-10 shadow w-full xl:w-[60%] mt-12">
          <div className="space-y-6">
            <div className="py-4 px-4 text-sm text-gray-500">
              Loading account details...
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <Button className="py-2" onClick={() => setModalOpen(true)}>
          Add New Account
        </Button>
      </div>

      <Modal
        isCenter={true}
        isShowCloseIcon={true}
        maxWidth="max-w-[450px]"
        isOpen={modalOpen}
        onClose={closeModal}
      >
        {showSuccess ? (
          <div className="text-center pb-10">
            <div className="flex justify-center">
              <Image src={CheckIncompleteCircle} alt="success icon" />
            </div>

            <p className="text-xl font-bold text-textColor py-4">
              Account details added successfully
            </p>

            <p className="mb-6 text-grey2">
              Your account details has been added successfully.
            </p>

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
                <select
                  className="h-12 w-full px-3 border border-[#CFCFCF] rounded-[10px] bg-[#F8F8F8] focus:outline-none focus:ring-2 focus:ring-purple-600 appearance-none text-greyDark"
                  value={selectedBank?.bankCode || ""}
                  onChange={(e) => {
                    const bank = banks.find(
                      (b: Bank) => b.bankCode === e.target.value
                    );
                    setSelectedBank(bank || null);
                  }}
                  disabled={banksLoading}
                >
                  <option value="">Select Bank</option>
                  {banks.map((bank: Bank) => (
                    <option key={bank.bankCode} value={bank.bankCode}>
                      {bank.bankName}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-[6px] flex items-center px-2 pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-grey" />
                </div>
              </div>
              <p className="text-xs text-grey">
                Kindly ensure that your account name match your BVN name
              </p>
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
                <div className="text-sm font-medium text-[#9CA3AF]">
                  Validating account...
                </div>
              )}
              {accountName && (
                <p className="text-sm font-medium text-[#9CA3AF]">
                  {accountName}
                </p>
              )}
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

      <Modal
        isCenter={true}
        isShowCloseIcon={true}
        maxWidth="max-w-[400px]"
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
      >
        <div className="text-center p-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 9V11M12 15H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="#DC2626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Delete Bank Account
          </h3>

          <p className="text-sm text-gray-600 mb-6">
            Are you sure you want to delete the account ending in{" "}
            <span className="font-medium text-gray-900">
              {accountToDelete?.account?.accountNumber?.slice(-4)}
            </span>
            ? This action cannot be undone.
          </p>

          <div className="flex gap-3">
            <Button
              onClick={closeDeleteModal}
              className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 hover:bg-gray-200"
              disabled={deleteBankMutation.isLoading}
            >
              Cancel
            </Button>

            <Button
              onClick={confirmDeleteBank}
              disabled={deleteBankMutation.isLoading}
              className="flex-1 py-2 px-4 bg-red-600 text-white hover:bg-red-700"
            >
              {deleteBankMutation.isLoading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
