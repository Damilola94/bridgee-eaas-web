import React, { useEffect, useState } from 'react';

import { OrderListItemProps } from '../../../../types/invoice';
import AddInvoiceItem from './AddInvoiceItem';
import NoData from '../../../common/NoData';
import Button from '../../../inputs/Button';
import notification from '../../../../utilities/notification';
import { useReturnGoodsContext } from '../../../../context/ReturnGoods';

import { invoice } from '../../../../sample-data/invoiceList';

function OrderDetails({ onNext = () => {} }: { onNext?: () => void }) {
  const { form, setForm } = useReturnGoodsContext();
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    setForm({
      escrowItems: invoice?.items,
      recipientDetails: {
        ...invoice?.recipientDetails,
        recipientName: invoice?.recipientDetails?.name
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddItem = (itemPayload: OrderListItemProps) => {
    setForm((state) => ({
      ...state,
      escrowItems: [...state?.escrowItems || [], itemPayload]
    }));
  };

  // eslint-disable-next-line no-unused-vars
  const handleDeleteItem = (id: string) => {
    const escrowItems = form?.escrowItems?.filter((item) => item?.id !== id) || [];
    setForm((state) => ({ ...state, escrowItems }));
  };

  const validateForm = () => {
    if (!form?.escrowItems?.length) return 'Your order list must not be empty';
    return null;
  };

  const handleSubmit = () => {
    const error = validateForm();
    if (error) {
      notification({ title: 'form Error', message: error, type: 'danger' });
      return;
    }

    onNext();
  };

  return (
    <div className="w-full bg-white px-10 py-8 rounded-lg shadow-md">
      <div className="w-full mb-10">
        <h3 className="font-bold text-xl ff-bold mb-2">Order Details</h3>
        <p className="text-lightText">
          Fill the form below to create an invoice for the product/service.
        </p>
      </div>

      <div className="w-full rounded-lg shadow-md mb-14 overflow-x-auto hide-scroll overflow-y-visible">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="bg-primary text-white">
            <tr>
              <th className="px-3 py-3 rounded-tl-lg">Item Name</th>
              <th className="px-3 py-3">Quantity</th>
              <th className="px-3 py-3">Unit Weight</th>
              <th className="px-3 py-3 rounded-tr-lg">{null}</th>
            </tr>
          </thead>
          <tbody className="">
            {form?.escrowItems?.map((item) => (
              <tr className="border-t" key={item?.id || item?.name}>
                <td className="px-3 py-3">{item?.name}</td>
                <td className="px-3 py-3">{item?.quantity}</td>
                <td className="px-3 py-3">{`${item?.weight || 0}kg`}</td>
                {/* <td className="px-3 py-3">
                  <MenuOptions position='bottom' options={[
                    { title: 'Delete Item', action: () => handleDeleteItem(item?.id || '') },
                    { title: 'Edit Item', action: () => {} }
                  ]} />
                </td> */}
              </tr>
            ))}

            {(form?.escrowItems?.length || 0) < 1 && (
              <tr>
                <td colSpan={6}>
                  <NoData sm message="Add item to your invoice" py="py-5" />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="w-full mb-3">
        <Button paddingY="py-3" className="w-full" onClick={handleSubmit}>Next: Recipient Details</Button>
      </div>

      {show && <AddInvoiceItem onAdd={handleAddItem} onClose={() => setShow(false)} />}
    </div>
  );
}

export default OrderDetails;
