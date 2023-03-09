import React from 'react';
import { useCreateInvoiceContext } from '../../../context/CreateInvoice';
import { formatCurrency } from '../../../utilities/general';

function OrderSummary() {
  const { form } = useCreateInvoiceContext();

  const total = form?.orderList?.reduce((sum, item) => sum + (item?.total || 0), 0) || 0;
  const escrowFee = (total || 0) * 0.05;

  return (
    <div className="w-full bg-white rounded-lg shadow-md">
      <div className="w-full px-10 pt-8 border-b">
        <h3 className="font-bold text-xl ff-bold mb-2">Order Summary</h3>
        <p className="text-lightText">
          Fill the form below to create an invoice for the product/service you are willing to sell
        </p>

        <div className="w-full py-7">
          {form?.orderList?.map((item) => (
            <div className="w-full flex justify-between py-3 border-b" key={item?.id}>
              <p className="">{`${item?.quantity}x ${item?.name}`}</p>
              <p className="font-bold">{formatCurrency(item?.total)}</p>
            </div>
          ))}
          <div className="w-full flex justify-between py-3 border-b">
            <p className="">SUBTOTAL</p>
            <p className="font-bold ff-bold">{formatCurrency(total)}</p>
          </div>
          <div className="w-full flex justify-between py-3 border-b">
            <p className="">Escrow fee (5%)</p>
            <p className="font-bold ff-bold">{formatCurrency(escrowFee)}</p>
          </div>
          <div className="w-full flex justify-between py-3">
            <p className="">Delivery Fee</p>
            <p className="font-bold ff-bold">{formatCurrency(0)}</p>
          </div>
        </div>
      </div>

      <div className="w-full px-10 py-4 flex justify-between">
        <h3 className="font-semibold text-base ff-bold mb-2">Total</h3>
        <p className="font-bold text-xl ff-bold text-primary">{formatCurrency(total + escrowFee)}</p>
      </div>
    </div>
  );
}

export default OrderSummary;
