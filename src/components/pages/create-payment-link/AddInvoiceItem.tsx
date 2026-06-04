import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { RxChevronDown, RxChevronUp, RxPlus, RxTrash } from 'react-icons/rx';

import { OrderListItemProps } from '../../../types/invoice';
import notification from '../../../utilities/notification';
import Modal from '../../common/Modal';
import Button from '../../inputs/Button';
import TextInput from '../../inputs/Text';

type Props = {
  data?: OrderListItemProps;
  onAdd?: (payload: OrderListItemProps) => void;
  onClose: () => void;
};

type ItemDraft = OrderListItemProps & { _errors: Record<string, string> };

const emptyDraft = (): ItemDraft => ({
  name: '',
  quantity: undefined,
  amount: undefined,
  _errors: {},
});

function AddInvoiceItem({ data, onAdd = () => {}, onClose = () => {} }: Props) {
  // List of drafted items — each is a local form before being sent to parent via onAdd
  const [drafts, setDrafts] = useState<ItemDraft[]>([emptyDraft()]);
  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  // If editing an existing item, pre-fill it as the only draft
  useEffect(() => {
    if (data?.id) {
      setDrafts([{ ...data, _errors: {} }]);
      setExpandedIndex(0);
    } else {
      setDrafts([emptyDraft()]);
      setExpandedIndex(0);
    }
  }, [data]);

  const updateDraft = (index: number, field: string, value: any) => {
    setDrafts((prev) =>
      prev.map((draft, i) =>
        i === index
          ? { ...draft, [field]: value, _errors: { ...draft._errors, [field]: '' } }
          : draft
      )
    );
  };

  const validateDraft = (draft: ItemDraft): Record<string, string> => {
    const errs: Record<string, string> = {};
    if (!draft.name?.trim()) errs.name = 'Item name is required';
    if (!draft.quantity) errs.quantity = 'Quantity is required';
    if (!draft.amount) errs.amount = 'Unit price is required';
    return errs;
  };

  const addAnotherDraft = () => {
    // Validate the currently expanded draft before allowing a new one
    const current = drafts[expandedIndex];
    if (current) {
      const errs = validateDraft(current);
      if (Object.keys(errs).length > 0) {
        setDrafts((prev) =>
          prev.map((d, i) => (i === expandedIndex ? { ...d, _errors: errs } : d))
        );
        notification({
          title: 'Incomplete Item',
          message: 'Please fill in all required fields before adding a new item.',
          type: 'danger',
        });
        return;
      }
    }
    setDrafts((prev) => [...prev, emptyDraft()]);
    setExpandedIndex(drafts.length); // expand the new one
  };

  const removeDraft = (index: number) => {
    if (drafts.length === 1) {
      notification({ title: 'Info', message: 'At least one item is required.', type: 'danger' });
      return;
    }
    const remaining = drafts.filter((_, i) => i !== index);
    setDrafts(remaining);
    setExpandedIndex(Math.min(expandedIndex, remaining.length - 1));
  };

  // This mirrors the original handleAddItem — calls onAdd once per draft
  const handleSaveItems = () => {
    let hasErrors = false;
    const validated = drafts.map((draft) => {
      const errs = validateDraft(draft);
      if (Object.keys(errs).length > 0) hasErrors = true;
      return { ...draft, _errors: errs };
    });

    if (hasErrors) {
      setDrafts(validated);
      const firstErrorIndex = validated.findIndex((d) => Object.keys(d._errors).length > 0);
      if (firstErrorIndex !== -1) setExpandedIndex(firstErrorIndex);
      notification({
        title: 'Form Error',
        message: 'Please fill in all required fields',
        type: 'danger',
      });
      return;
    }

    // Call onAdd for each draft — exactly like the original handleAddItem
    drafts.forEach(({ _errors, ...draft }) => {
      onAdd({
        ...draft,
        id: draft.id || uuidv4(),  // preserve id when editing, generate new when adding
        amount: Number(draft.amount),
        quantity: Number(draft.quantity),
        total: Number(draft.amount) * Number(draft.quantity),
        size: Number(draft.size),
        weight: Number(draft.weight),
      });
    });

    // Reset and close
    setDrafts([emptyDraft()]);
    setExpandedIndex(0);
    onClose();
  };

  const getDraftLabel = (draft: ItemDraft, index: number) =>
    draft.name?.trim() ? draft.name.trim() : `Item ${index + 1}`;

  const getDraftSubtitle = (draft: ItemDraft) => {
    if (draft.amount && draft.quantity) {
      return `Qty: ${draft.quantity}  ·  ₦${(Number(draft.amount) * Number(draft.quantity)).toLocaleString()}`;
    }
    return 'Fill in details below';
  };

  return (
    <Modal isOpen onClose={onClose} maxWidth="max-w-[400px]">
      <div className="w-full">
        <h2 className="font-bold text-lg mb-5">Order Details</h2>

        <div className="w-full space-y-3 mb-4 max-h-[55vh] overflow-y-auto pr-1">
          {drafts.map((draft, index) => {
            const isExpanded = expandedIndex === index;
            const hasFieldErrors = Object.keys(draft._errors || {}).length > 0;
            const total =
              draft.amount && draft.quantity
                ? Number(draft.amount) * Number(draft.quantity)
                : 0;

            return (
              <div
                key={index}
                className={`border rounded-lg overflow-hidden transition-all ${
                  hasFieldErrors
                    ? 'border-red-400'
                    : isExpanded
                    ? 'border-primary'
                    : 'border-lightText/20'
                }`}
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-secondary/50 transition-colors"
                  onClick={() => setExpandedIndex(isExpanded ? -1 : index)}
                >
                  <div className="flex items-center gap-3 text-left">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-sm text-textColor">
                        {getDraftLabel(draft, index)}
                      </p>
                      <p className="text-xs text-lightText">{getDraftSubtitle(draft)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {drafts.length > 1 && (
                      <span
                        role="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeDraft(index);
                        }}
                        className="p-1 text-red-400 hover:text-red-600 transition-colors"
                      >
                        <RxTrash className="w-4 h-4" />
                      </span>
                    )}
                    {isExpanded ? (
                      <RxChevronUp className="w-5 h-5 text-lightText" />
                    ) : (
                      <RxChevronDown className="w-5 h-5 text-lightText" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-2 border-t border-lightText/10 space-y-3">
                    <TextInput
                      name="name"
                      value={draft.name || ''}
                      onChange={(e: any) => updateDraft(index, 'name', e.target.value)}
                      label="Item Name"
                      className="w-full"
                      placeholder="Item Name*"
                      required
                      error={draft._errors?.name}
                    />
                    <div className="flex gap-3">
                      <TextInput
                        name="quantity"
                        value={draft.quantity || ''}
                        onChange={(e: any) => updateDraft(index, 'quantity', e.target.value)}
                        label="Quantity"
                        type="number"
                        minValue={0}
                        className="w-full"
                        placeholder="Quantity*"
                        required
                        error={draft._errors?.quantity}
                      />
                      <TextInput
                        name="amount"
                        value={draft.amount || ''}
                        onChange={(e: any) => updateDraft(index, 'amount', e.target.value)}
                        label="Price per unit (NGN)"
                        type="number"
                        minValue={0}
                        className="w-full"
                        placeholder="Price per unit*"
                        required
                        error={draft._errors?.amount}
                      />
                    </div>
                    <TextInput
                      name="totalAmount"
                      value={total}
                      disabled
                      label="Total Amount (NGN)"
                      type="number"
                      className="w-full mb-4"
                      placeholder="Total amount"
                      onChange={() => {}}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Add another item — only for new items, not when editing */}
        {!data?.id && (
          <button
            type="button"
            onClick={addAnotherDraft}
            className="w-full flex items-center justify-center gap-2 py-2.5 mb-5 border border-dashed border-primary/50 rounded-lg text-primary text-sm font-semibold hover:bg-primary/5 transition-colors"
          >
            <RxPlus className="w-4 h-4" />
            Add Another Item
          </button>
        )}

        {/* Summary — only show when multiple drafts */}
        {drafts.length > 1 && (
          <div className="flex items-center justify-between px-4 py-3 bg-secondary rounded-lg mb-5 text-sm">
            <span className="text-lightText">{drafts.length} items</span>
            <span className="font-bold text-textColor">
              Total: ₦
              {drafts
                .reduce((sum, d) => sum + (Number(d.amount) || 0) * (Number(d.quantity) || 0), 0)
                .toLocaleString()}
            </span>
          </div>
        )}

        {/* Save button */}
        <div className="w-full flex justify-center">
          <Button className="w-full" paddingX="px-10" paddingY="py-3" onClick={handleSaveItems}>
            {data?.id ? 'Update Item' : `Add ${drafts.length > 1 ? `${drafts.length} Items` : 'Item'}`}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default AddInvoiceItem;