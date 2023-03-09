import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { OrderListItemProps } from '../../../types/invoice';
import { formatCurrency } from '../../../utilities/general';
import notification from '../../../utilities/notification';
import Button from '../../inputs/Button';

import TextInput from '../../inputs/Text';

function AddInvoiceItem({ onAdd = () => {} }: { onAdd?: (payload: OrderListItemProps) => void }) {
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
    if (!form?.price) return 'Item unit price is required';
    return null;
  };

  const handleAddItem = () => {
    const error = validateForm();
    if (error) {
      notification({ title: 'Form Error', message: error, type: 'danger' });
      return;
    }
    onAdd({ ...form, total: Number(form?.price) * Number(form?.quantity), id: uuidv4() });
    setForm({});
  };

  return (
    <div className="w-full">
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
              name="price"
              value={form?.price || ''}
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
              value={formatCurrency(Number(form?.price) * Number(form?.quantity))}
              readOnly
              className="w-full mb-4"
              label="Total Amount"
              placeholder="Total Amount"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end" onClick={handleAddItem}>
        <Button paddingX="px-10">Add Item</Button>
      </div>
    </div>
  );
}

export default AddInvoiceItem;
