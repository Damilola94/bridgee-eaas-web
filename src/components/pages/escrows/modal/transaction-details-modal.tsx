import { CgClose } from "react-icons/cg";

import Modal from "../../../common/Modal";
import { SellerDetailSection } from "../ui/seller-detail-section";
import { BuyerDetailSection } from "../ui/buyer-detail-section";
import { ProductDetailsSection } from "../ui/product-details-section";
import { ActivityTimeline } from "../ui/activity-timeline";
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

  const transaction =
    status === "success" && data?.isSuccess
      ? mapDetailDtoToTransaction(data.data as EscrowTransactionDetailDTO)
      : null;

  if (!isOpen || !transaction) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCloseOnOverlayClick
      isShowCloseIcon={false}
      maxWidth="max-w-lg"
      isFullHeight
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between pb-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Transaction Details
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200"
          >
            <CgClose className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 pt-5 space-y-5">
          <SellerDetailSection seller={transaction.seller} />
          <BuyerDetailSection buyer={transaction.buyer} />
          <ProductDetailsSection
            items={transaction.items}
            status={transaction.status}
          />
          <ActivityTimeline events={transaction.timeline} />
        </div>
      </div>
    </Modal>
  );
}