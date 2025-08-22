/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";

// Mock transaction data
const sampleTransactions = Array.from({ length: 10 }).map((_, index) => ({
  id: index + 1,
  type: index % 2 === 0 ? "Inflow" : "Withdraw",
  transactionReference: `REF-${1000 + index}`,
  amount: (Math.random() * 5000 + 1000).toFixed(2),
  channel: index % 3 === 0 ? "Bank Transfer" : "Card",
  status: index % 2 === 0 ? "completed" : "failed",
  date: new Date(2024, 0, index + 1).toISOString()
}));

interface UseGetQueryProps {
  endpoint: string;
  extra?: string;
  queryKey: any[];
  pQuery: {
    pageSize: number;
    pageNumber: number;
    walletId?: string;
    status?: any
    start?: string | null;
    end?: string | null;
    minAmount?: number;
    maxAmount?: number;
    transactionType?: string;
    channel?: string;
    search?: string;
  };
  enabled?: boolean;
}

const useGetQuery = ({
  endpoint, queryKey, pQuery, enabled = true
}: UseGetQueryProps) => {
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [error, setError] = useState<any>(null);
  const [isRefetching, setIsRefetching] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const fetchData = async () => {
      setStatus("loading");
      setIsRefetching(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        let filtered = [...sampleTransactions];

        // Apply filters
        if (pQuery.status && pQuery.status !== "all") {
          filtered = filtered.filter((tx) => tx.status === pQuery.status);
        }

        if (pQuery.search) {
          const searchLower = pQuery.search?.toLowerCase() ?? "";
          filtered = filtered.filter(
            (tx) =>
              tx.type.toLowerCase().includes(searchLower) ||
              tx.transactionReference.toLowerCase().includes(searchLower)
          );
        }

        if (pQuery.minAmount) {
          filtered = filtered.filter((tx) => Number(tx.amount) >= pQuery.minAmount!);
        }

        if (pQuery.maxAmount) {
          filtered = filtered.filter((tx) => Number(tx.amount) <= pQuery.maxAmount!);
        }

        if (pQuery.channel) {
          filtered = filtered.filter((tx) => tx.channel === pQuery.channel);
        }

        if (pQuery.transactionType) {
          filtered = filtered.filter((tx) => tx.type === pQuery.transactionType);
        }

        // Pagination
        const startIndex = (pQuery.pageNumber - 1) * pQuery.pageSize;
        const paginated = filtered.slice(startIndex, startIndex + pQuery.pageSize);

        setData({
          data: {
            transactions: paginated,
            pagination: {
              totalPages: Math.ceil(filtered.length / pQuery.pageSize),
              totalRecords: filtered.length
            }
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
  }, [JSON.stringify(queryKey), enabled]);

  return {
    data,
    status,
    error,
    isRefetching
  };
};

export default useGetQuery;
