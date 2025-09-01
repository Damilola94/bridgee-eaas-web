// import React, { useState } from 'react';

// import { CopyToClipboard } from 'react-copy-to-clipboard';
// import { RiFileCopyLine } from 'react-icons/ri';
// import { GiProcessor } from "react-icons/gi";

// import InflowArrow from '../../../../assets/svg-tsx/InflowArrow';
// import OutflowArrow from '../../../../assets/svg-tsx/OutflowArrow';

// import { useAccountsContext } from '../../../../context/Accounts';
// import { TransactionProps } from '../../../../types/transaction';
// import { formatDateTime } from '../../../../utilities/dateTime';
// import { formatChannel, formatCurrency } from '../../../../utilities/general';

// import Modal from '../../../common/Modal';
// import TransactionStatus from '../../../common/TransactionStatus';
// import Button from '../../../inputs/Button';

// import GenerateReceipt from './GenerateReceipt';

// function TransactionDetails({ data, onClose }: { data: TransactionProps, onClose: () => void }) {
//   const { accounts } = useAccountsContext();
//   const [copiedAccountNo, setCopiedAccountNo] = useState(false);
//   const [showReceipt, setShowReceipt] = useState(false);

//   return (
//     <Modal isOpen onClose={onClose}>
//       <h2 className="text-2xl ff-bold font-bold mt-3">Transaction Details</h2>
//       <div className="w-full py-5">
//         <div className="text-center mb-7">
//           <span className={`inline-block ${data?.type === 'credit' ? 'bg-success/10' : 'bg-error/10'} p-3 rounded-full mb-4`}>
//             {data?.type === 'credit'
//               ? <InflowArrow className="w-5 h-5" color="#03543F" />
//               : <OutflowArrow className="w-5 h-5" color="#EB4336" />}
//           </span>
//           <h2 className="text-primary text-3xl sm:text-[40px] ff-bold mb-5">
//             {formatCurrency(data?.amount, true, accounts?.defaultWallets?.[0]?.currency?.code)}
//           </h2>
//           <div className="">
//             <p className="text-sm text-lightText mb-1">Transaction Reference:</p>
//             <p className="text-lg text-[#2C3341] flex items-center justify-center min-w-max">
//               <span className="mr-2">{data?.transactionReference}</span>
//               {copiedAccountNo
//                 ? <span className="text-[#9CA3AF] text-sm">Copied</span>
//                 : (
//                   <CopyToClipboard
//                     text={accounts?.defaultWallets?.[0]?.virtualAccount}
//                     onCopy={() => setCopiedAccountNo(true)}
//                   >
//                     <RiFileCopyLine className="text-primary cursor-pointer mb-1" />
//                   </CopyToClipboard>
//                 )}
//             </p>
//           </div>
//         </div>

//         <div className="w-full xs:border-t pt-7">
//           <div className="flex flex-wrap -mx-3">
//             <div className="w-full xs:w-1/2 sm:w-1/3 px-3 py-5 xs:py-3 border-b xs:border-b-0">
//               <div className="w-full flex items-center justify-between xs:block">
//                 <p className="text-sm sm:text-lg text-[#91979D] min-w-max">Transaction Channel</p>
//                 <p className="text-sm sm:text-base ff-bold">{formatChannel(data?.channel)}</p>
//               </div>
//             </div>
//             <div className="w-full xs:w-1/2 sm:w-1/3 px-3 py-5 xs:py-3 border-b xs:border-b-0">
//               <div className="w-full flex items-center justify-between xs:block">
//                 <p className="text-sm sm:text-lg text-[#91979D] min-w-max mb-1">Status</p>
//                 <TransactionStatus status={data?.status} />
//               </div>
//             </div>
//             <div className="w-full xs:w-1/2 sm:w-1/3 px-3 py-5 xs:py-3 border-b xs:border-b-0">
//               <div className="w-full flex items-center justify-between xs:block">
//                 <p className="text-sm sm:text-lg text-[#91979D] min-w-max">Transaction Type</p>
//                 <p className="capitalize text-sm sm:text-base ff-bold">{data?.type}</p>
//               </div>
//             </div>
//             <div className="w-full xs:w-1/2 sm:w-1/3 px-3 py-5 xs:py-3 border-b xs:border-b-0">
//               <div className="w-full flex items-center justify-between xs:block">
//                 <p className="text-sm sm:text-lg text-[#91979D] min-w-max">Transaction Description:</p>
//                 <p className="capitalize text-sm sm:text-base ff-bold text-right xs:text-left">{data?.description}</p>
//               </div>
//             </div>
//             <div className="w-full xs:w-1/2 sm:w-1/3 px-3 py-5 xs:py-3 border-b xs:border-b-0">
//               <div className="w-full flex items-center justify-between xs:block">
//                 <p className="text-sm sm:text-lg text-[#91979D] min-w-max">Date</p>
//                 <p className="text-sm sm:text-base ff-bold">{formatDateTime(data?.date)}</p>
//               </div>
//             </div>
//             <div className="w-full xs:w-1/2 sm:w-1/3 px-3 py-5 xs:py-3">
//               <div className="w-full flex items-center justify-between xs:block">
//                 <p className="text-sm sm:text-lg text-[#91979D] min-w-max">Transaction Fee</p>
//                 <p className="capitalize text-sm sm:text-base ff-bold">
//                   {formatCurrency(data?.fee || 0, true, accounts?.defaultWallets?.[0]?.currency?.code)}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="w-full mt-5 flex justify-center">
//           <Button
//             border
//             onClick={() => setShowReceipt(true)}
//             borderColor="border-success"
//             bgColor="bg-white"
//             textColor="text-success"
//           >
//             <GiProcessor className="mr-2 w-6 h-6" />
//             Generate Receipt
//           </Button>
//         </div>
//       </div>

