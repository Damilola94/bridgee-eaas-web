import React, { useState } from 'react';

import { FaCheck } from 'react-icons/fa';
import { HiOutlineCloudUpload } from 'react-icons/hi';
import { RiDeleteBin5Line } from 'react-icons/ri';

import Button from '../../../inputs/Button';
import { convertImgToBase64 } from '../../../../utilities/general';
import notification from '../../../../utilities/notification';
import SelectInput, { SelectOptionType } from '../../../inputs/Select';

const requestOptions = [
  {
    value: 'refund',
    header: 'Refund',
    desc: 'An escrow transaction involving just two parties/entities (buyer and seller).'
  },
  {
    value: 'replace-goods',
    header: 'Replace Goods',
    desc: 'An escrow transaction involving just two parties/entities (buyer and seller).'
  }
];

const reasonOptions = [
  { label: 'Non-Conformance to Description', value: 'Non-Conformance to Description' },
  { label: 'Counterfeit or Fraudulent Items', value: 'Counterfeit or Fraudulent Items' },
  { label: 'Damaged or Defective Goods', value: 'Damaged or Defective Goods' },
  { label: 'Incomplete or Missing Deliverables', value: 'Incomplete or Missing Deliverables' },
  { label: 'Delivery to Wrong Address', value: 'Delivery to Wrong Address' },
  { label: 'Disputed Inspection Results', value: 'Disputed Inspection Results' }
];

function OpenDispute({ onNext = () => {} }: { onNext?: () => void }) {
  const [request, setRequest] = useState('refund');
  const [reason, setReason] = useState<SelectOptionType>();
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
    <div>
      <div className="w-full bg-white px-10 py-8 rounded-lg shadow-md">
        <div className="w-full mb-6">
          <h3 className="font-bold text-xl ff-bold mb-2">Open Dispute</h3>
        </div>

        <div className="w-full mb-8">
          <SelectInput
            name="reason"
            value={reason}
            options={reasonOptions}
            onChange={(val: any) => setReason(val)}
            label="Dispute Reason"
            className=""
          />
        </div>

        <div className="w-full mb-6">
          <h3 className="">Proposal</h3>

          <div className="w-full">
            <div className="flex flex-wrap -mx-2">
              {requestOptions.map((item) => (
                <div className="w-full sm:w-1/2 px-2 py-1" key={item?.value}>
                  <div
                    role="presentation"
                    onClick={() => setRequest(item?.value)}
                    className={`w-full h-full rounded-lg ${request === item?.value
                      ? 'border-success border-2' : 'border'} bg-secondary p-5 cursor-pointer`}
                  >
                    <div className="w-full relative">
                      <span
                        className={`rounded-full inline-block ${request === item?.value
                          ? 'bg-primary' : 'bg-gray-400'} p-1 w-5 h-5 absolute right-0`}
                      >
                        <FaCheck className="text-white w-3 h-3" />
                      </span>
                      <h3 className="text-base ff-bold font-bold mb-2 pr-6">{item?.header}</h3>
                      <p className="">{item?.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
          <Button paddingY="py-3" className="w-full" onClick={onNext}>Open Dispute</Button>
        </div>
      </div>
    </div>
  );
}

export default OpenDispute;
