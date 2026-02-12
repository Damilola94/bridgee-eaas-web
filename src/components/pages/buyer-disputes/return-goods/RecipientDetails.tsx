'use client';

import React from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

import Button from '../../../inputs/Button';
import Input from '../../../inputs/Text';
import notification from '../../../../utilities/notification';
import handleFetch from '../../../../services/api/handleFetch';
import Loading from '../../../common/Loading';

import { useReturnGoodsContext } from '../../../../context/ReturnGoods';

export default function RecipientDetailsPage() {
  const router = useRouter();
  const { invoice } = useReturnGoodsContext();
  const disputeId = router.query.disputeId as string;

  console.log(disputeId, router.query);

  const businessName = invoice?.businessName || "N/A";
  const businessEmail = invoice?.businessEmail || "N/A";
  const businessPhone = invoice?.businessPhone || "N/A";
  const businessAddress = invoice?.businessAddress || "N/A";

  const uploadMutation = useMutation(handleFetch, {
    onError: (err: any) => {
      notification({
        title: "Upload Error",
        message: err?.toString() || "Failed to upload document.",
        type: "danger"
      });
    }
  });

  const escrowMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      router.push("/dashboard");
      notification({
        message: res?.message || "You have successfully created an invoice",
        type: "success"
      });
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Something went wrong.",
        type: "danger"
      });
    }
  });

  const handleSubmit = async () => {
    let photoUrls: string[] = [];

    if (invoice?.contract) {
      const uploadBody = new FormData();
      const files = Array.isArray(invoice.contract)
        ? invoice.contract
        : [invoice.contract];

      files.forEach((file:any) => {
        uploadBody.append("images", file);
      });

      try {
        const uploadResponse: any = await uploadMutation.mutateAsync({
          service: "wallet-service",
          endpoint: "upload",
          method: "POST",
          body: uploadBody,
          auth: true,
          multipart: true
        });

        if (uploadResponse?.data) {
          photoUrls = Array.isArray(uploadResponse.data)
            ? uploadResponse.data.map((item: any) => item?.url || item).filter(Boolean)
            : [uploadResponse.data?.url || uploadResponse.data].filter(Boolean);
        }
      } catch (error) {
        return;
      }
    }

    const payload: any = {
      recipient: {
        name: businessName || "",
        email: businessEmail || "",
        phoneNumber: businessPhone || "",
        address: businessAddress || ""
      },
      photoUrls,
      buyerPaysEscrowFee: invoice?.isDeliveryOnUs || false,
      description: invoice?.description || "",
      deliveryFee: invoice?.selectedCourier?.total || 0,
      items:
        invoice?.items?.map((item:any) => ({
          name: item.name || "",
          quantity: item.quantity || 0,
          unitPrice: item.amount || 0,
          weightKg: item.weight || 0
        })) || [],
      shipmentMetaData: {
        requestToken: invoice?.selectedCourier?.requestToken || "",
        serviceCode: invoice?.selectedCourier?.serviceCode || "",
        courierId: invoice?.selectedCourier?.courierId || ""
      }
    };

    escrowMutation.mutate({
      service: "wallet-service/api/v1",
      endpoint: "escrows",
      extra: "orders/return",
      pQuery: {
        disputeId: disputeId
      },
      method: "POST",
      body: payload,
      auth: true,
      multipart: false
    });
  };

  const isLoading = escrowMutation.isLoading || uploadMutation.isLoading;

  return (
    <>
      {isLoading && <Loading />}

      <div className="bg-gray-50 p-4 md:p-8 rounded-lg shadow-md">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-lg font-bold text-gray-900">Recipient&apos;s Details</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Input label="Recipient's Name" value={businessName} disabled />
            <Input label="Recipient's Email" value={businessEmail} disabled />
            <Input label="Recipient's Phone Number" value={businessPhone} disabled />
            <Input label="Recipient's Address" value={businessAddress} disabled />
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg"
            disabled={isLoading}
          >
            Continue
          </Button>
        </div>
      </div>
    </>
  );
}
