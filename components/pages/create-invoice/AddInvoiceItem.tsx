import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { OrderListItemProps } from '../../../types/invoice';
import notification from '../../../utilities/notification';
import Modal from '../../common/Modal';
import Button from '../../inputs/Button';

import TextInput from '../../inputs/Text';

type Props = {
  onAdd?: (payload: OrderListItemProps) => void,
  onClose: () => void
};

function AddInvoiceItem({ onAdd = () => {}, onClose = () => {} }: Props) {
  const [form, setForm] = useState<OrderListItemProps>({});

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
    onAdd({
      ...form,
      id: uuidv4(),
      amount: Number(form?.amount),
      quantity: Number(form?.quantity),
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
                value={form?.name || ''}
                onChange={handleChange}
                label="Item Name"
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
                minValue={0}
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
                onChange={handleChange}
                type="number"
                minValue={0}
                label="Price per unit (NGN)"
                className="w-full mb-4"
                placeholder="Price per unit"
              />
            </div>
            <div className="w-full sm:w-1/2 px-2">
              <TextInput
                name="size"
                value={form?.size || ''}
                onChange={handleChange}
                className="w-full mb-4"
                label="Wieght per unit (KG)"
                type="number"
                minValue={0}
                placeholder="Weight per unit"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <Button paddingX="px-10" onClick={handleAddItem}>Add Item</Button>
        </div>
      </div>
    </Modal>
  );
}

export default AddInvoiceItem;