//       {showReceipt && <GenerateReceipt data={data} onClose={() => setShowReceipt(false)} />}
//     </Modal>
//   );
// }

// export default TransactionDetails;

/* eslint-disable no-constant-condition */
"use client";

import { useState, ReactNode } from "react";
import { Copy } from "lucide-react";
import { BiDownload } from "react-icons/bi";

import TransactionStatus from '../../../common/TransactionStatus';

import Modal from "../../../common/Modal";
import Button from "../../../inputs/Button";
import InflowArrow from "../../../../assets/svg-tsx/InflowArrow";

type Props = {
  onClose: () => void;
  transactionData?: {
    amount: string;
    reference: string;
    channel: string;
    status: string;
    type: string;
    description: string;
    date: string;
    fee: string;
  };
};

function TransactionDetails({ onClose, transactionData }: Props) {
  const [copiedRef, setCopiedRef] = useState(false);

  const defaultData = {
    amount: "NGN 3,500.00",
    reference: "BROFD8J8364803953828J2842",
    channel: "Escrow",
    status: "Processing",
    type: "Debit",
    description: "Amount deposited into escrow order: 829402",
    date: "Jan 24, 2023, 04:58 PM",
    fee: "NGN 500"
  };

  const data = transactionData || defaultData;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  return (
    <Modal isOpen onClose={onClose} maxWidth="max-w-[400px]">
      <div className="w-full py-5">

        <h1 className="w-full text-textColor ff-bold text-xl mb-6  text-center">Transaction Details</h1>

        <div className="flex items-center justify-center mb-2">
          <div className="flex items-center space-x-3">
            <span className={`w-8 h-8 bg-success/10 p-2 rounded-full`}>
              <InflowArrow className="w-4 h-4" color="#EB4336" />
            </span>
            <span className="capitalize">Inflow</span>
          </div>

        </div>

        <div className="text-3xl font-bold text-primary text-center mb-4 ff-bold">
          {data.amount}
        </div>

        <div className="text-sm text-gray-600 text-center mb-1 ff-bold">
          Transaction Reference:
        </div>
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-sm font-mono">{data.reference}</span>
          <button
            onClick={() => copyToClipboard(data.reference)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Copy className="w-4 h-4 text-gray-500" />
          </button>
          {copiedRef && (
            <span className="text-xs text-green-600">Copied!</span>
          )}
        </div>

        <div className="space-y-6 mb-6">
          <Row label="Transaction channel" value={data.channel} />
          <Row
            label="Status"
            value={<TransactionStatus status={data?.status} />}
            valueClass="text-green-600"
          />
          <Row label="Transaction Type" value={data.type} />
          <Row
            label="Description"
            value={data.description}
            wrap
          />
          <Row label="Date" value={data.date} />
          <Row label="Transaction Fee" value={data.fee} />
        </div>

        <Button
          onClick={onClose}
          className="w-full bg-white text-success hover:bg-pink-100 border border-success"
          icon={<BiDownload className="ml-2" />}
        >
          Download Receipt
        </Button>
      </div>
    </Modal>
  );
}

export default TransactionDetails;

const Row = ({
  label,
  value,
  wrap,
  valueClass = ""
}: {
  label: string;
  value: string | ReactNode;
  wrap?: boolean;
  valueClass?: string;
}) => (
  <div className="flex ff- justify-between items-start">
    <span className="text-sm text-gray-600">{label}</span>
    <span
      className={`text-sm font-medium text-right ${wrap ? "max-w-[200px]" : ""
      } ${valueClass}`}
    >
      {value}
    </span>
  </div>
);
