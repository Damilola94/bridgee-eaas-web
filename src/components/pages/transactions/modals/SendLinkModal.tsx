import Image from "next/image";
import { useMutation, useQueryClient } from "react-query";

import Modal from "../../../common/Modal";
import Loading from "../../../common/Loading";
import Button from "../../../inputs/Button";
import handleFetch from "../../../../services/api/handleFetch";
import notification from "../../../../utilities/notification";

interface Props {
  target: any;
  onClose: () => void;
}

export default function SendLinkModal({ target, onClose }: Props) {
  const queryClient = useQueryClient();

  const sendLinkMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      notification({
        message: res?.message || "Payment link sent successfully",
        type: "success",
      });
      onClose();
      queryClient.invalidateQueries(["escrows-orders"]);
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Failed to send link. Please try again.",
        type: "danger",
      });
    },
  });

  const handleConfirm = () => {
    if (!target) return;
    sendLinkMutation.mutate({
      service: "wallet-service/api/v1/",
      endpoint: `escrows/orders/${target.id}/send-link`,
      method: "POST",
      auth: true,
    });
  };

  return (
    <Modal
      isOpen={!!target}
      onClose={() => !sendLinkMutation.isLoading && onClose()}
      maxWidth="max-w-[450px]"
    >
      {sendLinkMutation.isLoading && <Loading message="Sending Link..." />}

      <div className="w-full">
        <div className="mb-7">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </div>
          <h1 className="w-full text-textColor ff-bold text-xl mb-2">
            Send Payment Link
          </h1>
          <p className="text-sm text-lightText">
            Are you sure you want to send the payment link for order{" "}
            <span className="font-semibold text-textColor">
              #{target?.referenceNumber}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-textColor capitalize">
              {target?.recipientName}
            </span>
            ? This will notify the recipient immediately.
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={onClose}
            disabled={sendLinkMutation.isLoading}
            className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl bg-transparent border border-grey !text-greyDark"
            paddingY="p-3.5"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={sendLinkMutation.isLoading}
            className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl bg-primary hover:bg-primary/90 text-white"
            paddingY="p-3.5"
          >
            {sendLinkMutation.isLoading ? "Sending..." : "Send Link"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}