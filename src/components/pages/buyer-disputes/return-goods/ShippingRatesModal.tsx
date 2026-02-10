import React, { useEffect, useState } from "react";
import Image from "next/image";

import Modal from "../../../common/Modal";
import Button from "../../../inputs/Button";
import { ShippingRate } from "../../../../types/shipbubble";
import PickupTruckIcon from "../../../../assets/svgs/pickup-truck.svg";
import DeliveryTruckIcon from "../../../../assets/svgs/delivery-truck.svg";

export type RatesData = {
  couriers: ShippingRate[];
  fastestCourier: ShippingRate;
  cheapestCourier: ShippingRate;
  checkoutData: {
    shipFrom: { address: string };
    shipTo: { address: string };
  };
  requestToken: string;
};

interface ShippingRatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  ratesData?: RatesData;
  isLoading?: boolean;
  onSelectCourier?: (courier: ShippingRate) => void;
}

const ShippingRatesModal: React.FC<ShippingRatesModalProps> = ({
  isOpen,
  onClose,
  ratesData,
  isLoading = false,
  onSelectCourier
}) => {
  const [sortedRates, setSortedRates] = useState<ShippingRate[]>([]);

  useEffect(() => {
    if (
      ratesData?.couriers &&
      ratesData?.fastestCourier &&
      ratesData?.cheapestCourier
    ) {
      const { fastestCourier, cheapestCourier, couriers } = ratesData;
      const isSame = fastestCourier.courierId === cheapestCourier.courierId;

      // Use a Set to prevent duplicates
      const topCouriers = new Set<ShippingRate>();
      topCouriers.add(fastestCourier);
      if (!isSame) {
        topCouriers.add(cheapestCourier);
      }

      const topCourierIds = Array.from(topCouriers).map((c) => c.courierId);

      const otherCouriers = couriers.filter(
        (courier) => !topCourierIds.includes(courier.courierId)
      );

      setSortedRates([...Array.from(topCouriers), ...otherCouriers]);
    }
  }, [ratesData]);

  if (!isOpen) return null;

  const ShippingRatesSkeleton = () => (
    <div className="w-full mb-6">
      {/* Header Skeleton */}
      <div className="md:flex justify-between items-center mt-12 mb-6">
        <div className="h-8 bg-gray-200 rounded w-1/2 pb-4 md:pb-0 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded w-40 mt-2 md:mt-0 animate-pulse"></div>
      </div>

      {/* Pickup and Delivery Info Skeleton */}
      <div className="bg-[#1E2A78] text-white p-6 rounded-lg mb-6 animate-pulse">
        <div className="flex items-start">
          <div className="flex flex-col items-center mr-4">
            <div className="bg-white bg-opacity-20 rounded-full w-12 h-12"></div>
            <div className="w-px h-8 bg-white my-1"></div>
            <div className="bg-white bg-opacity-20 rounded-full w-12 h-12"></div>
          </div>
          <div className="space-y-6 flex-1">
            <div>
              <div className="h-6 bg-white bg-opacity-20 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-white bg-opacity-20 rounded w-3/4"></div>
            </div>
            <div>
              <div className="h-6 bg-white bg-opacity-20 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-white bg-opacity-20 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Rates List Skeleton */}
      <div className="space-y-4 max-h-[45vh] overflow-y-auto pr-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="bg-white border-[#E5E7EB] border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between shadow-md"
          >
            <div className="flex items-start">
              <div className="w-12 h-12 bg-gray-200 rounded mr-4 animate-pulse"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4 mb-1 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3 mb-1 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3 animate-pulse"></div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col items-end">
              <div className="h-6 bg-gray-200 rounded w-20 mb-2 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl">
      {isLoading ? (
        <ShippingRatesSkeleton />
      ) : (
        <div className="w-full mb-6">
          {/* Header */}
          <div className="md:flex justify-between items-center mt-12 mb-6">
            <h2 className="text-2xl font-bold text-black pb-4 md:pb-0">
              Get delivery rate
            </h2>

            {/* <button className="w-full md:w-auto border-2 md:!mt-0 border-[#0F1D86] text-[#0F1D86] py-2 px-4 rounded-[10px] text-base font-bold">
            Get another quote
          </button> */}
          </div>

          {/* Pickup and Delivery Info */}
          <div className="bg-[#1E2A78] text-white p-6 rounded-lg mb-6">
            <div className="flex items-start">
              <div className="flex flex-col items-center mr-4">
                <div className="bg-white p-2 rounded-full">
                  <Image
                    src={PickupTruckIcon}
                    alt="Pickup Truck"
                    width={24}
                    height={24}
                  />
                </div>
                <div className="w-px h-8 bg-white my-1"></div>
                <div className="bg-white p-2 rounded-full">
                  <Image
                    src={DeliveryTruckIcon}
                    alt="Delivery Truck"
                    width={24}
                    height={24}
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div className="">
                  <p className="font-bold text-lg">Pick up</p>
                  <p className="text-sm opacity-90">
                    {ratesData?.checkoutData?.shipFrom?.address || ""}
                  </p>
                </div>
                <div>
                  <p className="font-bold text-lg">Delivery</p>
                  <p className="text-sm opacity-90">
                    {ratesData?.checkoutData?.shipTo?.address || ""}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Rates List */}
          <div className="space-y-4 max-h-[45vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {sortedRates.map((rate) => {
              let showFastest =
                rate.courierId === ratesData?.fastestCourier.courierId;
              let showCheapest =
                rate.courierId === ratesData?.cheapestCourier.courierId;

              return (
                <div
                  key={rate.courierId}
                  className="bg-white border-[#E5E7EB] border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between shadow-md"
                >
                  <div className="flex justify-between md:justify-start">
                    <div className="flex items-start pt-1">
                      <Image
                        src={rate.courierImage}
                        alt={rate.courierImage}
                        width={60}
                        height={18}
                      />
                    </div>

                    <div className="ml-4">
                      <div className="flex items-center justify-end md:justify-start">
                        <p className="font-bold text-textColor text-sm">
                          {rate.courierName}
                        </p>
                        {showFastest && (
                          <span className="bg-[#DEF7EC] text-[#03543F] text-xs font-medium ml-2 px-2 py-1 rounded-md">
                            Fastest
                          </span>
                        )}

                        {showCheapest && (
                          <span className="bg-[#FEF3C7] text-[#92400E] text-xs font-medium ml-2 px-2 py-1 rounded-md">
                            Cheapest
                          </span>
                        )}
                      </div>

                      <div className="mt-1 space-y-1 text-right md:text-left">
                        <p className="text-sm text-[#9CA3AF]">
                          Pick up:{" "}
                          <span className="text-textColor">
                            {rate.pickupEta}{" "}
                          </span>
                        </p>
                        <p className="text-sm text-[#9CA3AF]">
                          Delivery:{" "}
                          <span className="text-textColor">
                            {" "}
                            {rate.deliveryEta}{" "}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-auto text-left md:text-right mt-1 md:mt-0">
                    <div className="flex md:block gap-x-1 items-center justify-end">
                      <p className="text-sm text-[#9CA3AF]">Delivery fee:</p>
                      <p className="font-bold text-base text-gray-800">
                        {rate.currency}{" "}
                        {rate.total.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </p>
                    </div>
                    <Button
                      className="w-full md:w-auto text-sm mt-6 md:mt-2 bg-success hover:bg-success/85"
                      paddingX="px-6"
                      paddingY="py-3"
                      onClick={() => {
                        onSelectCourier?.({
                          ...rate,
                          requestToken: ratesData?.requestToken || ""
                        });

                        onClose();
                      }}
                    >
                      Ship Now
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {sortedRates.length > 3 && (
            <div className="absolute bottom-2 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none flex items-end justify-center pb-1">
              <div className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full shadow-md border">
                Scroll for more
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default ShippingRatesModal;
