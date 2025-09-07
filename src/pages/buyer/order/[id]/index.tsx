"use client";

import React, { useMemo } from "react";

import { useState } from "react";
import Head from "next/head";
import Logo from "../../../../assets/svgs/logos/full-pink.svg";
import Link from "next/link";
import Image from "next/image";
import Invoice from "../../../../components/pages/buyer/Invoice";
import MakePayment from "../../../../components/pages/buyer/MakePayment";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "react-query";
import { getOrderStatus } from "../../../../services/api/escrow";
import notification from "../../../../utilities/notification";
import OrderIdForm from "../../../../components/pages/buyer/OrderIdForm";
import { QUERY_KEYS } from "../../../../configs/constants";
import Activity from "../../../../components/pages/buyer/Activity";
import { getStatusColor } from "../../../../utilities/color";

export default function BuyerOrder() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [orderReference, setOrderReference] = useState("");
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  // Get order Reference from dynamic URL path using router.query
  const urlOrderReference = router.query.id as string;

  const { data: orderStatusData, isLoading: statusLoading } = useQuery(
    [QUERY_KEYS.ORDER_STATUS, urlOrderReference],
    () => getOrderStatus(urlOrderReference!),
    {
      enabled: Boolean(urlOrderReference),
      onError: (error: any) => {
        notification({
          title: "Error",
          message: error?.message || "Failed to check order status",
          type: "danger",
        });
      },
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleViewStatus = () => {
    if (orderReference.trim()) {
      setShowOrderDetails(true);
    }
  };

  const orderData = useMemo(() => {
    return {
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
      status: orderStatusData?.data?.status || "...",
      statusColor: getStatusColor(orderStatusData?.data?.status || ""),
    };
  }, [orderStatusData]);

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

  const handlePaymentSuccess = () => {
    queryClient.invalidateQueries([QUERY_KEYS.ORDER_STATUS, urlOrderReference]);
  };

  const handlePaymentPending = () => {
    queryClient.invalidateQueries([QUERY_KEYS.ORDER_STATUS, urlOrderReference]);
  };

  const shouldShowPayment =
    urlOrderReference &&
    !statusLoading &&
    orderStatusData?.data?.allowPayment === true;
  const shouldShowOrderIdForm =
    urlOrderReference &&
    !statusLoading &&
    orderStatusData?.data?.allowPayment === false;
  const shouldShowOrderDetails = showOrderDetails;

  if (shouldShowOrderIdForm) {
    return (
      <>
        <Head>
          <title>Order Status - Bridgee Escrow</title>
        </Head>

        <div className="min-h-screen bg-gray-50">
          {/* Mobile Header */}
          <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-4">
            <div className="flex items-center">
              <div className="block lg:hidden my-4 ml-2">
                <Link href="#" onClick={() => {}}>
                  <Image
                    src={Logo}
                    alt="UseBridge Inc. logo"
                    priority
                    width={120}
                    height={45}
                  />
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:flex lg:min-h-screen bg-bg-gray-50 container mx-auto">
            <div className="lg:w-[45%] lg:p-10 p-6">
              {/* Desktop Header */}
              <div className="hidden lg:block">
                <Link href="#" onClick={() => {}}>
                  <Image
                    src={Logo}
                    alt="UseBridge Inc. logo"
                    priority
                    width={120}
                    height={45}
                    className="mb-12"
                  />
                </Link>
              </div>

              <OrderIdForm
                orderId={orderReference}
                setOrderId={setOrderReference}
                onSubmit={handleViewStatus}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (shouldShowOrderDetails) {
    return (
      <>
        <Head>
          <title>Order Status - Bridgee Escrow</title>
        </Head>
        <div className="min-h-screen bg-gray-50">
          {/* Mobile Header */}
          <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-4">
            <div className="flex items-center">
              <div className="block lg:hidden my-4 ml-2">
                <Link href="#" onClick={() => {}}>
                  <Image
                    src={Logo}
                    alt="UseBridge Inc. logo"
                    priority
                    width={120}
                    height={45}
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="lg:flex lg:min-h-screen bg-bg-gray-50 container mx-auto">
            {/* Left Side */}
            <div className="lg:w-[45%] lg:p-10 p-6">
              {/* Desktop Header */}
              <div className="hidden lg:block">
                <Link href="#" onClick={() => {}}>
                  <Image
                    src={Logo}
                    alt="UseBridge Inc. logo"
                    priority
                    width={120}
                    height={45}
                    className="mb-12"
                  />
                </Link>
              </div>

              <Invoice {...orderData} />
            </div>

            {/* Right Side */}
            <div className="lg:w-[55%] lg:p-10 p-6">
              <Activity activities={activities} />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Checkout - Bridgee Escrow</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex items-center">
            <div className="block lg:hidden my-4 ml-2">
              <Link href="#" onClick={() => {}}>
                <Image
                  src={Logo}
                  alt="UseBridge Inc. logo"
                  priority
                  width={120}
                  height={45}
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:flex lg:min-h-screen bg-bg-gray-50 container mx-auto">
          {/* Left Side */}
          <div className="lg:w-[45%] lg:p-10 p-6">
            {/* Desktop Header */}
            <div className="hidden lg:block">
              <Link href="#" onClick={() => {}}>
                <Image
                  src={Logo}
                  alt="UseBridge Inc. logo"
                  priority
                  width={120}
                  height={45}
                  className="mb-12"
                />
              </Link>
            </div>

            {shouldShowPayment && (
              <MakePayment
                formData={formData}
                onInputChange={handleInputChange}
                orderReference={urlOrderReference}
                onPaymentPending={handlePaymentPending}
                onPaymentSuccess={handlePaymentSuccess}
              />
            )}
          </div>

          {/* Right Side */}

          <div className="lg:w-[55%] lg:p-10 p-6">
            <Invoice {...orderData} />
          </div>
        </div>
      </div>
    </>
  );
}
