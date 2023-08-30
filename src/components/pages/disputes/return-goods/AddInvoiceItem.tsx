import React, { useEffect, useState } from 'react';

import { OrderListItemProps } from '../../../../types/invoice';
import notification from '../../../../utilities/notification';
import Modal from '../../../common/Modal';
import Button from '../../../inputs/Button';

import TextInput from '../../../inputs/Text';

type Props = {
  data?: any,
  onEdit?: (payload: OrderListItemProps) => void,
  onClose: () => void
};

function AddInvoiceItem({ data, onEdit = () => {}, onClose = () => {} }: Props) {
  const [form, setForm] = useState<OrderListItemProps>({});

  useEffect(() => {
    if (data?.id) {
      setForm({
        ...data,
        size: data?.weight,
        amount: data?.unitPrice,
        total: data?.totalAmount
      });
    }
  }, [data]);

  const handleChange = (val: any, type = 'input', inputName = '') => {
    if (type === 'input') {
      const { value, name } = val.target;
      setForm((state) => ({ ...state, [name]: value }));
    } else {
      setForm((state) => ({ ...state, [inputName]: val }));
    }
  };

  const validateForm = () => {
    if (!form?.name) return 'Item name is required';
    if (!form?.quantity) return 'Item quantity is required';
    if (!form?.amount) return 'Item unit price is required';
    return null;
  };

  const handleAddItem = () => {
    const error = validateForm();
    if (error) {
      notification({ title: 'Form Error', message: error, type: 'danger' });
      return;
    }
    onEdit({
      ...form,
      amount: Number(form?.amount),
      quantity: Number(form?.quantity),
      oldQuantity: data?.quantity,
      total: Number(form?.amount) * Number(form?.quantity),
      size: Number(form?.size)
    });
    setForm({});
    onClose();
  };

  return (
    <Modal isOpen onClose={onClose}>
      <div className="w-full">
        <h2 className="font-bold text-lg mb-5">Add New Item</h2>
        <div className="w-full">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full sm:w-1/2 px-2">
              <TextInput
                name="name"
                readOnly
                value={form?.name || ''}
                label="Item Name (Not Editable)"
                className="w-full mb-4"
                placeholder="Item Name"
              />
            </div>
            <div className="w-full sm:w-1/2 px-2">
              <TextInput
                name="quantity"
                value={form?.quantity || ''}
                onChange={handleChange}
                className="w-full mb-4"
                label="Quantity"
                type="number"
                minValue={1}
                maxValue={data?.oldQuantity || data?.quantity}
                placeholder="Quantity"
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full sm:w-1/2 px-2">
              <TextInput
                name="amount"
                value={form?.amount || ''}
                readOnly
                label="Price per unit (NGN) (Not Editable)"
                className="w-full mb-4"
                placeholder="Price per unit"
              />
            </div>
            <div className="w-full sm:w-1/2 px-2">
              <TextInput
                name="size"
                readOnly
                value={form?.size || ''}
                className="w-full mb-4"
                label="Weight per unit (KG) (Not Editable)"
                placeholder="Weight per unit"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <Button paddingX="px-10" onClick={handleAddItem}>Update Item</Button>
        </div>
      </div>
    </Modal>
  );
}

export default AddInvoiceItem;
