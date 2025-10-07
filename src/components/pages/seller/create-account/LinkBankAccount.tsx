import TextInput from "../../../inputs/Text";
import { StepData } from "../../../../pages/seller/create-account";
import { useState } from "react";
import { Bank } from "../../../../types/bank";
import { useMutation, useQuery } from "react-query";
import { getAccountName, getBanksList } from "../../../../services/api/bank";
import notification from "../../../../utilities/notification";
import Button from "../../../inputs/Button";
import Select, { StylesConfig } from "react-select";

interface Props {
  formData: StepData;
  setFormData: (data: StepData) => void;
  onNextStep?: () => void;
}

type BankOptionType = {
  value: string;
  label: string;
};

// Define the styles object with the correct type
const selectStyles: StylesConfig<BankOptionType> = {
  control: (base) => ({
    ...base,
    height: "3rem",
    border: "1px solid #CFCFCF",
    borderRadius: "10px",
    backgroundColor: "#F8F8F8",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#CFCFCF",
    },
  }),
};

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

  const bankOptions: BankOptionType[] | undefined = banks?.map((bank) => ({
    value: bank.bankCode,
    label: bank.bankName,
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
          <Select
            options={bankOptions}
            isLoading={banksLoading}
            placeholder="Search and select a bank"
            onChange={(selectedOption: BankOptionType | null) => {
              const bank = banks?.find(
                (b) => b.bankCode === selectedOption?.value
              );
              setSelectedBank(bank || null);
            }}
            styles={selectStyles}
          />
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
