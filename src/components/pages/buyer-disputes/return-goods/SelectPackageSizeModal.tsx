
import React from "react";
import Image from "next/image";

import { ShipBubbleDimension } from "../../../../types/shipbubble";
import Button from "../../../inputs/Button";

interface SelectPackageSizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  dimensions: ShipBubbleDimension[];
  onSelect: (dimension: ShipBubbleDimension) => void;
}

const SelectPackageSizeModal: React.FC<SelectPackageSizeModalProps> = ({
  isOpen,
  onClose,
  dimensions,
  onSelect
}) => {
  if (!isOpen) return null;

  const handleSelect = (dimension: ShipBubbleDimension) => {
    onSelect(dimension);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-6">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Select Package Size</h2>
          <button onClick={onClose} className="text-2xl">
            &times;
          </button>
        </div>
        <div className="grid gap-4 max-h-[60vh] overflow-y-auto">
          {dimensions.map((dim) => (
            <div
              key={dim.boxSizeId}
              className="flex items-center justify-between border px-8 rounded-lg p-4 text-center cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleSelect(dim)}
            >
              <div>
                <Image
                  src={dim.descriptionImageUrl}
                  alt={dim.name}
                  width={100}
                  height={100}
                  className="mx-auto mb-2"
                />
              </div>

              <div className="text-right">
                <p className="font-semibold">{dim.name}</p>
                <p className="text-sm text-gray-500">{`Weight: ${dim.maxWeight}kg Max`}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectPackageSizeModal;
