"use client";

import { useState, useEffect } from "react";

const sampleDisputes = [
  {
    id: 1,
    invoiceTitle: "Declutter items",
    invoicePeriod: "2 Days",
    status: "Open",
    date: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    invoiceTitle: "Declutter items",
    invoicePeriod: "2 Days",
    status: "Open",
    date: "2024-01-20T14:45:00Z"
  },
  {
    id: 3,
    invoiceTitle: "Declutter items",
    invoicePeriod: "2 Days",
    status: "Resolved",
    date: "2024-01-05T16:20:00Z"
  },
  {
    id: 4,
    invoiceTitle: "Declutter items",
    invoicePeriod: "2 Days",
    status: "Resolved",
    date: "2024-01-05T16:20:00Z"
  },
  {
    id: 5,
    invoiceTitle: "Declutter items",
    invoicePeriod: "2 Days",
    status: "Open",
    date: "2024-01-25T11:00:00Z"
  }
];

interface UseGetQueryProps {
  endpoint: string
  queryKey: any[]
  pQuery: {
    pageSize: number
    pageNumber: number
    status: string
  }
}

const useGetQuery = ({ endpoint, queryKey, pQuery }: UseGetQueryProps) => {
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [error, setError] = useState<any>(null);
  const [isRefetching, setIsRefetching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setStatus("loading");
      setIsRefetching(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        // Filter disputes based on status
        const filteredDisputes = sampleDisputes.filter((dispute) => dispute.status === pQuery.status);

        setData({
          data: {
            disputes: filteredDisputes
          }
        });
        setStatus("success");
      } catch (err) {
        setError(err);
        setStatus("error");
      } finally {
        setIsRefetching(false);
      }
    };

    fetchData();
  }, [pQuery.status]);

  return {
    data, status, error, isRefetching
  };
};

export default useGetQuery;
