import React from "react";
import { FaTruck } from "react-icons/fa";

import { formatCurrency } from "../../../utilities/general";

import Modal from "../../common/Modal";
import Button from "../../inputs/Button";

type AddressProps = {
  type: string;
  address: string;
};

type DeliveryOption = {
  id: string;
  amount: number;
  estimatedDeliveryTime: string;
  courier?: {
    name: string;
    icon?: string;
  };
};

type DeliveryRateData = {
  quoteId: string;
  amount: number;
  currency: string;
  estimatedDeliveryTime: string;
  deliveryOptions: DeliveryOption[];
};

type Props = {
  onClose: () => void;
  onUpdateAdd: () => void;
  onSelection: (rateId?: string, amount?: number) => void;
  deliveryRateList: DeliveryRateData;
  data: {
    recipientDetails: {
      address: string;
    };
  };
};

const LogisticsAddress = ({ type = "", address = "" }: AddressProps) => (
  <div className="flex space-x-5">
    <span className="inline-flex w-10 h-10 bg-white items-center justify-center rounded-full">
      <FaTruck className="w-6 h-6 text-success" />
    </span>
    <div>
      <h3 className="text-lg font-semibold">{type}</h3>
      <p className="text-sm">{address}</p>
    </div>
  </div>
);

function GetDeliveryRates({
  onUpdateAdd,
  onClose,
  onSelection,
  deliveryRateList,
  data
}: Props) {
  if (!deliveryRateList) return null;

  return (
    <Modal isOpen onClose={onClose} maxWidth="max-w-[500px]">
      <div>
        <div className="mb-7">
          <h1 className="w-full text-textColor ff-bold text-xl">
            Delivery Rate
          </h1>
          <p className="text-sm text-lightText">
            Select your preferred delivery rate
          </p>
        </div>

        <div className="-mx-5 w-[calc(100%+36px)] bg-primary p-5 mb-5 justify-between items-start flex">
          <div className="relative w-full text-white before:absolute before:bg-white before:h-full before:w-[1px] before:left-5 before:-z-0">
            <div className="relative">
              <div className="mb-10">
                <LogisticsAddress type="Pick Up" address="******" />
              </div>
              <LogisticsAddress
                type="Delivery"
                address={data?.recipientDetails?.address}
              />
            </div>
          </div>
          <Button onClick={onUpdateAdd}>Update Delivery Address</Button>
        </div>

        <div className="w-full">
          <div className="border shadow-sm rounded-md p-5 mb-5">
            <div className="w-full flex xs:space-x-5">
              <div className="w-full">
                <div className="w-full flex justify-between">
                  <div>
                    <h2 className="text-lg font-bold mb-1">Courier Name</h2>
                    <p className="text-lightText mb-1">
                      Pickup: <span className="text-black">N/A</span>
                    </p>
                    <p className="text-lightText">
                      Delivery:{" "}
                      <span className="text-black">
                        {deliveryRateList.estimatedDeliveryTime}
                      </span>
                    </p>
                  </div>
                  <div className="min-w-max text-right">
                    <p className="text-lightText mb-1">Delivery fee:</p>
                    <h2 className="text-lg font-bold mb-3">
                      {formatCurrency(deliveryRateList.amount)}
                    </h2>
                    <Button
                      onClick={() =>
                        onSelection(deliveryRateList.quoteId, deliveryRateList.amount)
                      }
                    >
                      Select rate
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default GetDeliveryRates;
