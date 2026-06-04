import Modal from "../../../common/Modal";
import Button from "../../../inputs/Button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
};

export default function DeleteInventoryItemModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCenter maxWidth="max-w-[420px]">
      <div className="w-full py-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full border-2 border-red-500 flex items-center justify-center mb-5">
          <span className="text-red-500 text-2xl font-bold">!</span>
        </div>
        <h2 className="ff-bold text-xl text-textColor mb-2">Delete Item</h2>
        <p className="text-sm text-lightText mb-8">
          Are you sure you want to delete this item?
        </p>
        <div className="flex gap-3 w-full">
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl bg-red-500 hover:bg-red-600 text-white"
            paddingY="p-3.5"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
          <Button
            onClick={onClose}
            disabled={isLoading}
            className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl bg-transparent border border-grey !text-greyDark"
            paddingY="p-3.5"
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}