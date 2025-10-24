"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import Skeleton from "react-loading-skeleton";

import DefaultLogo from "../../../assets/images/business-logo.png";

import Button from "../../inputs/Button";
import Loading from "../../common/Loading";

import { useCreateInvoiceContext } from "../../../context/CreateInvoice";
import { useAccountsContext } from "../../../context/Accounts";
import { formatCurrency } from "../../../utilities/general";
import notification from "../../../utilities/notification";
import handleFetch from "../../../services/api/handleFetch";
import useGetQuery from "../../../hooks/useGetQuery";

function InvoiceSummary() {
  const router = useRouter();
  const { form } = useCreateInvoiceContext();
  const { accounts } = useAccountsContext();
  const { identity } = accounts || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const total =
    form?.escrowItems?.reduce((sum, item) => sum + (item?.total || 0), 0) || 0;

  const { data, status, isFetching } = useGetQuery({
    endpoint: "transaction",
    extra: "calculate-fee",
    pQuery: { feeType: "Escrow", amount: total },
    queryKey: ["calculate-fee", total],
    enabled: !!total,
  });

  const uploadMutation = useMutation(handleFetch, {
    onError: (err: any) => {
      notification({
        title: "Upload Error",
        message: err?.toString() || "Failed to upload document.",
        type: "danger",
      });
    },
  });

  const escrowMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      router.push("/dashboard");
      notification({
        message: res?.message || "You have successfully created an invoice",
        type: "success",
      });
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Something went wrong.",
        type: "danger",
      });
    },
  });

  const handleSubmit = async () => {
    let photoUrls: string[] = [];

    if (form?.contract) {
      const uploadBody = new FormData();
      const files = Array.isArray(form.contract)
        ? form.contract
        : [form.contract];
      files.forEach((file) => {
        uploadBody.append("images", file);
      });

      try {
        const uploadResponse: any = await uploadMutation.mutateAsync({
          service: "wallet-service",
          endpoint: "upload",
          method: "POST",
          body: uploadBody,
          auth: true,
          multipart: true,
        });

        if (uploadResponse?.data) {
          photoUrls = Array.isArray(uploadResponse.data)
            ? uploadResponse.data
                .map((item: any) => item?.url || item)
                .filter(Boolean)
            : [uploadResponse.data?.url || uploadResponse.data].filter(Boolean);
        }
      } catch (error) {
        return;
      }
    }

    const payload: any = {
      recipient: {
        name: form?.recipientDetails?.recipientName || "",
        email: form?.recipientDetails?.email || "",
        phoneNumber: form?.recipientDetails?.phoneNumber || "",
        address: form?.recipientDetails?.address || "",
      },
      photoUrls: photoUrls,
      buyerPaysEscrowFee: form?.isDeliveryOnUs || false,
      description: form?.description || "",
      deliveryFee: form?.selectedCourier?.total || 0,
      shipmentMetaData: {
        requestToken: form?.selectedCourier?.requestToken || "",
        serviceCode: form?.selectedCourier?.serviceCode || "",
        courierId: form?.selectedCourier?.courierId || "",
      },
    };

    console.log("Escrow Payload:", payload);

    escrowMutation.mutate({
      service: "wallet-service/api/v1",
      endpoint: "escrows",
      extra: "orders",
      method: "POST",
      body: payload,
      auth: true,
      multipart: false
    });
  };

  const { isLoading } = escrowMutation;
  const isUploading = uploadMutation.isLoading;

  return (
    <>
      {(isLoading || isUploading) && <Loading />}

      <div className="w-full bg-white px-10 py-8 rounded-lg shadow-md">
        <div className="w-full mb-5">
          <div className="text-right">
            <div className="flex justify-end mb-2">
              <Image
                src={DefaultLogo || "/placeholder.svg"}
                alt=""
                className="w-20 h-20"
              />
            </div>
            <h3 className="font-bold text-xl">
              {identity?.businessDetail?.businessName || ""}
            </h3>
            <div className="w-full text-lightText">
              <p className="mb-1">{identity?.businessDetail?.businessEmail}</p>
              <p className="mb-1">{identity?.businessDetail?.businessPhone}</p>
              <p className="mb-1">
                {identity?.businessDetail?.businessAddress || "N/A"}
              </p>
              <p className="text-lightText">{new Date().toDateString()}</p>
            </div>
          </div>
          <div className="text-left">
            <h3 className="font-bold ff-bold text-lg mb-2">
              Recipient Details
            </h3>
            <p className="mb-1">{form?.recipientDetails?.recipientName}</p>
            <div className="w-full text-lightText">
              <p className="mb-1">{form?.recipientDetails?.email}</p>
              <p className="mb-1">{form?.recipientDetails?.phoneNumber}</p>
              <p className="mb-1">{form?.recipientDetails?.address}</p>
            </div>
          </div>
        </div>

        <div className="w-full mb-5 overflow-auto">
          <table className="w-full min-w-max table-auto text-left border-b">
            <thead className="bg-secondary uppercase">
              <tr>
                <th className="px-3 py-3">Item Name</th>
                <th className="px-3 py-3">Unit Price</th>
                <th className="px-3 py-3 text-center">Quantity</th>
                <th className="px-3 py-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {form?.escrowItems?.map((item) => (
                <tr key={item?.id}>
                  <td className="px-3 py-3">{item?.name}</td>
                  <td className="px-3 py-3">{formatCurrency(item?.amount)}</td>
                  <td className="px-3 py-3 text-center">{item?.quantity}</td>
                  <td className="px-3 py-3 font-bold ff-bold text-right">
                    {formatCurrency(item?.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full flex justify-end mb-5">
          <div className="w-full max-w-[280px]">
            <div className="w-full flex justify-between mb-3">
              <p className="">SUBTOTAL</p>
              <p className="font-bold ff-bold">{formatCurrency(total)}</p>
            </div>
            <div className="w-full flex justify-between mb-3">
              <p className="">Escrow fee</p>
              <p className="font-bold ff-bold">
                {status === "loading" || isFetching ? (
                  <Skeleton className="w-[80px]" />
                ) : (
                  formatCurrency(data?.data || 0)
                )}
              </p>
            </div>
            <div className="w-full flex justify-between mb-3">
              <p className="">Delivery Fee</p>
              <p className="font-bold ff-bold">{formatCurrency(0)}</p>
            </div>
            <div className="w-full flex justify-between mb-3 text-lg">
              <p className="">TOTAL</p>
              <p className="font-bold ff-bold">
                {status === "loading" || isFetching ? (
                  <Skeleton className="w-[80px]" />
                ) : (
                  formatCurrency(total + (data?.data || 0))
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full space-x-3">
          <Button
            className="w-full"
            paddingY="py-3"
            onClick={handleSubmit}
            disabled={status === "loading" || isLoading || isUploading}
          >
            Share Payment Link
          </Button>
        </div>
      </div>
    </>
  );
}

export default InvoiceSummary;