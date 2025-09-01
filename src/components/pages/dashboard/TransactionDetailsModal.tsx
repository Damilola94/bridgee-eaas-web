/* eslint-disable no-constant-condition */
"use client";

import { useState, ReactNode } from "react";
import { Copy } from "lucide-react";
import { BiDownload } from "react-icons/bi";

import TransactionStatus from '../../common/TransactionStatus';

import Modal from "../../common/Modal";
import Button from "../../inputs/Button";
import InflowArrow from "../../../assets/svg-tsx/InflowArrow";

type Props = {
  onClose: () => void;
  transactionData?: {
    amount: string;
    reference: string;
    channel: string;
    status: string;
    type: string;
    description: string;
    date: string;
    fee: string;
  };
};

function TransactionDetailsModal({ onClose, transactionData }: Props) {
  const [copiedRef, setCopiedRef] = useState(false);

  const defaultData = {
    amount: "NGN 3,500.00",
    reference: "BROFD8J8364803953828J2842",
    channel: "Escrow",
    status: "Processing",
    type: "Debit",
    description: "Amount deposited into escrow order: 829402",
    date: "Jan 24, 2023, 04:58 PM",
    fee: "NGN 500"
  };

  const data = transactionData || defaultData;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  return (
    <Modal isOpen onClose={onClose} maxWidth="max-w-[400px]">
      <div className="w-full py-5">

        <h1 className="w-full text-textColor ff-bold text-xl mb-6  text-center">Transaction Details</h1>

        <div className="flex items-center justify-center mb-2">
          <div className="flex items-center space-x-3">
            <span className={`w-8 h-8 bg-success/10 p-2 rounded-full`}>
              <InflowArrow className="w-4 h-4" color="#EB4336" />
            </span>
            <span className="capitalize">Inflow</span>
          </div>

        </div>

        <div className="text-3xl font-bold text-primary text-center mb-4 ff-bold">
          {data.amount}
        </div>

        <div className="text-sm text-gray-600 text-center mb-1 ff-bold">
          Transaction Reference:
        </div>
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-sm font-mono">{data.reference}</span>
          <button
            onClick={() => copyToClipboard(data.reference)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Copy className="w-4 h-4 text-gray-500" />
          </button>
          {copiedRef && (
            <span className="text-xs text-green-600">Copied!</span>
          )}
        </div>

        <div className="space-y-6 mb-6">
          <Row label="Transaction channel" value={data.channel} />
          <Row
            label="Status"
            value={<TransactionStatus status={data?.status} />}
            valueClass="text-green-600"
          />
          <Row label="Transaction Type" value={data.type} />
          <Row
            label="Description"
            value={data.description}
            wrap
          />
          <Row label="Date" value={data.date} />
          <Row label="Transaction Fee" value={data.fee} />
        </div>

        <Button
          onClick={onClose}
          className="w-full bg-white text-success hover:bg-pink-100 border border-success"
          icon={<BiDownload className="ml-2" />}
        >
          Download Receipt
        </Button>
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
  <div className="flex ff- justify-between items-start">
    <span className="text-sm text-gray-600">{label}</span>
    <span
      className={`text-sm font-medium text-right ${wrap ? "max-w-[200px]" : ""
      } ${valueClass}`}
    >
      {value}
    </span>
  </div>
);
