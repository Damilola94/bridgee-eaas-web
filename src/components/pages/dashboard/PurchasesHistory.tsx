"use client";

import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { FiArrowRight } from "react-icons/fi";

import NoData from "../../common/NoData";
import TransactionStatus from "../../common/TransactionStatus";
import ListStatusTabsNoScroll from "../../common/ListStatusTabsNoScroll";
import useGetQuery from "../../../hooks/useGetQuery";

import Button from "../../inputs/Button";

import { SalesItem } from "./types";

const options = [
  { title: "All", status: "all" },
  { title: "Cancelled", status: "Cancelled" },
  { title: "Completed", status: "Completed" },
  { title: "Confirmed", status: "Confirmed" },
  { title: "Delivered", status: "Delivered" },
  { title: "Disputed", status: "Disputed" },
  { title: "Dispute Resolved", status: "DisputeResolved" },
  { title: "Draft", status: "Draft" },
  { title: "Picked Up", status: "PickedUp" }
];

function PurchasesHistory({ onOpenDispute }: { onOpenDispute: (id: string | number) => void }) {
  const [cookie] = useCookies(["data"]);
  const router = useRouter();
  const { tab } = router.query || {};

  const { data, status, error } = useGetQuery({
    service: "wallet-service/api/v1",
    endpoint: "escrows",
    extra: "buyer/orders",
    pQuery: {
      UserId: cookie?.data?.userId,
      pageSize: 10,
      pageNumber: 1,
      SearchKey: "",
      Status: router?.query?.status === 'all' ? null : router?.query?.status
    },
    queryKey: ["escrows-orders", router?.query?.status],
    enabled: !!router?.query?.status || !!cookie?.data?.accessToken
  });

  useEffect(() => {
    if (!tab) {
      router.push({ pathname: "/dashboard", query: { tab: "sales", status: undefined } });
    }
  }, [router, tab]);

  return (
    <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex flex-wrap items-center justify-between px-5 sm:px-10 py-5">
        <div>
          <h3 className="font-bold text-lg mr-5 mb-2">Purchases</h3>
          <p className="text-lightText  mb-2">This speaks to the items purchased by the buyer</p>
        </div>
        <Link href="/transactions/?tab=sales&status=all">
          <Button
            className="w-fit flex items-center justify-center bg-transparent text-primary"
            paddingY="py-3"
            iconPosition="right"
            icon={<FiArrowRight className="ml-2 text-primary" />}
          >
            <span className="text-primary">See All</span>
          </Button>
        </Link>
      </div>
      <ListStatusTabsNoScroll options={options} pathname="/dashboard" />
      <div className="w-full overflow-auto pb-20">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="bg-secondary">
            <tr>
              <th className="pl-5 sm:pl-10 pr-3 py-5">#</th>
              <th className="px-3 py-5">Business Name</th>
              <th className="px-3 py-5">Invoice Number</th>
              <th className="px-3 py-5">Amount</th>
              <th className="px-3 py-5">Date</th>
              <th className="px-3 py-5">Payment Link</th>
              <th className="px-3 py-5">Status</th>
              {data?.data?.some(
                (item: SalesItem) => item.status !== "Disputed" && item.status !== "DisputeResolved"
              ) && <th className="px-3 py-5">Action</th>}
            </tr>
          </thead>
          <tbody>
            {status === "loading" && (
              <tr>
                <td colSpan={7} className="text-center pt-4">
                  <div className="px-5 space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex space-x-4 py-2">
                        <Skeleton width={32} height={16} />
                        <Skeleton width={128} height={16} />
                        <Skeleton width={96} height={16} />
                        <Skeleton width={80} height={16} />
                        <Skeleton width={112} height={16} />
                        <Skeleton width={96} height={16} />
                        <Skeleton width={80} height={16} />
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            )}

            {status === "success" &&
              (data?.data?.length > 0 ? (
                <>
                  {data.data.map((item: SalesItem, index: number) => (
                    <tr className="border-t cursor-pointer hover:bg-primary/5" key={item.id}
                      onClick={() => router.push({ pathname: `/transactions/sales-details/${item?.id}` })}
                    >
                      <td className="pl-5 sm:pl-10 pr-3 py-5">{index + 1}</td>
                      <td className="px-3 py-5">
                        <div className="flex items-center space-x-3">
                          <span className="capitalize">{item.recipientName}</span>
                        </div>
                      </td>
                      <td className="px-3 py-5">{`${item.referenceNumber}`}</td>
                      <td className="px-3 py-5">{item.amount}</td>
                      <td className="px-3 py-5">{item.createdDate}</td>
                      <td className="px-3 py-5">
                        {item.referenceNumber ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/buyer/in-app-order/${item.referenceNumber}`);
                            }}
                            className="text-blue-600 hover:underline"
                          >
                            View Order
                          </button>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td className="px-3 py-5">
                        <TransactionStatus status={item.status} />
                      </td>
                      {item.status !== "Disputed" && item.status !== "DisputedResolved" && (
                        <td className="px-3 py-5">
                          <Button
                            paddingY="py-1"
                            paddingX="px-1.5"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenDispute(item.id);
                            }}
                          >
                            Open Dispute
                          </Button>
                        </td>
                      )}
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td colSpan={7}>
                    <NoData py="pt-14" />
                  </td>
                </tr>
              ))}

            {status === "error" && (
              <tr>
                <td colSpan={7} className="text-center pt-10">
                  {String(error)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PurchasesHistory;