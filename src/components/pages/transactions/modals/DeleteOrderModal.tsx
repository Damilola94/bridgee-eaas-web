import Image from "next/image";
import { useMutation, useQueryClient } from "react-query";

import Modal from "../../../common/Modal";
import Loading from "../../../common/Loading";
import Button from "../../../inputs/Button";
import handleFetch from "../../../../services/api/handleFetch";
import notification from "../../../../utilities/notification";
import TrashIcon from "../../../../assets/svgs/trash-gray.svg";

interface Props {
  target: any;
  onClose: () => void;
}

export default function DeleteOrderModal({ target, onClose }: Props) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      notification({
        message: res?.message || "Order deleted successfully",
        type: "success",
      });
      onClose();
      queryClient.invalidateQueries(["escrows-orders"]);
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Failed to delete order. Please try again.",
        type: "danger",
      });
    },
  });

  const handleConfirm = () => {
    if (!target) return;
    deleteMutation.mutate({
      service: "wallet-service/api/v1/",
      endpoint: `escrows/orders/${target.id}`,
      method: "DELETE",
      auth: true
    });
  };

  return (
    <Modal
      isOpen={!!target}
      onClose={() => !deleteMutation.isLoading && onClose()}
      maxWidth="max-w-[400px]"
    >
      {deleteMutation.isLoading && <Loading message="Deleting Order..." />}

      <div className="w-full">
        <div className="mb-7">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <Image src={TrashIcon} alt="Delete" className="w-6 h-6" />
          </div>
          <h1 className="w-full text-textColor ff-bold text-xl mb-2">
            Delete Order
          </h1>
          <p className="text-sm text-lightText">
            Are you sure you want to delete order{" "}
            <span className="font-semibold text-textColor">
              #{target?.referenceNumber}
            </span>
            ? This action cannot be undone.
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={onClose}
            disabled={deleteMutation.isLoading}
            className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl bg-transparent border border-grey !text-greyDark"
            paddingY="p-3.5"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={deleteMutation.isLoading}
            className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl bg-red-500 hover:bg-red-600 text-white"
            paddingY="p-3.5"
          >
            {deleteMutation.isLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}