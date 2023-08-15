import React, { useState } from 'react';

import { HiOutlineCloudUpload } from 'react-icons/hi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { convertImgToBase64 } from '../../../../utilities/general';
import notification from '../../../../utilities/notification';

import Button from '../../../inputs/Button';
import SelectInput from '../../../inputs/Select';
import TextareaInput from '../../../inputs/Textarea';

const proposalOptions = [
  { label: 'Refund', value: 'refund' },
  { label: 'Replace order', value: 'replace' },
  { label: 'Ship additional item', value: 'ship-additional' },
  { label: 'Full refund with return of order', value: 'refund-and-return' }
];

function NewProposalForm({ onClose }: { onClose: () => void }) {
  const [proposal, setProposal] = useState('');
  const [b64FileArray, setB64FileArray] = useState<string []>([]);
  const [fileArray, setFileArray] = useState<File []>([]);

  const handleFilesUpload = () => {
    const uploadField = document.getElementById('image-upload') as HTMLInputElement;

    uploadField?.click();
    uploadField.onchange = async () => {
      if (!uploadField?.files?.[0]) return;
      const { type, size } = uploadField?.files[0];

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

  return (
    <div className="w-full">
      <p className="text-base mb-1">Comment</p>

      <TextareaInput
        rows={3}
        className="mb-5"
        value={proposal}
        onChange={(e) => setProposal(e.target.value)}
      />

      <SelectInput label='New Proposal' className="mb-7" options={proposalOptions} />

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
      <div className="mb-8">
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
        <Button paddingY="py-2" className="">Send Proposal</Button>
        <Button
          onClick={onClose}
          paddingY="py-2" className="" border borderColor="border-error" textColor="text-error" bgColor="bg-white"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default NewProposalForm;
