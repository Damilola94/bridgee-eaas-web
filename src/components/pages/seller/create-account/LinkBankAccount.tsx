// import { Input } from "@/components/ui/input";
// import { StepData } from "@/pages/seller/create-account";

import { ChevronDown } from "lucide-react";
import TextInput from "../../../inputs/Text";

// interface Props {
//   formData: StepData;
//   setFormData: (data: StepData) => void;
// }

export default function LinkBankAccount() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // setFormData({
    //   ...formData,
    //   bankAccount: { ...formData.bankAccount, [name]: value },
    // });
  };

  return (
    <div className="space-y-8 pb-10">
      {/* A proper select component should be used here */}
      <div>
        <label className="text-sm font-bold">Select Bank</label>
        <div className="relative mt-2 mb-3">
          <select
            className="h-12 w-full px-3 border border-[#CFCFCF] rounded-[10px] bg-[#F8F8F8] focus:outline-none focus:ring-2 focus:ring-purple-600 appearance-none text-greyDark"
            // value={countryCode}
            // onChange={(e) => setCountryCode(e.target.value)}
            placeholder="Select Bank "
          >
            <option value="">Select Bank</option>
            <option value="access">Access Bank</option>
            <option value="gtb">GTBank</option>
            <option value="zenith">Zenith Bank</option>
            {/* Add more banks as needed */}
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
        value={""}
        onChange={handleChange}
        className="h-12"
      />
    </div>
  );
}
