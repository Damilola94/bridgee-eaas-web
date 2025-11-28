"use client";

import { useState } from "react";
import { HiOutlineCloudUpload } from "react-icons/hi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useMutation, useQueryClient } from "react-query";

import Loading from "../../../common/Loading";
import Button from "../../../inputs/Button";
import notification from "../../../../utilities/notification";
import TextareaInput from "../../../inputs/Textarea";
import handleFetch from "../../../../services/api/handleFetch";
import { convertImgToBase64 } from "../../../../utilities/general";

interface DisputeResponseProps {
  openDispute?: boolean
  disputeId?: string
  isResponse?: boolean
  onClose?: () => void
}

export default function DisputeResponse({
  openDispute = false,
  disputeId,
  isResponse = false,
  onClose
}: DisputeResponseProps) {
  const queryClient = useQueryClient();

  const [b64FileArray, setB64FileArray] = useState<string[]>([]);
  const [fileArray, setFileArray] = useState<File[]>([]);
  const [description, setDescription] = useState<string>("");

  const mutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      queryClient.invalidateQueries(["dispute-details", disputeId]);
      notification({
        title: "Successful",
        message: res?.message || (isResponse ? "Dispute responded successfully" : "Dispute opened successfully"),
        type: "success"
      });
      setDescription("");
      setB64FileArray([]);
      setFileArray([]);
      onClose?.();
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: String(err) || "Something went wrong.",
        type: "danger"
      });
    }
  });

  const handleFilesUpload = () => {
    const uploadField = document.getElementById("image-upload") as HTMLInputElement;
    uploadField?.click();
    uploadField.onchange = async () => {
      if (!uploadField?.files?.[0]) return;
      const file = uploadField.files[0];
      const { type, size } = file;
      const fileType = type.slice(type.indexOf("/") + 1);

      const supportedTypes = [
        "jpeg",
        "png",
        "gif",
        "pdf",
        "vnd.openxmlformats-officedocument.wordprocessingml.document",
        "doc",
        "mp4"
      ];
      if (b64FileArray.length >= 5) {
        notification({
          title: "File Limit Exceeded",
          message: "You can only upload a maximum of 5 documents",
          type: "danger"
        });
        return;
      }
      if (!supportedTypes.includes(fileType)) {
        notification({
          title: "Invalid File Type",
          message: "Supported files: pdf, docx, doc, jpeg, png, gif, mp4",
          type: "danger"
        });
        return;
      }
      if (size / 1024 > 10000) {
        notification({
          title: "File Too Large",
          message: "The file size must not be more than 10MB",
          type: "danger"
        });
        return;
      }

      try {
        const base64 = await convertImgToBase64(file);
        if (!b64FileArray.includes(base64)) {
          setFileArray((s) => [...s, file]);
          setB64FileArray((s) => [...s, base64]);
        }
      } catch (err) {
        notification({
          title: "Upload Error",
          message: String(err),
          type: "danger"
        });
      }
    };
  };

  const handleFileDelete = (index: number) => {
    setFileArray((prev) => prev.filter((_, i) => i !== index));
    setB64FileArray((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    if (isResponse && !description?.trim()) {
      return "The dispute response description is required";
    }
    if (!isResponse && !description?.trim()) {
      return "The dispute description is required";
    }
    return null;
  };

  const handleSubmit = () => {
    const v = validateForm();
    if (v) {
      notification({
        title: "Form Error",
        message: v,
        type: "danger"
      });
      return;
    }

    if (isResponse && disputeId) {
      const payload = {
        SellerResponse: description,
        EvidenceFiles: b64FileArray,
        AcceptClaim: false
      };

      mutation.mutate({
        endpoint: `wallet-service/api/v1/disputes/${disputeId}/respond`,
        method: "POST",
        body: payload,
        auth: true
      });
    } else {
      const payload = {
        escrowOrderId: disputeId,
        description,
        pictureProofs: b64FileArray.filter((b) => !b.startsWith("data:video")),
        videoProofs: b64FileArray.filter((b) => b.startsWith("data:video"))
      };
      mutation.mutate({
        endpoint: "wallet-service/api/v1/disputes",
        method: "POST",
        body: payload,
        auth: true
      });
    }
  };

  if (!openDispute) return null;

  return (
    <div>
      {mutation.isLoading && <Loading />}

      <div className="w-full bg-white px-10 py-8 rounded-lg shadow-md">
        <div className="w-full mb-6">
          <h3 className="font-bold text-xl ff-bold mb-2">{isResponse ? "Respond to Dispute" : "Open Dispute"}</h3>
        </div>
        <div className="w-full mb-5">
          <p className="text-base mb-1">{isResponse ? "Seller Comment" : "Short Description"}</p>
          <TextareaInput
            rows={5}
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
            placeholder={isResponse ? "Provide your response and explanation" : "Type in a short description"}
          />
        </div>

        <div className="w-full mb-5">
          <label className="flex mb-1">Upload picture / video / document</label>
          <button
            onClick={handleFilesUpload}
            className="w-full flex justify-center outline-none border border-dashed rounded-lg py-2.5 bg-inputBg"
          >
            <HiOutlineCloudUpload className="w-6 h-6 text-success mr-3" />
            <span className="text-lightText font-bold mt-1">Click to upload or drag and drop</span>
          </button>
          <p className="text-lightText">PNG, JPG, PDF, GIF, MP4. Max. 5MB</p>
          <input type="file" hidden id="image-upload" />
        </div>

        <div className="mb-10">
          {fileArray.map((file, i) => (
            <div className="flex items-center mt-2" key={file.name + i}>
              <a className="underline flex text-sm text-blue-400 mr-3" href={b64FileArray[i]} download>
                {file.name}
              </a>
              <RiDeleteBin5Line className="w-5 h-auto cursor-pointer" onClick={() => handleFileDelete(i)} />
            </div>
          ))}
        </div>

        <div className="w-full flex space-x-3">
          <Button
            paddingY="py-3"
            className="w-full"
            border
            borderColor="border-success"
            fontSize="text-sm"
            bgColor="bg-transparent"
            textColor="text-success"
            paddingX="px-8"
            onClick={() => {
              setDescription("");
              setB64FileArray([]);
              setFileArray([]);
              onClose?.();
            }}
          >
            Cancel
          </Button>
          <Button paddingY="py-3" className="w-full bg-blue" onClick={handleSubmit}>
            {isResponse ? "Submit Response" : "Proceed"}
          </Button>
        </div>
      </div>
    </div>
  );
}
