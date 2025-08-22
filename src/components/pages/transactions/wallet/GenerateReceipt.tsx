import React from 'react';

import { BiDownload } from 'react-icons/bi';
import generatePDF, { Resolution, Margin, Options } from "react-to-pdf";

import { useAccountsContext } from '../../../../context/Accounts';
import { TransactionProps } from '../../../../types/transaction';
import { formatDateTime } from '../../../../utilities/dateTime';
import { formatChannel, formatCurrency } from '../../../../utilities/general';

import Modal from '../../../common/Modal';
import Button from '../../../inputs/Button';

const options: Options = {
  filename: "transaction-details.pdf",
  method: "save",
  resolution: Resolution.NORMAL,
  page: {
    margin: Margin.MEDIUM,
    format: "A6"
  }
};

function GenerateReceipt({ data, onClose }: { data: TransactionProps, onClose: () => void }) {
  const { accounts } = useAccountsContext();

  const openPDF = () => {
    generatePDF(() => document.getElementById("wrapper"), options);
  };

  return (
    <Modal isOpen onClose={onClose} maxWidth="max-w-[400px]">
      <div className="w-full pt-5" id="wrapper">
        <div className="text-center mb-7">
          <h2 className="text-primary text-3xl ff-bold mb-5">
            {formatCurrency(data?.amount, true, accounts?.defaultWallets?.[0]?.currency?.code)}
          </h2>
          <div className="">
            <p className="text-sm text-lightText mb-1">Transaction Reference:</p>
            <p className="text-lg text-[#2C3341] flex items-center justify-center min-w-max">
              {data?.transactionReference}
            </p>
          </div>
        </div>

        <div className="w-full pt-7">
          <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3 py-5 border-b">
              <div className="w-full flex items-center justify-between">
                <p className="text-sm text-[#91979D] min-w-max">Transaction Channel</p>
                <p className="text-sm ff-bold">{formatChannel(data?.channel)}</p>
              </div>
            </div>
            <div className="w-full px-3 py-5 border-b">
              <div className="w-full flex items-center justify-between">
                <p className="text-sm text-[#91979D] min-w-max mb-1">Status</p>
                <p className="capitalize text-sm ff-bold">{data?.status}</p>
              </div>
            </div>
            <div className="w-full px-3 py-5 border-b">
              <div className="w-full flex items-center justify-between">
                <p className="text-sm text-[#91979D] min-w-max">Transaction Type</p>
                <p className="capitalize text-sm ff-bold">{data?.type}</p>
              </div>
            </div>
            <div className="w-full px-3 py-5 border-b">
              <div className="w-full flex items-center justify-between">
                <p className="text-sm text-[#91979D] min-w-max">Transaction Description:</p>
                <p className="capitalize text-sm ff-bold text-right">{data?.description}</p>
              </div>
            </div>
            <div className="w-full px-3 py-5 border-b">
              <div className="w-full flex items-center justify-between">
                <p className="text-sm text-[#91979D] min-w-max">Date</p>
                <p className="text-sm ff-bold">{formatDateTime(data?.date)}</p>
              </div>
            </div>
            <div className="w-full px-3 py-5">
              <div className="w-full flex items-center justify-between">
                <p className="text-sm text-[#91979D] min-w-max">Transaction Fee</p>
                <p className="capitalize text-sm ff-bold">
                  {formatCurrency(data?.fee || 0, true, accounts?.defaultWallets?.[0]?.currency?.code)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full my-5 flex justify-center">
        <Button
          border
          onClick={openPDF}
          borderColor="border-success"
          bgColor="bg-white"
          textColor="text-success"
        >
          <BiDownload className="mr-2" />
          Download Receipt
        </Button>
      </div>
    </Modal>
  );
}

export default GenerateReceipt;

