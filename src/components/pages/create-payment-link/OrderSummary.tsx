import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { useCreateInvoiceContext } from '../../../context/CreateInvoice';
import useGetQuery from '../../../hooks/useGetQuery';
import { formatCurrency } from '../../../utilities/general';

function OrderSummary() {
  const { form } = useCreateInvoiceContext();

  const total = form?.escrowItems?.reduce((sum, item) => sum + (item?.total || 0), 0) || 0;

  const { data, status, isFetching } = useGetQuery({
    endpoint: 'transaction',
    extra: 'calculate-fee',
    pQuery: { feeType: 'Escrow', amount: total },
    queryKey: ['calculate-fee', total],
    enabled: !!total
  });

  return (
    <div className="w-full bg-white rounded-lg shadow-md">
      <div className="w-full px-10 pt-8 border-b">
        <h3 className="font-bold text-xl ff-bold mb-2">Order Summary</h3>
        <p className="text-lightText">
          Fill the form below to create an invoice for the product/service you are willing to sell
        </p>

        <div className="w-full py-7">
          {form?.escrowItems?.map((item) => (
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
            <p className="">Escrow fee</p>
            <p className="font-bold ff-bold">
              {(status === 'loading' || isFetching)
                ? <Skeleton className="w-[80px]" />
                : formatCurrency(data?.data || 0)}
            </p>
          </div>
          <div className="w-full flex justify-between py-3">
            <p className="">Delivery Fee</p>
            <p className="font-bold ff-bold">{formatCurrency(form?.selectedCourier?.total || 0)}</p>
          </div>
        </div>
      </div>

      <div className="w-full px-10 py-4 flex justify-between">
        <h3 className="font-semibold text-base ff-bold mb-2">Total</h3>
        <p className="font-bold text-xl ff-bold text-primary">
          {(status === 'loading' || isFetching)
            ? <Skeleton className="w-[80px]" />
            : formatCurrency(total + (data?.data || 0) + (form?.selectedCourier?.total || 0))}
        </p>
      </div>
    </div>
  );
}

export default OrderSummary;
