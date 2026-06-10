import { useState, useRef } from "react";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import { MdOutlineUploadFile } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { useCookies } from "react-cookie";

import Modal from "../../../common/Modal";
import Loading from "../../../common/Loading";
import Button from "../../../inputs/Button";

import handleFetch from "../../../../services/api/handleFetch";
import notification from "../../../../utilities/notification";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function BulkUploadModal({ isOpen, onClose, onSuccess }: Props) {
  const [cookie] = useCookies(["data"]);
  const queryClient = useQueryClient();
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownloadTemplate = async () => {
    setIsDownloading(true);
    try {
      const res = await handleFetch({
        service: "wallet-service/api/v1/",
        endpoint: "inventory/bulk-template",
        method: "GET",
        auth: true,
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(res);
      const link = document.createElement("a");
      link.href = url;
      link.download = "inventory-template.xlsx";
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      notification({
        title: "Download Failed",
        message: err?.toString() || "Could not download template.",
        type: "danger",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const bulkMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      notification({
        message: res?.message || "Items uploaded successfully",
        type: "success",
      });
      queryClient.invalidateQueries(["inventory"]);
      setBulkFile(null);
      onSuccess();
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Upload failed.",
        type: "danger",
      });
    },
  });

  const handleBulkSubmit = () => {
    if (!bulkFile) {
      notification({
        title: "Missing File",
        message: "Please upload a completed template.",
        type: "danger",
      });
      return;
    }

    const formData = new FormData();
    formData.append("SellerId", cookie?.data?.userId ?? "");
    formData.append("File", bulkFile); // capital F to match API

    bulkMutation.mutate({
      service: "wallet-service/api/v1/",
      endpoint: "inventory/bulk-upload",
      method: "POST",
      auth: true,
      multipart: true,
      body: formData,
    });
  };

  const handleClose = () => {
    setBulkFile(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCenter maxWidth="max-w-[500px]">
      {bulkMutation.isLoading && <Loading message="Uploading Items..." />}

      <div className="w-full py-5">
        <h1 className="text-textColor ff-bold text-xl mb-1">Bulk Upload Items</h1>
        <p className="text-sm text-lightText mb-6">
          Download the template, fill in item details, and upload the completed file.
        </p>

        {/* Download Template */}
        <button
          type="button"
          onClick={handleDownloadTemplate}
          disabled={isDownloading}
          className="w-full flex items-center gap-4 p-4 border-2 border-lightText/20 rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all mb-5 text-left disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <HiOutlineDocumentArrowDown className={`w-5 h-5 text-primary ${isDownloading ? "animate-bounce" : ""}`} />
          </div>
          <div>
            <p className="font-semibold text-textColor text-sm">
              {isDownloading ? "Downloading..." : "Download Template"}
            </p>
            <p className="text-xs text-lightText">Get the Excel template to fill in item details</p>
          </div>
        </button>

        {/* Upload Area */}
        <div className="mb-6">
          <p className="text-sm font-medium text-textColor mb-2">
            Upload Completed Template
          </p>
          <label className="w-full border-2 border-dashed border-lightText/30 rounded-xl py-8 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <MdOutlineUploadFile className="w-6 h-6 text-primary" />
            </div>
            {bulkFile ? (
              <div className="text-center">
                <p className="text-sm font-medium text-textColor">{bulkFile.name}</p>
                <p className="text-xs text-lightText mt-1">
                  {(bulkFile.size / 1024).toFixed(1)} KB
                </p>
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); setBulkFile(null); }}
                  className="text-xs text-red-500 hover:underline mt-1"
                >
                  Remove
                </button>
              </div>
            ) : (
              <p className="text-sm text-lightText text-center px-4">
                <span className="text-primary underline">Click to upload</span> the completed
                template here
                <br />
                <span className="text-xs text-lightText/60 mt-1 block">.xlsx or .xls</span>
              </p>
            )}
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".xlsx,.xls"
              onChange={(e) => setBulkFile(e.target.files?.[0] || null)}
            />
          </label>
        </div>

        <Button
          className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl"
          paddingY="p-3.5"
          onClick={handleBulkSubmit}
          disabled={bulkMutation.isLoading || !bulkFile}
        >
          Add to Inventory
        </Button>
      </div>
    </Modal>
  );
}
