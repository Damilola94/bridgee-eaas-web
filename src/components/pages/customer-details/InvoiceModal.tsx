"use client";

import { type FC } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import DefaultLogo from "../../../assets/images/bridge-logo.svg";
import { useAccountsContext } from "../../../context/Accounts";

import StatusBadge from "./StatusBadge";
import Modal from "../../common/Modal";

type Order = {
  id: string;
  recipientName?: string;
  recipientEmail?: string;
  recipientPhone?: string;
  recipientAddress?: string;
  referenceNumber?: string;
  amount?: string;
  createdDate?: string;
  paymentLink?: string;
  status?: string;
  items?: {
    name: string;
    price: string | number;
    unit: number;
    total: string | number;
  }[];
  subtotal?: string | number;
  deliveryFee?: string | number;
  escrowFee?: string | number;
};

type InvoiceModalProps = {
  isOpen: boolean;
  order: Order | null;
  customer?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
  };
  onClose: () => void;
};

const InvoiceModal: FC<InvoiceModalProps> = ({
  isOpen,
  order,
  customer,
  onClose,
}) => {
  const router = useRouter();
  const { accounts } = useAccountsContext() || {};
  const { identity } = accounts || {};

  if (!isOpen || !order) return null;

  const hasItems = Array.isArray(order.items) && order.items.length > 0;

  const handleReuseInvoice = () => {
    router.push(`/create-payment-link?id=${order.id}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-[750px]">
      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-3">
            <Image
              src={identity?.businessDetail?.logoUrl || DefaultLogo}
              alt=""
              width={40}
              height={40}
              className="rounded"
            />
            <div>
              <h3 className="font-bold text-lg text-textColor">
                {identity?.businessDetail?.businessName || "Your Store"}
              </h3>
              {identity?.businessDetail?.businessAddress && (
                <p className="text-sm text-lightText max-w-xs">
                  {identity.businessDetail.businessAddress}
                </p>
              )}
              {order.createdDate && (
                <p className="text-sm text-lightText mt-1">
                  {order.createdDate}
                </p>
              )}
            </div>
          </div>

          <div className="text-right">
            <h2 className="text-xl font-bold text-textColor mb-2">
              Invoice {order.referenceNumber ? `#${order.referenceNumber}` : ""}
            </h2>
            <StatusBadge status={order.status} />
          </div>
        </div>

        {/* ── Recipient / Order Details ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-bold text-sm text-textColor mb-2">
              Recipient Details
            </h4>
            <p className="text-sm font-medium text-textColor mb-1">
              {order.recipientName || customer?.name || "—"}
            </p>
            <div className="text-sm text-lightText space-y-0.5">
              <p>{order.recipientEmail || customer?.email || "—"}</p>
              <p>{order.recipientPhone || customer?.phone || "—"}</p>
              <p>{order.recipientAddress || customer?.address || "—"}</p>
            </div>
          </div>

          <div className="sm:text-right">
            <h4 className="font-bold text-sm text-textColor mb-2">
              Order Details
            </h4>
            <div className="text-sm text-lightText space-y-1">
              <p>
                Reference:{" "}
                <span className="text-textColor font-medium">
                  {order.referenceNumber || "—"}
                </span>
              </p>
              {order.paymentLink && (
                <p className="truncate">
                  Payment Link:{" "}
                  <a
                    href={order.paymentLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline"
                  >
                    {order.paymentLink.replace(/^https?:\/\//, "")}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>

        {hasItems ? (
          <div className="w-full overflow-auto mb-4 border border-lightText/10 rounded-lg">
            <table className="w-full min-w-max table-auto text-left">
              <thead className="bg-secondary uppercase text-xs text-lightText">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Item</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Unit</th>
                  <th className="px-4 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items!.map((item, idx) => (
                  <tr key={idx} className="border-t border-lightText/10">
                    <td className="px-4 py-3 text-sm text-textColor">
                      {idx + 1}
                    </td>
                    <td className="px-4 py-3 text-sm text-textColor">
                      {item.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-textColor">
                      {item.price}
                    </td>
                    <td className="px-4 py-3 text-sm text-textColor">
                      {item.unit}
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-textColor text-right">
                      {item.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="border border-lightText/10 rounded-lg px-4 py-3 mb-4 flex items-center justify-between">
            <span className="text-sm text-lightText">Amount</span>
            <span className="text-sm font-bold text-textColor">
              {order.amount}
            </span>
          </div>
        )}

        <div className="w-full flex justify-end mb-6">
          <div className="w-full max-w-[260px] space-y-2">
            {order.subtotal && (
              <div className="flex justify-between text-sm">
                <span className="text-lightText">Subtotal</span>
                <span className="font-medium text-textColor">
                  {order.subtotal}
                </span>
              </div>
            )}
            {order.deliveryFee && (
              <div className="flex justify-between text-sm">
                <span className="text-lightText">Delivery Fee</span>
                <span className="font-medium text-textColor">
                  {order.deliveryFee}
                </span>
              </div>
            )}
            {order.escrowFee && (
              <div className="flex justify-between text-sm">
                <span className="text-lightText">Escrow Fee</span>
                <span className="font-medium text-textColor">
                  {order.escrowFee}
                </span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold text-textColor pt-2 border-t border-lightText/10">
              <span>Total</span>
              <span>{order.amount}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-[42px] rounded-lg border border-lightText/30 text-sm font-medium text-textColor hover:bg-secondary/50 transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleReuseInvoice}
            className="flex-1 h-[42px] rounded-lg border border-primary text-sm font-bold text-primary hover:bg-primary/5 transition-colors"
          >
            Reuse Invoice
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default InvoiceModal;
