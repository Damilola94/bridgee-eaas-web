import React from "react";
import { FaTruck } from "react-icons/fa";

import { formatCurrency } from "../../../utilities/general";

import Modal from "../../common/Modal";
import Button from "../../inputs/Button";

type AddressProps = {
  type: string;
  address: string;
};

type Props = {
  onClose: () => void;
  onUpdateAdd: () => void;
  onSelection: (rateId?: string, amount?: number) => void;
  deliveryRateList: any[],
  data:{
    recipientDetails: {
      address: string
    }
  }
};

const LogisticsAddress = ({ type = "", address = "" }: AddressProps) => (
  <div className="flex space-x-5">
    <span className="inline-flex w-10 h-10 bg-white items-center justify-center rounded-full">
      <FaTruck className="w-6 h-6 text-success" />
    </span>
    <div className="">
      <h3 className="text-lg font-semibold">{type}</h3>
      <p className="text-sm">{address}</p>
    </div>
  </div>
);

function GetDeliveryRates({
  onUpdateAdd, onClose, onSelection, deliveryRateList, data
}: Props) {

  return (
    <Modal isOpen onClose={onClose} maxWidth="max-w-[500px]">
      <div className="">
        <div className="mb-7">
          <h1 className="w-full text-textColor ff-bold text-xl">
            Delivery Rate
          </h1>
          <p className="text-sm text-lightText">
            Select you preferred delivery rate
          </p>
        </div>

        <div className="-mx-5 w-[calc(100%+36px)] bg-primary p-5 mb-5 justify-between items-start flex">
          <div className="relative w-full text-white before:absolute before:bg-white before:h-full before:w-[1px] before:left-5 before:-z-0">
            <div className="relative">
              <div className="mb-10">
                <LogisticsAddress
                  type="Pick Up"
                  address="******"
                />
              </div>
              <LogisticsAddress
                type="Delivery"
                address={data?.recipientDetails?.address}
              />
            </div>
          </div>
          <Button className="" onClick={() => onUpdateAdd()}>
            Update Delivery Address
          </Button>
        </div>

        <div className="w-full">
          {deliveryRateList.map((item: any) => (
            <div
              key={item?.id}
              className="border shadow-sm rounded-md p-5 mb-5"
            >
              <div className="w-full flex xs:space-x-5">
                <div className="hidden xs:inline-block mt-3">
                  <picture>
                    <img
                      className="w-14 h-auto"
                      src={item?.courier?.icon || ""}
                      alt=""
                    />
                  </picture>
                </div>
                <div className="w-full">
                  <div className="w-full flex justify-between">
                    <div className="">
                      <h2 className="text-lg font-bold mb-1">
                        {item?.courier?.name}
                      </h2>
                      <p className="text-lightText mb-1">
                        Pickup: <span className="text-black">N/A</span>
                      </p>
                      <p className="text-lightText">
                        Delivery:{" "}
                        <span className="text-black ">
                          {item?.estimatedDays}
                        </span>
                      </p>
                    </div>
                    <div className="min-w-max text-right">
                      <p className="text-lightText mb-1">Delivery fee:</p>
                      <h2 className="text-lg font-bold mb-3">
                        {formatCurrency(item?.amount)}
                      </h2>
                      <Button
                        className=""
                        onClick={() => onSelection(item?.id, item?.amount)}
                      >
                        Select rate
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

export default GetDeliveryRates;
