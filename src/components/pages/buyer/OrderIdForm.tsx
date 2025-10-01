"use client";

import React from "react";
import Button from "../../inputs/Button";

interface OrderIdFormProps {
  orderId: string;
  setOrderId: (orderId: string) => void;
  onSubmit: () => void;
  isLoading?: boolean; 
}

export default function OrderIdForm({ orderId, setOrderId, onSubmit, isLoading = true }: OrderIdFormProps) {
  return (
    <div className="min-h-screen">
      <div className="p-10">
        <div className="w-full max-w-[492px]">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-textColor mb-2">
              Welcome,
            </h2>
            <p className="text-grey2 font-medium text-sm mb-8">
              Kindly input your order ID below to view the status of your order
            </p>

            <div className="">
              <label
                htmlFor="orderId"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Order ID
              </label>
              <input
                type="text"
                id="orderId"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                placeholder="Enter your order ID"
              />
            </div>

            <Button
              onClick={onSubmit}
              disabled={!orderId || isLoading}
              className="bg-success w-full text-base font-bold py-4 mt-10"
            >
              {isLoading ? "Loading..." : "View Order Status"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
