"use client";

import { type FC } from "react";
import Button from "../../../inputs/Button";

type DeleteCustomerModalProps = {
  isOpen: boolean;
  customerName?: string;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
};

const DeleteCustomerModal: FC<DeleteCustomerModalProps> = ({
  isOpen,
  customerName,
  onClose,
  onConfirm,
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-textColor mb-2">
          Remove Customer
        </h3>
        <p className="text-sm text-lightText mb-6">
          Are you sure you want to remove{" "}
          <span className="font-semibold text-textColor">
            {customerName || "this customer"}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 h-[42px] rounded-lg border border-lightText/30 text-sm font-medium text-textColor hover:bg-secondary/50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <Button
            className="flex-1"
            paddingY="py-2.5"
            onClick={onConfirm}
            disabled={isLoading}
            // isLoading={isLoading}
            // variant="danger"
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCustomerModal;