import React, { useState } from "react";

import { useRouter } from 'next/router';

import useGetQuery from "../../../hooks/useGetQuery";
import SelectInput from "../../inputs/Select";
import TextInput from "../../inputs/Text";
import Modal from "../../common/Modal";

type Props = {
  form?: any;
  onClose: () => void;
};
type StateOption = {
  label: string;
  value: string;
};

const CustomerPickupAddress = ({ form, onClose }: Props) => {
  const [selectedState, setSelectedState] = useState<StateOption | null>(null);
  const router = useRouter();

  const { data: states, status: stateStatus } = useGetQuery({
    endpoint: "logistic/states",
    queryKey: ["logistic-states"],
    enabled: !!router?.query?.slug
  });

  const { data: cities, status: cityStatus } = useGetQuery({
    endpoint: `logistic/cities/${selectedState?.value || ""}`,
    queryKey: ["logistic-cities", selectedState?.value],
    enabled: !!selectedState
  });

  const handleChange = (val: any, type = "input", inputName = "") => {
    if (type === "input") {
      // console.log("");
    } else {
      setSelectedState(val);
    }
  };

  return (
    <Modal isOpen onClose={onClose} maxWidth="max-w-[500px]">

      <div>
        <h2 className="text-lg font-bold mb-4">Customer Address</h2>

        <SelectInput
          className="w-full mb-5"
          onChange={(val) => handleChange(val, "select", "businessType")}
          value={form?.state}
          label="State"
          placeholder="Select state"
          options={
            stateStatus === "success"
              ? Object.values(states).map((state: any) => ({
                label: state.Name,
                value: state.StateID
              }))
              : []
          }
        />

        <SelectInput
          className="w-full mb-5"
          onChange={(val) => handleChange(val, "select", "businessType")}
          value={form?.state}
          label="State"
          placeholder="Select city"
          options={
            cityStatus === "success" && states
              ? Object.values(cities).map((state: any) => ({
                label: state.Name,
                value: state.StateID
              }))
              : []
          }
        />

        <TextInput
          className="w-full mb-5"
          onChange={handleChange}
          value={form?.recipientAddress || ""}
          name="recipientAddress"
          label="Recipient’s Address"
          placeholder="Enter Address"
        />
      </div>
    </Modal>

  );
};

export default CustomerPickupAddress;
