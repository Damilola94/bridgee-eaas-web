import React, { useState } from 'react';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { RiFileCopyLine } from 'react-icons/ri';
import { BiDownload } from 'react-icons/bi';

import InflowArrow from '../../../../assets/svg-tsx/InflowArrow';
import OutflowArrow from '../../../../assets/svg-tsx/OutflowArrow';

import { useAccountsContext } from '../../../../context/Accounts';
import { TransactionProps } from '../../../../types/transaction';
import { formatDateTime } from '../../../../utilities/dateTime';
import { formatChannel, formatCurrency } from '../../../../utilities/general';

import Modal from '../../../common/Modal';
import TransactionStatus from '../../../common/TransactionStatus';
import Button from '../../../inputs/Button';

function TransactionDetails({ data, onClose }: { data: TransactionProps, onClose: () => void }) {
  const { accounts } = useAccountsContext();
  const [copiedAccountNo, setCopiedAccountNo] = useState(false);

  return (
    <Modal isOpen onClose={onClose}>
      <h2 className="text-2xl ff-bold font-bold mt-3">Transaction Details</h2>
      <div className="w-full py-5">
        <div className="text-center mb-7">
          <span className={`inline-block ${data?.type === 'credit' ? 'bg-success/10' : 'bg-error/10'} p-3 rounded-full mb-4`}>
            {data?.type === 'credit'
              ? <InflowArrow className="w-5 h-5" color="#03543F" />
              : <OutflowArrow className="w-5 h-5" color="#EB4336" />
            }
          </span>
          <h2 className="text-primary text-3xl sm:text-[40px] ff-bold mb-5">
            {formatCurrency(data?.amount, true, accounts?.defaultWallets?.[0]?.currency?.code)}
          </h2>
          <div className="">
            <p className="text-sm text-lightText mb-1">Transaction Reference:</p>
            <p className="text-lg text-[#2C3341] flex items-center justify-center min-w-max">
              <span className="mr-2">{data?.transactionReference}</span>
              {copiedAccountNo
                ? <span className="text-[#9CA3AF] text-sm">Copied</span>
                : (
                  <CopyToClipboard
                    text={accounts?.defaultWallets?.[0]?.virtualAccount}
                    onCopy={() => setCopiedAccountNo(true)}
                  >
                    <RiFileCopyLine className="text-primary cursor-pointer mb-1" />
                  </CopyToClipboard>
                )}
            </p>
          </div>
        </div>

        <div className="w-full xs:border-t pt-7">
          <div className="flex flex-wrap -mx-3">
            <div className="w-full xs:w-1/2 sm:w-1/3 px-3 py-5 xs:py-3 border-b xs:border-b-0">
              <div className="w-full flex items-center justify-between xs:block">
                <p className="text-sm sm:text-lg text-[#91979D] min-w-max">Transaction Channel</p>
                <p className="text-sm sm:text-base ff-bold">{formatChannel(data?.channel)}</p>
              </div>
            </div>
            <div className="w-full xs:w-1/2 sm:w-1/3 px-3 py-5 xs:py-3 border-b xs:border-b-0">
              <div className="w-full flex items-center justify-between xs:block">
                <p className="text-sm sm:text-lg text-[#91979D] min-w-max mb-1">Status</p>
                <TransactionStatus status={data?.status} />
              </div>
            </div>
            <div className="w-full xs:w-1/2 sm:w-1/3 px-3 py-5 xs:py-3 border-b xs:border-b-0">
              <div className="w-full flex items-center justify-between xs:block">
                <p className="text-sm sm:text-lg text-[#91979D] min-w-max">Transaction Type</p>
                <p className="capitalize text-sm sm:text-base ff-bold">{data?.type}</p>
              </div>
            </div>
            <div className="w-full xs:w-1/2 sm:w-1/3 px-3 py-5 xs:py-3 border-b xs:border-b-0">
              <div className="w-full flex items-center justify-between xs:block">
                <p className="text-sm sm:text-lg text-[#91979D] min-w-max">Transaction Description:</p>
                <p className="capitalize text-sm sm:text-base ff-bold text-right xs:text-left">{data?.description}</p>
              </div>
            </div>
            <div className="w-full xs:w-1/2 sm:w-1/3 px-3 py-5 xs:py-3 border-b xs:border-b-0">
              <div className="w-full flex items-center justify-between xs:block">
                <p className="text-sm sm:text-lg text-[#91979D] min-w-max">Date</p>
                <p className="text-sm sm:text-base ff-bold">{formatDateTime(data?.date)}</p>
              </div>
            </div>
            <div className="w-full xs:w-1/2 sm:w-1/3 px-3 py-5 xs:py-3">
              <div className="w-full flex items-center justify-between xs:block">
                <p className="text-sm sm:text-lg text-[#91979D] min-w-max">Transaction Fee</p>
                <p className="capitalize text-sm sm:text-base ff-bold">
                  {formatCurrency(data?.fee || 0, true, accounts?.defaultWallets?.[0]?.currency?.code)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mt-5 flex justify-center">
          <Button
            border
            borderColor="border-success"
            bgColor="bg-white"
            textColor="text-success"
          >
            <BiDownload className="mr-2" />
            Download Receipt
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default TransactionDetails;
