/* eslint-disable no-duplicate-imports */
"use client";

import React, { useEffect } from "react";

import { useState } from "react";
import Head from "next/head";

import Link from "next/link";

import Image from "next/image";

import { useRouter } from "next/router";

import { useQuery, useQueryClient } from "react-query";

import Skeleton from "react-loading-skeleton";

import Logo from "../../../../assets/svgs/logos/full-pink.svg";

import Invoice from "../../../../components/pages/buyer/Invoice";
import MakePayment from "../../../../components/pages/buyer/MakePayment";

import {
  getOrderStatus,
  getOrderDetails,
  getOrderActivityLogs
} from "../../../../services/api/escrow";
import notification from "../../../../utilities/notification";
import { QUERY_KEYS } from "../../../../configs/constants";
import Activity from "../../../../components/pages/buyer/Activity";
import {
  ActivityLogItem,
  ActivityLogsResponse,
  OrderDetailsResponse
} from "../../../../types/escrow";
import Loading from "../../../../components/common/Loading";

import Button from "../../../../components/inputs/Button";

export default function BuyerOrder() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const urlOrderReference = router.query.id as string;

  const [isInitialLoading, setIsInitialLoading] = useState(
    Boolean(urlOrderReference)
  );

  const [orderReference, setOrderReference] = useState("");
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [orderDetails, setOrderDetails] = useState<
    OrderDetailsResponse["data"] | null
  >(null);
  const [isLoadingOrderDetails, setIsLoadingOrderDetails] = useState(
    Boolean(urlOrderReference)
  );

  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>([]);
  const [isLoadingActivities, setIsLoadingActivities] = useState(false);
  const [showPaymentView, setShowPaymentView] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    if (urlOrderReference) {
      const orderId = urlOrderReference as string;
      setOrderReference(orderId);
      if (!showOrderDetails) {
        handleViewStatus(); // Auto-fetch on reload
      }
    }
  }, [urlOrderReference]);

  // Ensure loading state when ID arrives
  useEffect(() => {
    if (urlOrderReference && !showOrderDetails) {
      setIsInitialLoading(true);
    }
  }, [urlOrderReference, showOrderDetails]);

  const { data: orderStatusData, isLoading: statusLoading } = useQuery(
    [QUERY_KEYS.ORDER_STATUS, urlOrderReference],
    () => getOrderStatus(urlOrderReference!),
    {
      enabled: Boolean(urlOrderReference),
      onError: (error: any) => {
        notification({
          title: "Error",
          message: error?.message || "Failed to check order status",
          type: "danger"
        });
      }
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleViewStatus = async () => {
    const orderRef = orderReference || (urlOrderReference as string);
    if (!orderRef?.trim()) return;

    setIsLoadingOrderDetails(true);
    try {
      const response = await getOrderDetails(orderRef);
      if (response.isSuccess) {
        setOrderDetails(response.data);

        setFormData({
          fullName: response.data?.recipientName || "",
          email: response.data?.recipientEmail || "",
          phone: response.data?.recipientPhone || ""
        });

        const escrowOrderId = response.data?.id;

        if (escrowOrderId) {
          setIsLoadingActivities(true);
          try {
            const activityResponse: ActivityLogsResponse =
              await getOrderActivityLogs(escrowOrderId);
            if (activityResponse.isSuccess) {
              setActivityLogs(activityResponse.data);
            } else {
              notification({
                title: "Error",
                message:
                  activityResponse.message || "Failed to fetch activity logs",
                type: "danger"
              });
            }
          } catch (activityError: any) {
            notification({
              title: "Error",
              message:
                activityError?.message || "Failed to fetch activity logs",
              type: "danger"
            });
          } finally {
            setIsLoadingActivities(false);
          }
        }
        setShowOrderDetails(true);
      } else {
        notification({
          title: "Error",
          message: response.message,
          type: "danger"
        });
      }
    } catch (error: any) {
      notification({
        title: "Error",
        message: error?.message || "Failed to fetch order details",
        type: "danger"
      });
    } finally {
      setIsLoadingOrderDetails(false);
      setIsInitialLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    queryClient.invalidateQueries([QUERY_KEYS.ORDER_STATUS, urlOrderReference]);
  };

  const handlePaymentPending = () => {
    queryClient.invalidateQueries([QUERY_KEYS.ORDER_STATUS, urlOrderReference]);
  };

  const handleShowPayment = () => {
    setShowPaymentView(true);
  };

  // if (
  //   isInitialLoading ||
  //   isLoadingOrderDetails ||
  //   statusLoading ||
  //   !orderStatusData
  // ) {
  //   return <Loading />;
  // }

  const allowPayment = orderStatusData?.data?.allowPayment;

  if (allowPayment === true) {
    if (!showPaymentView) {
      return (
        <>
          <Head>
            <title>Checkout - Bridgee Escrow</title>
          </Head>
          <div className="min-h-screen bg-gray-50 flex flex-col justify-center px-4">
            <div className="container mx-auto">
              {/* Mobile Header */}
              <div className="lg:hidden bg-white border-b border-gray-200 w-full px-4 py-4 mb-4">
                <div className="flex items-center">
                  <div className="block lg:hidden my-4 ml-2">
                    <Link href="#" onClick={() => {}}>
                      <Image
                        src={Logo}
                        alt="UseBridgee Inc. logo"
                        priority
                        width={120}
                        height={45}
                      />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Desktop Header */}
              <div className="hidden lg:flex justify-start lg:pl-20 lg:pt-10">
                <Link href="#" onClick={() => {}}>
                  <Image
                    src={Logo}
                    alt="UseBridge Inc. logo"
                    priority
                    width={120}
                    height={45}
                    className="mb-2"
                  />
                </Link>
              </div>

              {/* Centered Invoice */}
              <div className="w-full flex flex-col justify-center mx-auto max-w-2xl my-8">
                <Button
                  onClick={handleShowPayment}
                  className="w-full max-w-2xl bg-success text-white py-3 px-4 rounded-lg font-bold text-lg mb-6"
                >
                Make Payment
                </Button>
                <Invoice
                  orderDetails={orderDetails}
                  orderStatus={orderStatusData?.data}
                />
              </div>
            </div>
          </div>
        </>
      );
    } else {
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
                      alt="UseBridgee Inc. logo"
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
                      alt="UseBridgee Inc. logo"
                      priority
                      width={120}
                      height={45}
                      className="mb-12"
                    />
                  </Link>
                </div>

                <MakePayment
                  formData={formData}
                  onInputChange={handleInputChange}
                  orderReference={urlOrderReference}
                  onPaymentPending={handlePaymentPending}
                  onPaymentSuccess={handlePaymentSuccess}
                  initialIsPaymentInitiated={showPaymentView}
                  onCancelPayment={() => setShowPaymentView(false)}
                />
              </div>

              {/* Right Side */}
              <div className="lg:w-[55%] lg:p-10 lg:pt-16 p-6">
                <Invoice
                  orderDetails={orderDetails}
                  orderStatus={orderStatusData?.data}
                />
              </div>
            </div>
          </div>
        </>
      );
    }
  } else {
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
                    alt="UseBridgee Inc. logo"
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
            <div className="lg:w-[65%] lg:py-10 p-6">
              {/* Desktop Header */}
              <div className="hidden lg:block">
                <Link href="#" onClick={() => {}}>
                  <Image
                    src={Logo}
                    alt="UseBridgee Inc. logo"
                    priority
                    width={120}
                    height={45}
                    className="mb-12"
                  />
                </Link>
              </div>

              <Invoice
                orderDetails={orderDetails}
                orderStatus={orderStatusData?.data}
              />
            </div>

            {/* Right Side */}
            <div className="lg:w-[35%] lg:py-10 p-6">
              {isLoadingActivities ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} width="100%" height={50} />
                  ))}
                </div>
              ) : (
                <Activity activities={activityLogs} />
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
