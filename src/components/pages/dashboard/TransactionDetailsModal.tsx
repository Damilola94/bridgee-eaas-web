/* eslint-disable no-constant-condition */
"use client";

import { useState, ReactNode, useMemo } from "react";
import { Copy } from "lucide-react";
import { BiDownload } from "react-icons/bi";
import { useCookies } from "react-cookie";

import TransactionStatus from "../../common/TransactionStatus";
import Modal from "../../common/Modal";
import Button from "../../inputs/Button";
import InflowArrow from "../../../assets/svg-tsx/InflowArrow";

import useGetQuery from '../../../hooks/useGetQuery';
import { downloadTransactionPDF } from "../../../lib/downloadInvoice";
type Props = {
  onClose: () => void;
  transactionId: string;
};

function TransactionDetailsModal({ onClose, transactionId }: Props) {
  const [copiedRef, setCopiedRef] = useState(false);
  const [cookie] = useCookies(["data"]);

  const { data, status } = useGetQuery({
    service: "wallet-service",
    endpoint: "wallet",
    extra: `transactions/${transactionId}`,
    queryKey: ["transaction-details", transactionId],
    enabled: !!cookie?.data?.accessToken && !!transactionId
  });

  const transactionData = useMemo(() => {
    if (status === "success" && data?.isSuccess && data?.data) {
      const tx = data.data;
      return {
        amount: `${tx.amount ?? 0}`,
        reference: tx.reference,
        channel: tx.transactionChannel,
        status: tx.status,
        type: tx.transactionType,
        description: tx.description || "—",
        date: tx.date,
        fee: tx.transactionFee ? `₦${tx.transactionFee}` : "—"
      };
    }
    return null;
  }, [status, data]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  return (
    <Modal isOpen onClose={onClose} maxWidth="max-w-[400px]">
      <div className="w-full py-5">
        <h1 className="w-full text-textColor ff-bold text-xl mb-6 text-center">
          Transaction Details
        </h1>

        {status === "loading" && (
          <div className="text-center text-gray-500 py-10">Loading...</div>
        )}

        {status === "error" && (
          <div className="text-center text-red-500 py-10">
            Failed to fetch transaction details
          </div>
        )}

        {status === "success" && transactionData && (
          <>
            <div className="flex items-center justify-center mb-2">
              <div className="flex items-center space-x-3">
                <span className="w-8 h-8 bg-success/10 p-2 rounded-full">
                  <InflowArrow className="w-4 h-4" color="#EB4336" />
                </span>
                <span className="capitalize">{transactionData.type}</span>
              </div>
            </div>

            <div className="text-3xl font-bold text-primary text-center mb-4 ff-bold">
              {transactionData.amount}
            </div>

            <div className="text-sm text-gray-600 text-center mb-1 ff-bold">
              Transaction Reference:
            </div>
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="text-sm font-mono">{transactionData.reference}</span>
              <button
                onClick={() => copyToClipboard(transactionData.reference)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Copy className="w-4 h-4 text-gray-500" />
              </button>
              {copiedRef && (
                <span className="text-xs text-green-600">Copied!</span>
              )}
            </div>

            <div className="space-y-6 mb-6">
              <Row label="Transaction channel" value={transactionData.channel} />
              <Row
                label="Status"
                value={<TransactionStatus status={transactionData.status} />}
                valueClass="text-green-600"
              />
              <Row label="Transaction Type" value={transactionData.type} />
              <Row label="Description" value={transactionData.description} wrap />
              <Row label="Date" value={transactionData.date} />
              <Row label="Transaction Fee" value={transactionData.fee} />
            </div>
            <Button
              onClick={() => downloadTransactionPDF(transactionData)}
              className="w-full bg-white text-success hover:bg-pink-100 border border-success"
              icon={<BiDownload className="ml-2" />}
            >
              Download Receipt
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
}

export default TransactionDetailsModal;

const Row = ({
  label,
  value,
  wrap,
  valueClass = ""
}: {
  label: string;
  value: string | ReactNode;
  wrap?: boolean;
  valueClass?: string;
}) => (
  <div className="flex justify-between items-start">
    <span className="text-sm text-gray-600">{label}</span>
    <span
      className={`text-sm font-medium text-right ${wrap ? "max-w-[200px]" : ""
      } ${valueClass}`}
    >
      {value}
    </span>
  </div>
);
