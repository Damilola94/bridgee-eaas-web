"use client";

import Image from "next/image";

import { Loader2 } from "lucide-react";

import DisputeIcon from "../../../../assets/svgs/ticket.svg";
import useGetQuery from '../../../../hooks/useGetQuery';

export default function DisputeMetrics() {
  const { data, status } = useGetQuery({
    service: "wallet-service/api/v1/",
    endpoint: "disputes",
    extra: "seller/stats",
    queryKey: ["dispute-stats"],
    enabled: true
  });

  const stats = [
    {
      title: "Total number of disputes",
      value: data?.data?.totalDisputes ?? 0
    },
    {
      title: "Resolved",
      value: data?.data?.resolvedDisputes ?? 0
    },
    {
      title: "In progress",
      value:
        (data?.data?.pendingDisputes ?? 0) +
        (data?.data?.underReviewDisputes ?? 0) +
        (data?.data?.escalatedDisputes ?? 0)
    }
  ];

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className="animate-spin w-6 h-6 mr-2" />
        <span>Loading dispute stats...</span>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="py-10 text-center text-red-600">
        Failed to load dispute metrics
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 shadow-sm rounded-lg p-6"
        >
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-full bg-purple/10">
              <Image
                src={DisputeIcon}
                alt={stat.title}
                width={18}
                height={18}
              />
            </div>

            <div className="flex-1">
              <p className="text-sm text-gray-600 font-medium">
                {stat.title}
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
