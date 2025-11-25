import React, { useState } from 'react';

import { HiOutlineCloudUpload } from 'react-icons/hi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';

import Button from '../../../inputs/Button';
import { convertImgToBase64 } from '../../../../utilities/general';
import notification from '../../../../utilities/notification';
// import { SelectOptionType } from '../../../inputs/Select';
// import { proposalOptions } from '../../../../data/dispute';
import handleFetch from '../../../../services/api/handleFetch';
import Loading from '../../../common/Loading';
import TextareaInput from "../../../inputs/Textarea";
import { useCreateInvoiceContext } from '../../../../context/CreateInvoice';

function OpenDispute({ onNext = () => { } }: { onNext?: () => void }) {
  const router = useRouter();
  const [b64FileArray, setB64FileArray] = useState<string[]>([]);
  const [fileArray, setFileArray] = useState<File[]>([]);
  const { form, setForm } = useCreateInvoiceContext();

  const queryClient = useQueryClient();
  const disputeMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      queryClient.invalidateQueries(['escrow-details']);
      notification({
        title: 'Successful',
        message: res?.message || 'Dispute opened successfully',
        type: 'success'
      });
      onNext();
    },
    onError: (err: any) => {
      notification({
        title: 'Error',
        message: err?.toString() || 'Something went wrong.',
        type: 'danger'
      });
    }
  });

  const handleChange = (val: any, inputType = "input", inputName = "") => {
    if (typeof val === "object" && val.target) {
      const {
        value, name, type, files
      } = val.target;

      // Check if this is a recipient field
      if (
        name === "recipientName" ||
        name === "email" ||
        name === "phoneNumber"
      ) {
        setForm((state) => ({
          ...state,
          recipientDetails: {
            ...state.recipientDetails,
            [name]: value
          }
        }));
        return;
      }

      // Handle file inputs
      if (type === "file") {
        setForm((state) => ({
          ...state,
          [name]: files?.length > 1 ? Array.from(files) : files?.[0]
        }));
        return;
      }

      // Handle regular inputs
      setForm((state) => ({ ...state, [name]: value }));
    } else {
      // Handle select changes and other custom cases
      setForm((state) => ({ ...state, [inputName]: val }));
    }
  };

  const handleFilesUpload = () => {
    const uploadField = document.getElementById('image-upload') as HTMLInputElement;

    uploadField?.click();
    uploadField.onchange = async () => {
      if (!uploadField?.files?.[0]) return;
      const { type, size } = uploadField?.files[0] || {};

      const supportedTypes = [
        'jpeg', 'png', 'gif', 'pdf',
        'vnd.openxmlformats-officedocument.wordprocessingml.document', 'doc'
      ];
      const fileType = type.slice(type.indexOf('/') + 1);

      if (b64FileArray?.length > 4) {
        notification({
          title: 'File Limit Exceeded',
          message: 'You can only upload maximum of 5 documents for an idea.',
          type: 'danger'
        });
        return;
      }
      if (!supportedTypes.includes(fileType)) {
        notification({
          title: 'Invalid File Type',
          message: `Invalid file format.
           Supported file types are pdf, docx, doc, jpeg, png and gif`,
          type: 'danger'
        });
        return;
      }
      if (size / 1024 > 1000) {
        notification({
          title: 'File Too Large',
          message: 'The file size must not be more than 1MB',
          type: 'danger'
        });
        return;
      }

      try {
        const fileBase64: string = await convertImgToBase64(uploadField?.files[0]);
        const b64FileSet = new Set<string>(b64FileArray);
        const setSize = b64FileSet.size;
        const newFileArray: File[] = [...fileArray];

        b64FileSet.add(fileBase64);

        if (setSize < b64FileSet.size) {
          newFileArray.push(uploadField?.files?.[0]);
        }

        setFileArray(newFileArray);
        setB64FileArray([...b64FileSet]);
      } catch (err) {
        notification({ title: 'Upload Error', message: String(err), type: 'danger' });
      }
    };
  };

  const handleFileDelete = (index: number) => {
    const newB64list = b64FileArray.filter((val, i) => i !== index);
    const newFileArray = fileArray.filter((val, i) => i !== index);

    setFileArray(newFileArray);
    setB64FileArray(newB64list);
  };

  const validateForm = () => {
    // if (!reason?.value) return 'The dispute reason is required';
    // if (!proposal?.value) return 'Your proposal is required';
    return null;
  };

  const handleSubmit = () => {
    const error = validateForm();

    if (error) {
      notification({ title: 'Form Error', message: error, type: 'danger' });
      return;
    }

    const body = new FormData();

    body.append('invoiceId', String(router?.query?.slug));
    // body.append('disputeReasons', String(reason?.value));
    // body.append('proposal', String(proposal?.value));

    fileArray.forEach((file: File) => {
      body.append('evidence', file);
    });

    disputeMutation.mutate({
      endpoint: 'dispute', extra: 'open-dispute', body, method: 'POST', auth: true, multipart: true
    });
  };

  const { isLoading } = disputeMutation;

  return (
    <div>
      {isLoading && <Loading />}

      <div className="w-full bg-white px-10 py-8 rounded-lg shadow-md">
        <div className="w-full mb-6">
          <h3 className="font-bold text-xl ff-bold mb-2">Open Dispute</h3>
        </div>

        <div className="w-full mb-5">
          <p className="text-base mb-1">
            Short Description</p>
          <TextareaInput
            rows={5}
            name="Short Description"
            className="mb-5"
            placeholder='Type in a short description'
            value={form?.description}
            onChange={handleChange}
            required
            onBlur={() => {
              if (!form?.description?.trim()) {
                notification({
                  title: "Form Error",
                  message: "Description is required",
                  type: "danger"
                });
              }
            }}
          />
        </div>
        <div className="w-full mb-5">
          <label className="flex mb-1">Upload picture</label>
          <button
            onClick={handleFilesUpload}
            className="w-full flex justify-center outline-none border border-dashed rounded-lg py-2.5 bg-inputBg"
          >
            <HiOutlineCloudUpload className="w-6 h-6 text-success mr-3" />
            <span className="text-lightText font-bold mt-1">Click to upload or drag and drop</span>
          </button>
          <p className="text-lightText">PNG, JPG, PDF, GIF.  Max. 1MB</p>
          <input type="file" hidden id="image-upload" />
        </div>
        <div className="w-full mb-5">
          <label className="flex mb-1">Upload video</label>
          <button
            onClick={handleFilesUpload}
            className="w-full flex justify-center outline-none border border-dashed rounded-lg py-2.5 bg-inputBg"
          >
            <HiOutlineCloudUpload className="w-6 h-6 text-success mr-3" />
            <span className="text-lightText font-bold mt-1">Click to upload or drag and drop</span>
          </button>
          <p className="text-lightText">MP4 only -  Max size: 5MB</p>
          <input type="file" hidden id="image-upload" />
        </div>
        <div className="mb-10">
          {fileArray?.map((file: any, i) => (
            <div className="flex items-center mt-2" key={file?.name}>
              <a
                className="underline flex text-sm text-blue-400 mr-3"
                href={b64FileArray[i]}
                download
              >
                {file?.name}
              </a>
              <RiDeleteBin5Line className="w-5 h-auto cursor-pointer" onClick={() => handleFileDelete(i)} />
            </div>
          ))}
        </div>

        <div className="w-full flex space-x-3">
          <Button paddingY="py-3" className="w-full"
            border
            borderColor="border-success"
            fontSize="text-sm"
            bgColor="bg-transparent"
            textColor="text-success"
            paddingX="px-8"
            onClick={handleSubmit}>Cancel</Button>
          <Button paddingY="py-3" className="w-full bg-blue" onClick={handleSubmit}>Proceed</Button>
        </div>
      </div>
    </div>
  );
}

export default OpenDispute;
