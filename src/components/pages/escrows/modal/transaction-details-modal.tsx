import { CgClose } from "react-icons/cg";

import Modal from "../../../common/Modal";
import { SellerDetailSection } from "../ui/seller-detail-section";
import { BuyerDetailSection } from "../ui/buyer-detail-section";
import { ProductDetailsSection } from "../ui/product-details-section";
import useGetQuery from "../../../../hooks/useGetQuery";

import {
  EscrowTransactionDetailDTO,
  mapDetailDtoToTransaction,
} from "../types/types";

export function TransactionDetailsModal({
  isOpen,
  onClose,
  transactionId,
}: {
  isOpen: boolean;
  onClose: () => void;
  transactionId: string | null;
}) {
  const { data, status } = useGetQuery({
    endpoint: `escrow-service/api/v1/escrowtransactions/${transactionId}`,
    queryKey: ["escrow-transaction-detail", transactionId],
    auth: true,
    enabled: isOpen && !!transactionId,
  });

  const isLoading = status === "loading";

  const transaction =
    status === "success" && data?.isSuccess && data?.data
      ? mapDetailDtoToTransaction(
          data.data as EscrowTransactionDetailDTO,
        )
      : null;

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCloseOnOverlayClick
      isShowCloseIcon={false}
      maxWidth="max-w-2xl"
      isFullHeight
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Transaction Details
            </h2>

            {transaction?.reference && (
              <p className="mt-1 text-xs text-gray-500">
                Reference: {transaction.reference}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 transition hover:bg-gray-200"
          >
            <CgClose className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto pt-5">
          {/* Loading */}
          {isLoading && (
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-pink-600" />

                <p className="text-sm text-gray-500">
                  Loading transaction details...
                </p>
              </div>
            </div>
          )}

          {/* Error / Not Found */}
          {!isLoading && !transaction && (
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900">
                  Unable to load transaction
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Please try again.
                </p>
              </div>
            </div>
          )}

          {/* Transaction */}
          {transaction && (
            <div className="space-y-5 pb-5">
              <SellerDetailSection seller={transaction.seller} />

              <BuyerDetailSection buyer={transaction.buyer} />

              <ProductDetailsSection
                items={transaction.items}
                status={transaction.status}
              />

              {/* Payment Summary */}
              <div className="rounded-xl border border-gray-100 bg-white p-4">
                <h3 className="mb-4 text-sm font-semibold text-gray-900">
                  Payment Summary
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Subtotal
                    </span>

                    <span className="text-sm font-medium text-gray-900">
                      {transaction.subtotal}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Delivery Fee
                    </span>

                    <span className="text-sm font-medium text-gray-900">
                      {transaction.deliveryFee}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Escrow Fee
                    </span>

                    <span className="text-sm font-medium text-gray-900">
                      {transaction.escrowFee}
                    </span>
                  </div>

                  <div className="border-t border-gray-100 pt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-900">
                        Total
                      </span>

                      <span className="text-lg font-bold text-pink-700">
                        {transaction.total}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              {transaction.description && (
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-medium text-gray-400">
                    Description
                  </p>

                  <p className="mt-1 text-sm text-gray-700">
                    {transaction.description}
                  </p>
                </div>
              )}

              
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}