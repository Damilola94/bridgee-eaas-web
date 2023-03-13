import React from 'react';
import Image from 'next/image';

import DefaultLogo from '../../../assets/images/business-logo.png';

import Button from '../../inputs/Button';
import { formatCurrency } from '../../../utilities/general';
import { useAccountsContext } from '../../../context/Accounts';

import { invoice } from '../../../sample-data/invoiceList';

function InvoiceDetails() {
  const { accounts } = useAccountsContext();

  const total = invoice?.orderList?.reduce((sum, item) => sum + (item?.total || 0), 0) || 0;
  const escrowFee = (total || 0) * 0.05;

  return (
    <div className="w-full bg-white px-10 py-8 rounded-lg shadow-md">
      <div className="w-full mb-5">
        <div className="flex w-full justify-between mb-5">
          <div className="text-left">
            <div className="flex mb-2">
              <Image src={DefaultLogo} alt="" className="w-20 h-20" />
            </div>
            <h3 className="font-bold text-xl">
              {accounts?.defaultMerchant?.name || `${accounts?.user?.firstName} ${accounts?.user?.lastName}`}
            </h3>
            <p className="mb-1">291 N 4th St, Ikoyi, Lagos, Nigeria</p>
            <p className="text-lightText">{new Date().toDateString()}</p>
          </div>
          <h2 className="ff-bold font-bold text-2xl">Invoice #0472</h2>
        </div>

        <div className="flex w-full justify-between">
          <div className="text-left">
            <h3 className="font-bold ff-bold text-lg mb-2">Recipient Details</h3>
            <p className="mb-1">{invoice?.recipientName}</p>
            <div className="w-full text-lightText">
              <p className="mb-1">{invoice?.recipientEmail}</p>
              <p className="mb-1">{invoice?.recipientPhone}</p>
              <p className="mb-1">{invoice?.recipientAddress}</p>
            </div>
          </div>
          <div className="text-right">
            <h3 className="font-bold ff-bold text-lg mb-2">Order Details</h3>
            <div className="w-full">
              <p className="mb-1"><span className="text-lightText">Disbursement Type:&nbsp;</span>One time</p>
              <p className="mb-1"><span className="text-lightText">Dispute Manager:&nbsp;</span>Bridge by ALAT</p>
              <p className="mb-1"><span className="text-lightText">Inspection:&nbsp;</span>2 Days</p>
              <p className="mb-1"><span className="text-lightText">Due Date:&nbsp;</span>Tues, 23 June 2023</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mb-5">
        <table className="w-full min-w-max table-auto text-left border-b">
          <thead className="bg-secondary uppercase">
            <tr>
              <th className="px-3 py-3">Item Name</th>
              <th className="px-3 py-3">Unit Price</th>
              <th className="px-3 py-3 text-center">Quantity</th>
              <th className="px-3 py-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice?.orderList?.map((item) => (
              <tr key={item?.id}>
                <td className="px-3 py-3">{item?.name}</td>
                <td className="px-3 py-3">{formatCurrency(item?.price)}</td>
                <td className="px-3 py-3 text-center">{item?.quantity}</td>
                <td className="px-3 py-3 font-bold ff-bold text-right">{formatCurrency(item?.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full flex justify-end mb-5">
        <div className="w-full max-w-[280px]">
          <div className="w-full flex justify-between mb-3">
            <p className="">SUBTOTAL</p>
            <p className="font-bold ff-bold">{formatCurrency(total)}</p>
          </div>
          <div className="w-full flex justify-between mb-3">
            <p className="">Escrow fee (5%)</p>
            <p className="font-bold ff-bold">{formatCurrency(escrowFee)}</p>
          </div>
          <div className="w-full flex justify-between mb-3">
            <p className="">Delivery Fee</p>
            <p className="font-bold ff-bold">{formatCurrency(0)}</p>
          </div>
          <div className="w-full flex justify-between mb-3 text-lg">
            <p className="">TOTAL</p>
            <p className="font-bold ff-bold">{formatCurrency(total + escrowFee)}</p>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-end space-x-3">
        <Button
          bgColor="bg-error"
        >
          Decline
        </Button>
        <Button>Accept</Button>
      </div>
    </div>
  );
}

export default InvoiceDetails;
