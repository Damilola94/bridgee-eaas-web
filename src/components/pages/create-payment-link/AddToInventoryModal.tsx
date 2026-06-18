import React from "react";
import { useRouter } from "next/router";
import Modal from "../../common/Modal";
import Button from "../../inputs/Button";
import { formatCurrency } from "../../../utilities/general";
import { OrderListItemProps } from '../../../types/invoice';

interface AddToInventoryModalProps {
  items: OrderListItemProps[];
  onClose: () => void;
}

function AddToInventoryModal({ items, onClose }: AddToInventoryModalProps) {
  const router = useRouter();

  const handleYes = () => {
  const first = items[0];

  const params = new URLSearchParams({
    tab: "sales",
    status: "all",
    prefillName: first.name ?? "",
    prefillAmount: String(first.amount ?? ""),
    addItem: "true",
  });

  if (items.length > 1) {
    params.set(
      "prefillItems",
      JSON.stringify(items.map((i) => ({ name: i.name, amount: i.amount }))),
    );
  }

  onClose();
  router.push(`/inventory?${params.toString()}`);
};

  return (
    <Modal isOpen onClose={onClose} maxWidth="max-w-[400px]">
        <h3 className="font-bold text-lg ff-bold mb-2">
          Add {items.length === 1 ? "item" : "items"} to Inventory?
        </h3>
        <p className="text-lightText text-sm mb-4">
          The following {items.length === 1 ? "item was" : "items were"} not
          linked to your inventory. Would you like to add{" "}
          {items.length === 1 ? "it" : "them"} now?
        </p>

        <ul className="mb-6 space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center bg-lightText/5 rounded-lg px-3 py-2"
            >
              <span className="text-sm font-medium text-textColor">
                {item.name}
              </span>
              <span className="text-sm text-lightText">
                {formatCurrency(item.amount)} / unit
              </span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3">
          <Button paddingY="py-3" className="w-full" onClick={handleYes}>
            Yes, add to Inventory
          </Button>
          <Button
            paddingY="py-3"
            className="w-full bg-white border border-primary text-primary hover:bg-primary/5"
            bgColor="bg-white"
            textColor="text-primary"
            onClick={onClose}
          >
            No, skip
          </Button>
        </div>
    </Modal>
  );
}

export default AddToInventoryModal;