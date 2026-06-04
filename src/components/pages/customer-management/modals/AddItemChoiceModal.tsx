import { BsBoxSeam } from "react-icons/bs";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";

import Modal from "../../../common/Modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelectSingle: () => void;
  onSelectBulk: () => void;
};

export default function AddItemChoiceModal({
  isOpen,
  onClose,
  onSelectSingle,
  onSelectBulk,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCenter maxWidth="max-w-[450px]">
      <div className="w-full py-5">
        <h1 className="text-textColor ff-bold text-xl mb-1">Order Details</h1>
        <p className="text-sm text-lightText mb-6">
          Choose how you'd like to add new items
        </p>

        <button
          type="button"
          onClick={onSelectSingle}
          className="w-full flex items-center gap-4 p-4 border-2 border-lightText/20 rounded-xl hover:border-primary hover:bg-primary/5 transition-all mb-4 text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <BsBoxSeam className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-textColor">Add Single Items</p>
            <p className="text-sm text-lightText">Manually enter item details</p>
          </div>
        </button>

        <button
          type="button"
          onClick={onSelectBulk}
          className="w-full flex items-center gap-4 p-4 border-2 border-lightText/20 rounded-xl hover:border-primary hover:bg-primary/5 transition-all text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <HiOutlineDocumentArrowDown className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-textColor">Bulk Upload</p>
            <p className="text-sm text-lightText">Upload items via CSV/Excel</p>
          </div>
        </button>
      </div>
    </Modal>
  );
}