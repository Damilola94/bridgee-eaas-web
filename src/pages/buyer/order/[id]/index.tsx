"use client";

import React, { useEffect, useMemo } from "react";

import { useState } from "react";
import Head from "next/head";
import Logo from "../../../../assets/svgs/logos/full-pink.svg";
import Link from "next/link";
import Image from "next/image";
import Invoice from "../../../../components/pages/buyer/Invoice";
import MakePayment from "../../../../components/pages/buyer/MakePayment";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "react-query";
import {
  getOrderStatus,
  getOrderDetails,
  getOrderActivityLogs,
} from "../../../../services/api/escrow";
import notification from "../../../../utilities/notification";
import OrderIdForm from "../../../../components/pages/buyer/OrderIdForm";
import { QUERY_KEYS } from "../../../../configs/constants";
import Activity from "../../../../components/pages/buyer/Activity";
import { getStatusColor } from "../../../../utilities/color";
import {
  ActivityLogItem,
  ActivityLogsResponse,
  OrderDetailsResponse,
} from "../../../../types/escrow";
import Loading from "../../../../components/common/Loading";

export default function BuyerOrder() {
  const router = useRouter();
  const queryClient = useQueryClient();
  // Get order Reference from dynamic URL path using router.query
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

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
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

  const handleViewStatus = async () => {
    const orderRef = orderReference || (urlOrderReference as string);
    if (!orderRef?.trim()) return;

    setIsLoadingOrderDetails(true);
    try {
      const response = await getOrderDetails(orderRef);
      if (response.isSuccess) {
        setOrderDetails(response.data);

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
                type: "danger",
              });
            }
          } catch (activityError: any) {
            notification({
              title: "Error",
              message:
                activityError?.message || "Failed to fetch activity logs",
              type: "danger",
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
          type: "danger",
        });
      }
    } catch (error: any) {
      notification({
        title: "Error",
        message: error?.message || "Failed to fetch order details",
        type: "danger",
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

  const shouldShowPayment =
    urlOrderReference &&
    !statusLoading &&
    orderStatusData?.data?.allowPayment === true;
  // const shouldShowOrderIdForm =
  //   urlOrderReference &&
  //   !statusLoading &&
  //   orderStatusData?.data?.allowPayment === false;
  const shouldShowOrderIdForm = !urlOrderReference && !showOrderDetails;
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
                isLoading={isLoadingOrderDetails}
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
                <div className="lg:w-[65%] lg:py-10 p-6">
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

                  <Invoice
                    orderDetails={orderDetails}
                    orderStatus={orderStatusData?.data}
                  />
                </div>

                {/* Right Side */}
                <div className="lg:w-[35%] lg:py-10 p-6">
                  <Activity activities={activityLogs} />
                </div>
              </div>
            </div>
          </>
        );
  }

  if ((isInitialLoading || isLoadingOrderDetails || urlOrderReference) && !showOrderDetails) {
  return <Loading />;
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
