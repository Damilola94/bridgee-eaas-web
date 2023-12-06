import React, { useState } from 'react';

import { HiOutlineCloudUpload } from 'react-icons/hi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';

import Button from '../../../inputs/Button';
import { convertImgToBase64 } from '../../../../utilities/general';
import notification from '../../../../utilities/notification';
import SelectInput, { SelectOptionType } from '../../../inputs/Select';
import { reasonOptions, proposalOptions } from '../../../../data/dispute';
import handleFetch from '../../../../services/api/handleFetch';
import Loading from '../../../common/Loading';

function OpenDispute({ onNext = () => {} }: { onNext?: () => void }) {
  const router = useRouter();

  const [reason, setReason] = useState<SelectOptionType>();
  const [proposal, setProposal] = useState<SelectOptionType>();
  const [b64FileArray, setB64FileArray] = useState<string []>([]);
  const [fileArray, setFileArray] = useState<File []>([]);

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
        const newFileArray: File [] = [...fileArray];

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
    if (!reason?.value) return 'The dispute reason is required';
    if (!proposal?.value) return 'Your proposal is required';
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
    body.append('disputeReasons', String(reason?.value));
    body.append('proposal', String(proposal?.value));

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
          <SelectInput
            value={reason}
            options={reasonOptions || []}
            onChange={(val: any) => setReason(val)}
            label="Dispute Reason"
          />
        </div>

        <div className="w-full mb-5">
          <SelectInput
            value={proposal}
            options={proposalOptions || []}
            onChange={(val: any) => setProposal(val)}
            label="Proposal"
          />
        </div>

        <div className="w-full">
          <label className="flex mb-1">Upload Evidence</label>
          <button
            onClick={handleFilesUpload}
            className="w-full flex justify-center outline-none border border-dashed rounded-lg py-2.5 bg-inputBg"
          >
            <HiOutlineCloudUpload className="w-6 h-6 text-success mr-3" />
            <span className="text-lightText font-bold mt-1">Click to upload a new document</span>
          </button>
          <p className="text-lightText">PNG, JPG, PDF, GIF.  Max. 1MB</p>
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

        <div className="w-full mb-3">
          <Button paddingY="py-3" className="w-full" onClick={handleSubmit}>Open Dispute</Button>
        </div>
      </div>
    </div>
  );
}

export default OpenDispute;
