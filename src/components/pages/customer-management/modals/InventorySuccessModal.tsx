import Modal from "../../../common/Modal";
import Button from "../../../inputs/Button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
};

export default function InventorySuccessModal({ isOpen, onClose, title, message }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCenter maxWidth="max-w-[420px]">
      <div className="w-full py-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center mb-5">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="ff-bold text-xl text-textColor mb-2">{title}</h2>
        <p className="text-sm text-lightText mb-8 max-w-xs">{message}</p>
        <Button
          className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl"
          paddingY="p-3.5"
          onClick={onClose}
        >
          Go back to My Inventory
        </Button>
      </div>
    </Modal>
  );
}