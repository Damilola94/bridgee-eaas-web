"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/router";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useMutation, useQueryClient } from "react-query";

import useGetQuery from "../../../../hooks/useGetQuery"; import { formatDate, formatDateTime } from "../../../../utilities/dateTime";
import Loading from "../../../common/Loading";
import Button from "../../../inputs/Button";
import notification from "../../../../utilities/notification";

import handleFetch from "../../../../services/api/handleFetch";

import TransactionStatus from "../../../common/TransactionStatus";

import DisputeDetails from "./DisputeDet";
import DisputeResponse from "./SellerResponseOpenDispute";
import ActivityLog from "./ActivityLog";
import type { ApiDispute } from "./type";

export default function ManageDisputeContainer() {
  const router = useRouter();
  const slug = String(router?.query?.slug ?? "");
  const queryClient = useQueryClient();
  const [showResponseForm, setShowResponseForm] = useState(false);

  const { data, status } = useGetQuery({
    service: "wallet-service/api/v1/",
    endpoint: "disputes",
    param: slug,
    queryKey: ["dispute-details", slug],
    enabled: !!slug
  });

  const { data: activityData, status: activityStatus, error: activityError } = useGetQuery({
    service: "wallet-service/api/v1",
    endpoint: "activitylogs",
    extra: "order",
    queryKey: ['activitylogs', router?.query?.slug],
    param: router?.query?.slug,
    enabled: !!router?.query?.slug
  });

  const acceptMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      queryClient.invalidateQueries(["dispute-details", slug]);
      notification({
        title: "Successful",
        message: res?.message || "Dispute claim accepted successfully",
        type: "success"
      });
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: String(err) || "Something went wrong.",
        type: "danger"
      });
    }
  });

  const dispute: ApiDispute | null = useMemo(() => {
    if (status !== "success" || !data?.data) return null;
    return data.data as ApiDispute;
  }, [status, data]);

  const handleBack = () => router.back();

  const handleAcceptClaim = () => {
    if (!slug) {
      notification({
        title: "Error",
        message: "Dispute ID not found",
        type: "danger"
      });
      return;
    }

    const payload = {
      SellerResponse: "",
      EvidenceFiles: [],
      AcceptClaim: true
    };

    acceptMutation.mutate({
      service: "wallet-service/api/v1/",
      endpoint: "disputes",
      extra: `${slug}/respond`,
      method: "POST",
      body: payload,
      auth: true
    });
  };

  const handleRejectClaim = () => {
    setShowResponseForm(true);
  };

  return (
    <div className="w-full">
      <div className="w-full mb-3">
        <Button
          border
          onClick={handleBack}
          borderColor="border-primary"
          textColor="text-primary"
          bgColor="bg-transparent"
          paddingX="px-3"
          iconPosition="left"
          icon={<HiOutlineArrowLeft className="mr-2 mb-0.5" />}
        >
          Back
        </Button>
      </div>

      {status === "loading" && <Loading />}

      {status === "success" && dispute && (
        <div className="w-full">
          <div className="flex flex-wrap -m-4">
            <div className="w-full xl:w-7/12 p-4">
              <div className="w-full bg-white px-8 py-6 rounded-lg shadow-sm border border-gray-100 mb-3">
                <h3 className="text-base font-semibold text-gray-900 mb-4">
                  Invoice Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm text-gray-500">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Invoice Number</span>
                      <span className="font-semibold text-gray-900">
                        {dispute?.orderReference ?? "—"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Invoice Name</span>
                      <span className="font-semibold text-gray-900">
                        {dispute?.invoiceName ?? "—"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Dispute Status</span>
                      <TransactionStatus status={dispute?.status ?? "unknown"} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Amount</span>
                      <span className="font-bold text-gray-900">
                        {typeof dispute?.orderTotalAmount === "number"
                          ? `NGN ${dispute.orderTotalAmount.toLocaleString()}`
                          : "—"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Due Date</span>
                      <span className="font-semibold text-gray-900">
                        {formatDate((dispute?.createdAt ?? "").toString())}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Date Sent</span>
                      <span className="font-semibold text-gray-900">
                        {formatDateTime(dispute?.createdAt ?? "")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full bg-white px-8 py-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-base font-semibold text-gray-900 mb-4">
                  Parties Involved
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm text-gray-500">
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-700">
                      Seller Information
                    </h4>

                    <div className="flex justify-between">
                      <span>Name</span>
                      <span className="font-semibold text-gray-900">
                        {dispute?.sellerBusinessName ?? "—"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Phone Number</span>
                      <span className="font-semibold text-gray-900">
                        {dispute?.sellerPhone ?? "—"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-700">
                      Buyer Information
                    </h4>

                    <div className="flex justify-between">
                      <span>Name</span>
                      <span className="font-semibold text-gray-900">
                        {dispute?.reporterName ?? "—"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Phone Number</span>
                      <span className="font-semibold text-gray-900">
                        {dispute?.reporterPhone ?? "—"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <DisputeDetails dispute={dispute} onAccept={handleAcceptClaim} onReject={handleRejectClaim} />

              {showResponseForm && (
                <DisputeResponse
                  openDispute={showResponseForm}
                  disputeId={slug}
                  isResponse={true}
                  onClose={() => setShowResponseForm(false)}
                />
              )}
            </div>

            <div className="w-full xl:w-5/12 p-4">
              <ActivityLog
                data={activityStatus === 'success' ? activityData?.data : []}
              />
            </div>
          </div>
        </div>
      )}
      {activityStatus === 'error' && (
        <div className="w-full py-10">
          {String(activityError)}
        </div>
      )}
    </div>
  );
}
