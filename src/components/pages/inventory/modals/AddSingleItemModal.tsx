import { useState, useEffect } from "react";
import Image from "next/image";
import { MdOutlineUploadFile } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";

import Modal from "../../../common/Modal";
import Loading from "../../../common/Loading";
import Button from "../../../inputs/Button";
import TextInput from "../../../inputs/Text";
import SelectInput from "../../../inputs/Select";

import handleFetch from "../../../../services/api/handleFetch";
import notification from "../../../../utilities/notification";

import TrashIcon from "../../../../assets/svgs/trash-gray.svg";

const CATEGORY_OPTIONS = [
  { label: "Automobiles & Parts", value: "AutomobilesAndParts" },
  { label: "Electronics", value: "Electronics" },
  { label: "Clothing", value: "Clothing" },
  { label: "Shoes", value: "Shoes" },
  { label: "Accessories", value: "Accessories" },
  { label: "Other", value: "Other" },
];

type AddItemForm = {
  name?: string;
  category?: { label: string; value: string };
  amountPerUnit?: string;
  stock?: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  sellerId: string;
  editItem?: any; 
};

export default function AddSingleItemModal({
  isOpen,
  onClose,
  onSuccess,
  sellerId,
  editItem,
}: Props) {
  const isEditMode = !!editItem;
  const queryClient = useQueryClient();
  const [form, setForm] = useState<AddItemForm>({});
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  useEffect(() => {
    if (editItem) {
      const rawAmount = editItem.amountPerUnit
        ? editItem.amountPerUnit.replace(/[^0-9.]/g, "")
        : "";

      const matchedCategory = CATEGORY_OPTIONS.find(
        (o) => o.value === editItem.category,
      );

      setForm({
        name: editItem.name || "",
        category: matchedCategory,
        amountPerUnit: rawAmount,
        stock: editItem.stock != null ? String(editItem.stock) : "",
      });
    } else {
      setForm({});
    }
    setUploadedFile(null);
    setUploadProgress(null);
  }, [editItem, isOpen]);

  const handleChange = (val: any, type = "input", name = "") => {
    if (type === "input") {
      const { value, name: n } = val.target;
      setForm((p) => ({ ...p, [n]: value }));
    } else {
      setForm((p) => ({ ...p, [name]: val }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFile(file);
    setUploadProgress(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      setUploadProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 300);
  };

  const handleClose = () => {
    setForm({});
    setUploadedFile(null);
    setUploadProgress(null);
    onClose();
  };

  const mutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      notification({
        message:
          res?.message ||
          (isEditMode
            ? "Item updated successfully"
            : "Item added successfully"),
        type: "success",
      });
      queryClient.invalidateQueries(["inventory"]);
      queryClient.invalidateQueries(["inventory-stats"]);
      handleClose();
      onSuccess();
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message:
          err?.toString() ||
          (isEditMode ? "Failed to update item." : "Failed to add item."),
        type: "danger",
      });
    },
  });

  const handleSubmit = () => {
    if (!form.name?.trim()) {
      notification({
        title: "Form Error",
        message: "Product name is required.",
        type: "danger",
      });
      return;
    }
    if (!form.category?.value) {
      notification({
        title: "Form Error",
        message: "Category is required.",
        type: "danger",
      });
      return;
    }
    if (!form.amountPerUnit) {
      notification({
        title: "Form Error",
        message: "Amount per unit is required.",
        type: "danger",
      });
      return;
    }
    if (!form.stock) {
      notification({
        title: "Form Error",
        message: "Stock quantity is required.",
        type: "danger",
      });
      return;
    }

    const formData = new FormData();
    formData.append("SellerId", sellerId);
    formData.append("Name", form.name.trim());
    formData.append("Category", form.category.value);
    formData.append("AmountPerUnit", form.amountPerUnit);
    formData.append("Stock", form.stock);
    if (uploadedFile) formData.append("Image", uploadedFile);

    mutation.mutate({
      service: "wallet-service/api/v1/",
      endpoint: isEditMode ? `inventory/${editItem.id}` : "inventory",
      method: isEditMode ? "PUT" : "POST",
      auth: true,
      multipart: true,
      body: formData,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      isCenter
      maxWidth="max-w-[500px]"
    >
      {mutation.isLoading && (
        <Loading message={isEditMode ? "Updating Item..." : "Adding Item..."} />
      )}

      <div className="w-full py-5">
        <h1 className="text-textColor ff-bold text-xl mb-1">
          {isEditMode ? "Edit Item" : "Add New Item"}
        </h1>
        <p className="text-sm text-lightText mb-6">
          {isEditMode
            ? "Update the details below"
            : "Enter your details to add"}
        </p>

        <div className="space-y-4">
          <TextInput
            name="name"
            required
            value={form.name || ""}
            onChange={handleChange}
            label="Product/Service Name*"
            placeholder="i.e Adidas Samba"
            className="w-full"
          />

          <SelectInput
            label="Category*"
            required
            value={form.category}
            onChange={(val) => handleChange(val, "select", "category")}
            options={CATEGORY_OPTIONS}
            placeholder="Select a category"
            className="w-full"
          />

          {/* Image Upload */}
          <div>
            <p className="text-sm font-medium text-textColor mb-2">Image</p>

            {/* Show existing image in edit mode when no new file selected */}
            {isEditMode &&
              editItem?.imageUrl &&
              !uploadedFile &&
              uploadProgress === null && (
                <div className="w-full border border-lightText/20 rounded-lg px-4 py-3 flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={editItem.imageUrl}
                      alt={editItem.name}
                      className="w-10 h-10 rounded-lg object-cover border border-lightText/10"
                    />
                    <p className="text-sm text-textColor">Current image</p>
                  </div>
                  <p className="text-xs text-lightText">
                    Upload below to replace
                  </p>
                </div>
              )}

            {uploadProgress !== null && uploadProgress < 100 ? (
              <div className="w-full border border-lightText/20 rounded-lg px-4 py-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-textColor">
                    Upload Progress: {uploadProgress}%
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setUploadProgress(null);
                      setUploadedFile(null);
                    }}
                    className="text-lightText hover:text-red-500 text-lg leading-none"
                  >
                    ×
                  </button>
                </div>
                <div className="w-full bg-lightText/10 rounded-full h-1.5">
                  <div
                    className="bg-primary h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            ) : uploadedFile && uploadProgress === 100 ? (
              <div className="w-full border border-lightText/20 rounded-lg px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-xs font-bold text-orange-600 uppercase">
                    {uploadedFile.name.split(".").pop()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-textColor">
                      {uploadedFile.name}
                    </p>
                    <p className="text-xs text-lightText">
                      {(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setUploadedFile(null);
                    setUploadProgress(null);
                  }}
                  className="text-lightText hover:text-red-500"
                >
                  <Image src={TrashIcon} alt="Remove" className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="w-full border-2 border-dashed border-lightText/30 rounded-lg py-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <MdOutlineUploadFile className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm text-center text-lightText">
                  <span className="text-primary underline cursor-pointer">
                    Click to upload
                  </span>{" "}
                  an image of your product
                </p>
                <p className="text-xs text-lightText/70 mt-1">
                  PNG, JPG or GIF (max. 20MB)
                </p>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          <TextInput
            name="amountPerUnit"
            value={form.amountPerUnit || ""}
            onChange={handleChange}
            label="Amount Per Unit (₦)*"
            required
            placeholder="i.e 2500"
            type="number"
            className="w-full"
          />

          <div>
            <p className="text-sm font-medium text-textColor mb-3">Quantity</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-lightText mb-2">
                  {isEditMode ? "Stock Quantity" : "Opening Quantity"}
                </p>
                <TextInput
                  name="stock"
                  value={form.stock || ""}
                  onChange={handleChange}
                  placeholder="0"
                  type="number"
                  className="w-full"
                />
              </div>
              <div>
                <p className="text-xs text-lightText mb-2">Current Quantity</p>
                <TextInput
                  name="currentQuantity"
                  value={form.stock || "0"}
                  readOnly
                  placeholder="0"
                  type="number"
                  className="w-full"
                  onChange={() => {}}
                />
                <p className="text-xs text-lightText/60 mt-1">
                  System updates automatically
                </p>
              </div>
            </div>
          </div>
        </div>

        <Button
          className="w-full mt-6 text-lg ff-bold !rounded-md mdx2:!rounded-xl"
          paddingY="p-3.5"
          onClick={handleSubmit}
          disabled={mutation.isLoading}
        >
          {isEditMode ? "Save Changes" : "Add to Inventory"}
        </Button>
      </div>
    </Modal>
  );
}
