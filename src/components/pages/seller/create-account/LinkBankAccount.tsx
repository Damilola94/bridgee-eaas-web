import { ChevronDown } from "lucide-react";
import TextInput from "../../../inputs/Text";
import { StepData } from "../../../../pages/seller/create-account";
import { useState } from "react";
import { Bank } from "../../../../types/bank";
import { useMutation, useQuery } from "react-query";
import { getAccountName, getBanksList } from "../../../../services/api/bank";
import notification from "../../../../utilities/notification";
import Button from "../../../inputs/Button";

interface Props {
  formData: StepData;
  setFormData: (data: StepData) => void;
  onNextStep?: () => void;
}

export default function LinkBankAccount({
  formData,
  setFormData,
  onNextStep,
}: Props) {
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountValidated, setAccountValidated] = useState(false);

  const { data: bankResponse, isLoading: banksLoading } = useQuery(
    "banks",
    getBanksList
  );

  const banks: Bank[] | undefined = bankResponse?.data.map((apiBank) => ({
    bankCode: apiBank.bankCode,
    bankName: apiBank.bankName,
  }));

  const accountNameMutation = useMutation(getAccountName, {
    onSuccess: (response, variables) => {
      if (response.isSuccess) {
        const nameResult = response.data;
        setAccountName(nameResult);
        setAccountValidated(true);

        const updatedFormData = {
          ...formData,
          bankAccount: {
            ...formData.bankAccount,
            accountNumber: variables.accountNumber,
            bankCode: selectedBank?.bankCode || "",
            bank: selectedBank?.bankName || "",
            accountName: nameResult,
          },
        };

        setFormData(updatedFormData);
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

  const handleNext = () => {
    if (onNextStep) {
      onNextStep();
    }
  };

  const isFormValid = selectedBank && accountNumber && accountName;

  return (
    <div className="space-y-8 pb-10">
      <div>
        <label className="text-sm font-bold">Select Bank</label>
        <div className="relative mt-2 mb-3">
          <select
            className="h-12 w-full px-3 border border-[#CFCFCF] rounded-[10px] bg-[#F8F8F8] focus:outline-none focus:ring-2 focus:ring-purple-600 appearance-none text-greyDark"
            value={selectedBank?.bankCode}
            onChange={(e) => {
              const bank = banks?.find(
                (b: Bank) => b.bankCode === e.target.value
              );
              setSelectedBank(bank || null);
            }}
            placeholder="Select Bank "
            disabled={banksLoading}
          >
            <option value="">Select Bank</option>
            {banks?.map((bank: Bank) => (
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
          <p className="text-sm font-medium text-[#9CA3AF]">{accountName}</p>
        )}
      </div>

      <div className="mt-4">
        <Button
          onClick={handleNext}
          disabled={
            !accountValidated || accountNameMutation.isLoading || !isFormValid
          }
          className="w-full h-12 bg-success text-white rounded-lg mt-10"
        >
          {accountNameMutation.isLoading ? "Validating..." : "Continue"}
        </Button>
      </div>
    </div>
  );
}
