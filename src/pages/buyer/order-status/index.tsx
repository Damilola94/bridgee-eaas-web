"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Invoice from "../../../components/pages/buyer/Invoice";
import Activity from "../../../components/pages/buyer/Activity";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../assets/svgs/logos/full-pink.svg";
import Button from "../../../components/inputs/Button";
import BuyerLogo from "../../../components/pages/buyer/BuyerLogo";

export default function OrderStatus() {
  const [orderId, setOrderId] = useState("0472");
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const router = useRouter();

  // Sample order data - replace with API call
  const orderData = {
    orderItems: [
      {
        id: 1,
        name: "3 piece suit",
        price: 32000.0,
        quantity: 2,
        total: 64000.0,
      },
      {
        id: 2,
        name: "Volt Desk & Table",
        price: 32000.0,
        quantity: 2,
        total: 64000.0,
      },
      {
        id: 3,
        name: "Asus Monitor Screen",
        price: 32000.0,
        quantity: 2,
        total: 64000.0,
      },
      {
        id: 4,
        name: "Alarm Clock",
        price: 32000.0,
        quantity: 2,
        total: 64000.0,
      },
    ],
    deliveryFee: 2000.0,
    escrowFee: 2000.0,
    storeName: "Tolu's Store",
    storeAddress: "291 N 4th St, Ikoyi, Lagos, Nigeria",
    invoiceNumber: "0472",
    invoiceDate: "August 1, 2021, 12:00pm",
    recipientName: "Oluseola John",
    recipientEmail: "oluseolajohn@gmail.com",
    recipientPhone: "+234 808 857 9392",
    recipientAddress: "54 Marina, Lagos Island, Lagos",
    paymentType: "Bank Transfer",
    disputeManager: "Bridgee Escrow",
    inspectionPeriod: "2 Hours",
    dueDate: "Jan 12, 2025; 2:00pm",
    status: "Completed",
  };

  const activities = [
    {
      date: "August 1, 2021, 12:00pm",
      text: "Seller initiates transaction",
      completed: true,
    },
    {
      date: "August 1, 2021, 12:00pm",
      text: "You made payment",
      completed: true,
    },
    {
      date: "August 1, 2021, 12:00pm",
      text: "Seller requests delivery",
      completed: true,
    },
    {
      date: "August 1, 2021, 12:00pm",
      text: "Seller awaiting pickup by Delyman",
      completed: true,
    },
    {
      date: "August 2, 2021, 12:00pm",
      text: "Delyman picks up item",
      completed: true,
    },
    {
      date: "August 2, 2021, 12:00pm",
      text: "Item close to transit",
      completed: true,
    },
    {
      date: "August 2, 2021, 12:00pm",
      text: "Delyman arrived at your location",
      completed: true,
    },
    {
      date: "August 2, 2021, 12:00pm",
      text: "You are inspecting your item",
      completed: true,
    },
    {
      date: "August 2, 2021, 12:00pm",
      text: "You confirms your order as received",
      completed: true,
    },
    {
      date: "August 2, 2021, 12:00pm",
      text: "Funds released into seller's Bridgee wallet",
      completed: true,
    },
    {
      date: "August 2, 2021, 12:00pm",
      text: "Your order has been completed",
      completed: true,
    },
  ];

  const handleViewStatus = () => {
    console.log("[v0] Viewing order status for:", orderId);
    setShowOrderDetails(true);
  };

  const handleBackToSearch = () => {
    setShowOrderDetails(false);
  };

  return (
    <div className="bg-gray-50">
      <BuyerLogo variant="mobile" />
      <div className="container mx-auto">
        <div className="lg:flex items-center justify-between">
          <BuyerLogo variant="desktop" />
          {showOrderDetails && (
            <div className="flex justify-end">
              <Button className="py-4 mt-6 lg:mt-0 justify-end">Open Dispute</Button>
            </div>
          )}
        </div>

        {showOrderDetails ? (
          <div className="min-h-screen">
            <div className="lg:flex">
              <div className="lg:w-1/2 mb-8 lg:mb-0 lg:p-10 p-6 ">
                <Invoice {...orderData} />
              </div>

              <div className="lg:w-1/2 lg:p-10 p-6">
                <Activity activities={activities} />
              </div>
            </div>
          </div>
        ) : (
          <div className="min-h-screen">
            <div className="p-10">
              <div className="w-full max-w-[492px]">
                <div className="bg-white rounded-lg p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-textColor mb-2">
                    Welcome,
                  </h2>
                  <p className="text-grey2 font-medium text-sm mb-8">
                    Kindly input your order ID below to view the status of your
                    order
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
                    onClick={handleViewStatus}
                    className="bg-success w-full text-base font-bold py-4 mt-10"
                  >
                    View Order Status
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
