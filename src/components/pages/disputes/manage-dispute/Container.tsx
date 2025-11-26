"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/router";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useMutation, useQueryClient } from "react-query";

import useGetQuery from "../../../../hooks/useGetQuery"; import { formatDateTime } from "../../../../utilities/dateTime";
import Loading from "../../../common/Loading";
import Button from "../../../inputs/Button";
import notification from "../../../../utilities/notification";

import handleFetch from "../../../../services/api/handleFetch";

import TransactionStatus from "../../../common/TransactionStatus";

import DisputeDetails from "./DisputeDet";
import DisputeResponse from "./OpenDispute";
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
      endpoint: `wallet-service/api/v1/disputes/${slug}/respond`,
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

      {status === "error" && (
        <div className="w-full">
          <div className="flex flex-wrap -m-4">
            <div className="w-full xl:w-7/12 p-4">
              <div className="w-full bg-white px-10 py-8 rounded-lg shadow-md mb-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <table className="text-[#888888]">
                    <tbody>
                      <tr>
                        <td className="py-1 pr-5">Invoice Number</td>
                        <td className="py-1 font-semibold text-black">#—</td>
                      </tr>
                      <tr>
                        <td className="py-1 pr-5">Due Date</td>
                        <td className="py-1 font-semibold text-black">—</td>
                      </tr>
                      <tr>
                        <td className="py-1 pr-5">Dispute Status</td>
                        <td className="py-1">
                          <span className="text-sm font-medium">—</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <table className="text-[#888888]">
                    <tbody>
                      <tr>
                        <td className="py-1 pr-5">Invoice Name</td>
                        <td className="py-1 font-semibold text-black">—</td>
                      </tr>
                      <tr>
                        <td className="py-1 pr-5">Amount</td>
                        <td className="py-1 font-bold text-black">—</td>
                      </tr>
                      <tr>
                        <td className="py-1 pr-5">Date Sent</td>
                        <td className="py-1 font-semibold text-black">—</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="w-full">
                <div className="w-full bg-white px-10 py-8 rounded-lg shadow-md my-5">
                  <h2 className="text-2xl font-semibold mb-6">Dispute</h2>
                  <p className="text-sm text-gray-600">Could not load dispute.</p>
                </div>
              </div>
            </div>

            <div className="w-full xl:w-5/12 p-4">
              <ActivityLog data={[]} />
            </div>
          </div>
        </div>
      )}

      {status === "success" && dispute && (
        <div className="w-full">
          <div className="flex flex-wrap -m-4">
            <div className="w-full xl:w-7/12 p-4">
              <div className="w-full bg-white px-10 py-8 rounded-lg shadow-md mb-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-10">
                  <table className="text-[#888888]">
                    <tbody>
                      <tr>
                        <td className="py-1 pr-5">Order Reference</td>
                        <td className="py-1 font-semibold text-black">{dispute.orderReference ?? "—"}</td>
                      </tr>

                      <tr>
                        <td className="py-1 pr-5">Created</td>
                        <td className="py-1 font-semibold text-black">{formatDateTime(dispute.createdAt ?? "")}</td>
                      </tr>

                      <tr>
                        <td className="py-1 pr-5">Dispute Status</td>
                        <td className="py-1 w-full">
                          <TransactionStatus status={dispute.status ?? "unknown"} />
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <table className="text-[#888888]">
                    <tbody>
                      <tr>
                        <td className="py-1 pr-5">Reporter</td>
                        <td className="py-1 font-semibold text-black">{dispute.reporterName ?? "—"}</td>
                      </tr>

                      <tr>
                        <td className="py-1 pr-5">Amount</td>
                        <td className="py-1 font-bold text-black">
                          {typeof dispute.orderTotalAmount === "number"
                            ? `NGN ${dispute.orderTotalAmount.toLocaleString()}`
                            : "—"}
                        </td>
                      </tr>

                      <tr>
                        <td className="py-1 pr-5">Date Sent</td>
                        <td className="py-1 font-semibold text-black ">{formatDateTime(dispute.createdAt ?? "")}</td>
                      </tr>
                    </tbody>
                  </table>
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
