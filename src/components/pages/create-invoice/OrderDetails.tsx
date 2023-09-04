import React, { useEffect, useState } from 'react';

import { FaCheck } from 'react-icons/fa';
import { BiPlus } from 'react-icons/bi';

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
import FileInput from '../../inputs/File';

const disbursementTypes = [
  {
    value: 'onetime',
    header: 'One Time Disbursement',
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
  const [show, setShow] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<OrderListItemProps>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (val: any, type = 'input', inputName = '') => {
    if (type === 'input') {
      const {
        value, name, type, files
      } = val.target;
      if (type === 'file') {
        setForm((state) => ({ ...state, [name]: files?.[0] }));
      } else {
        setForm((state) => ({ ...state, [name]: value }));
      }
    } else {
      setForm((state) => ({ ...state, [inputName]: val }));
    }
  };

  const handleEdit = (data: any) => {
    setItemToEdit(data);
    setShow(true);
  };

  const handleStartAdd = () => {
    setItemToEdit(undefined);
    setShow(true);
  };

  const handleAddItem = (itemPayload: OrderListItemProps) => {
    if (form?.escrowItems?.filter((item) => item.id === itemPayload.id)?.length) {
      setForm((state) => ({
        ...state,
        escrowItems: state?.escrowItems?.map((item) => item?.id === itemPayload?.id ? itemPayload : item)
      }));
    } else {
      setForm((state) => ({
        ...state,
        escrowItems: [...state?.escrowItems || [], itemPayload]
      }));
    }
  };

  const handleDeleteItem = (id: string) => {
    const escrowItems = form?.escrowItems?.filter((item) => item?.id !== id) || [];
    setForm((state) => ({ ...state, escrowItems }));
  };

  const validateForm = () => {
    if (!form?.title) return 'Invoice title is required.';
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

      <div className="w-full mb-5">
        <TextInput
          name="title"
          value={form?.title || ''}
          onChange={handleChange}
          label="Invoice Title"
          placeholder="Invoice Title"
        />
      </div>

      <div className="w-full rounded-lg shadow-md mb-5 overflow-x-auto hide-scroll overflow-y-visible">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="bg-primary text-white">
            <tr>
              <th className="px-3 py-3 rounded-tl-lg">Item Name</th>
              <th className="px-3 py-3">Quantity</th>
              <th className="px-3 py-3">Unit Weight</th>
              <th className="px-3 py-3">Unit Price</th>
              <th className="px-3 py-3">Total</th>
              <th className="px-3 py-3 rounded-tr-lg">{null}</th>
            </tr>
          </thead>
          <tbody className="">
            {form?.escrowItems?.map((item) => (
              <tr className="border-t" key={item?.id}>
                <td className="px-3 py-1">{item?.name}</td>
                <td className="px-3 py-1">{item?.quantity}</td>
                <td className="px-3 py-1">{`${item?.size || 0}kg`}</td>
                <td className="px-3 py-1">{formatCurrency(item?.amount)}</td>
                <td className="px-3 py-1">{formatCurrency(item?.total)}</td>
                <td className="px-3 py-1 flex justify-end">
                  <MenuOptions position='bottom' options={[
                    { title: 'Delete Item', action: () => handleDeleteItem(item?.id || '') },
                    { title: 'Edit Item', action: () => handleEdit(item) }
                  ]} />
                </td>
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

      <div className="w-full mb-10 flex justify-end">
        <Button onClick={handleStartAdd}>
          <BiPlus className="mr-1 mb-1" />
          Add Item
        </Button>
      </div>

      <div className="w-full mb-10">
        <h3 className="text-base ff-bold font-bold mb-1">How will this payment be disbursed?</h3>

        <div className="w-full">
          <div className="flex flex-wrap -mx-2">
            {disbursementTypes.map((item) => (
              <div className="w-full sm:w-1/2 p-2" key={item?.value}>
                <div
                  role="presentation"
                  onClick={() => handleChange(item?.value, 'options', 'disbursementType')}
                  className={`w-full h-full rounded-lg ${form?.disbursementType === item?.value
                    ? 'border-success border-2' : 'border'} bg-secondary p-5 cursor-pointer`}
                >
                  <div className="w-full relative">
                    <span
                      className={`rounded-full inline-block ${form?.disbursementType === item?.value
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
            name="writtenTerms"
            value={form?.writtenTerms}
            onChange={(val) => handleChange(val, 'editor', 'writtenTerms')}
            placeholder="Write text here..."
          />
        </div>
        <div className="w-full mt-7 text-center relative">
          <hr />
          <p className="font-bold bg-white inline-block px-5 relative -top-2.5">or</p>
        </div>
        <div className="w-full">
          <FileInput
            name="contract"
            value={form?.contract}
            onChange={handleChange}
            label="Upload file"
            className="file-input"
          />
        </div>
      </div>

      <div className="w-full mb-3">
        <Button paddingY="py-3" className="w-full" onClick={handleSubmit}>Next: Recipient Details</Button>
      </div>

      {show && <AddInvoiceItem data={itemToEdit} onAdd={handleAddItem} onClose={() => setShow(false)} />}
    </div>
  );
}

export default OrderDetails;
