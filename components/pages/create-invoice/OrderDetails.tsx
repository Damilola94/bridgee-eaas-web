import React from 'react';

import { FaCheck } from 'react-icons/fa';

import TextInput from '../../inputs/Text';
import { OrderListItemProps } from '../../../types/invoice';
import AddInvoiceItem from './AddInvoiceItem';
import MenuOptions from '../../common/MenuOptions';
import NoData from '../../common/NoData';
import Editor from '../../inputs/Editor';
import Button from '../../inputs/Button';
import { useCreateInvoiceContext } from '../../../context/CreateInvoice';
import { formatCurrency } from '../../../utilities/general';
import notification from '../../../utilities/notification';

const paymentPlans = [
  {
    value: 'oneoff',
    header: 'One time disbursement',
    desc: 'An escrow transaction involving just two parties/entities (buyer and seller).'
  },
  {
    value: 'installment',
    header: 'In Installment',
    desc: 'An escrow transaction involving just two parties/entities (buyer and seller).'
  }
];

function OrderDetails({ onNext = () => {} }: { onNext?: () => void }) {
  const { form, setForm } = useCreateInvoiceContext();

  const handleChange = (val: any, type = 'input', inputName = '') => {
    if (type === 'input') {
      const { value, name } = val.target;
      setForm((state) => ({ ...state, [name]: value }));
    } else {
      setForm((state) => ({ ...state, [inputName]: val }));
    }
  };

  const handleAddItem = (itemPayload: OrderListItemProps) => {
    setForm((state) => ({
      ...state,
      orderList: [...state?.orderList || [], itemPayload]
    }));
  };

  const handleDeleteItem = (id: string) => {
    const orderList = form?.orderList?.filter((item) => item?.id !== id) || [];
    setForm((state) => ({ ...state, orderList }));
  };

  const validateForm = () => {
    if (!form?.title) return 'Invoice title is required.';
    if (!form?.orderList?.length) return 'Your order list must not be empty';
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

      <div className="w-full mb-5">
        <TextInput
          name="title"
          value={form?.title || ''}
          onChange={handleChange}
          label="Invoice Title"
          placeholder="Invoice Title"
        />
      </div>

      <div className="w-full rounded-lg shadow-md mb-10 overflow-x-auto hide-scroll overflow-y-visible">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="bg-primary text-white">
            <tr>
              <th className="px-3 py-3 rounded-tl-lg">Item Name</th>
              <th className="px-3 py-3">Quantity</th>
              <th className="px-3 py-3">Unit Price</th>
              <th className="px-3 py-3">Total</th>
              <th className="px-3 py-3 rounded-tr-lg">{null}</th>
            </tr>
          </thead>
          <tbody className="">
            {form?.orderList?.map((item) => (
              <tr className="border-t" key={item?.id}>
                <td className="px-3 py-1">{item?.name}</td>
                <td className="px-3 py-1">{item?.quantity}</td>
                <td className="px-3 py-1">{formatCurrency(item?.price)}</td>
                <td className="px-3 py-1">{formatCurrency(item?.total)}</td>
                <td className="px-3 py-1">
                  <MenuOptions position='bottom' options={[
                    { title: 'Delete Item', action: () => handleDeleteItem(item?.id || '') },
                    { title: 'Edit Item', action: () => {} }
                  ]} />
                </td>
              </tr>
            ))}

            {(form?.orderList?.length || 0) < 1 && (
              <tr>
                <td colSpan={5}>
                  <NoData sm message="Add item to your invoice" py="py-5" />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="w-full mb-5">
        <AddInvoiceItem onAdd={handleAddItem} />
      </div>

      <div className="w-full mb-10">
        <h3 className="text-base ff-bold font-bold mb-1">How will this payment be disbursed?</h3>

        <div className="w-full">
          <div className="flex flex-wrap -mx-2">
            {paymentPlans.map((item) => (
              <div className="w-full sm:w-1/2 p-2" key={item?.value}>
                <div
                  role="presentation"
                  onClick={() => handleChange(item?.value, 'options', 'paymentPlan')}
                  className={`w-full h-full rounded-lg ${form?.paymentPlan === item?.value
                    ? 'border-success border-2' : 'border'} bg-secondary p-5 cursor-pointer`}
                >
                  <div className="w-full relative">
                    <span
                      className={`rounded-full inline-block ${form?.paymentPlan === item?.value
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

      <div className="w-full mb-10">
        <h3 className="text-base ff-bold font-bold mb-3">Agreement</h3>

        <div className="w-full">
          <Editor
            name="aggrement"
            value={form?.agreement}
            onChange={(val) => handleChange(val, 'editor', 'agreement')}
            placeholder="Write text here..."
          />
        </div>
        <div className="w-full mt-7 text-center relative">
          <hr />
          <p className="font-bold bg-white inline-block px-5 relative -top-2.5">or</p>
        </div>
        <div className="w-full">
          <TextInput
            type="file"
            name="agreementFile"
            value={form?.agreementFile || ''}
            onChange={handleChange}
            label="Upload file"
            className="file-input"
          />
        </div>
      </div>

      <div className="w-full mb-3">
        <Button paddingY="py-3" className="w-full" onClick={handleSubmit}>Next: Recipient Details</Button>
      </div>
    </div>
  );
}

export default OrderDetails;
