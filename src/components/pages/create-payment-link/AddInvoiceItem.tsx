import React, { useMemo, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  RxChevronDown,
  RxChevronUp,
  RxPlus,
  RxTrash,
  RxMagnifyingGlass,
} from "react-icons/rx";
import { debounce } from "lodash";

import { OrderListItemProps } from "../../../types/invoice";
import notification from "../../../utilities/notification";
import useGetQuery from "../../../hooks/useGetQuery";
import Modal from "../../common/Modal";
import Button from "../../inputs/Button";
import TextInput from "../../inputs/Text";
import ToggleInput from "../../inputs/Toggle";

type Props = {
  data?: OrderListItemProps;
  onAdd?: (payload: OrderListItemProps) => void;
  onClose: () => void;
};

type InventoryItem = {
  id: string;
  name: string;
  category?: string;
  imageUrl?: string;
  amountPerUnit: string;
  currentQuantity: number;
};

type ItemDraft = OrderListItemProps & {
  _errors: Record<string, string>;
  _useInventory?: boolean;
  _inventoryItemId?: string;
  _inventorySearch?: string;
  _showInventoryDropdown?: boolean;
  _availableQty?: number;
};

const emptyDraft = (): ItemDraft => ({
  name: "",
  inventoryItemId: "",
  quantity: undefined,
  amount: undefined,
  _errors: {},
  _useInventory: false,
});

const parseCurrencyToNumber = (value?: string | number): number => {
  if (typeof value === "number") return value;
  if (!value) return 0;
  const cleaned = value.replace(/[^0-9.]/g, "");
  return Number(cleaned) || 0;
};

function AddInvoiceItem({ data, onAdd = () => {}, onClose = () => {} }: Props) {
  const [drafts, setDrafts] = useState<ItemDraft[]>([emptyDraft()]);
  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  useEffect(() => {
    if (data?.id) {
      setDrafts([
        {
          ...data,
          _errors: {},
          _useInventory: !!data.inventoryItemId,
          _inventoryItemId: data.inventoryItemId,
        },
      ]);
      setExpandedIndex(0);
    } else {
      setDrafts([emptyDraft()]);
      setExpandedIndex(0);
    }
  }, [data]);

  const currentDraft = drafts[expandedIndex];
  const inventorySearch = currentDraft?._inventorySearch || "";

  const { data: inventoryRes, status: inventoryStatus } = useGetQuery({
    service: "wallet-service/api/v1",
    endpoint: "inventory",
    queryKey: ["inventory-picker", inventorySearch],
    pQuery: { SearchKey: inventorySearch, pageSize: 20, pageNumber: 1 },
    enabled: !!currentDraft?._useInventory,
  });

  const inventoryItems: InventoryItem[] = inventoryRes?.data || [];

  const debouncedInventorySearch = useMemo(
    () =>
      debounce((index: number, value: string) => {
        setDrafts((prev) =>
          prev.map((d, i) =>
            i === index ? { ...d, _inventorySearch: value } : d,
          ),
        );
      }, 400),
    [],
  );

  const updateDraft = (index: number, field: string, value: any) => {
    setDrafts((prev) =>
      prev.map((draft, i) =>
        i === index
          ? {
              ...draft,
              [field]: value,
              _errors: { ...draft._errors, [field]: "" },
            }
          : draft,
      ),
    );
  };

  const handleToggleInventory = (index: number, value: boolean) => {
    setDrafts((prev) =>
      prev.map((draft, i) =>
        i === index
          ? {
              ...draft,
              _useInventory: value,
              _showInventoryDropdown: value,
              ...(value
                ? {}
                : {
                    _inventoryItemId: undefined,
                    inventoryItemId: undefined,
                    _availableQty: undefined,
                    name: "",
                    amount: undefined,
                  }),
              _errors: {},
            }
          : draft,
      ),
    );
  };

  const handleSelectInventoryItem = (index: number, item: InventoryItem) => {
    setDrafts((prev) =>
      prev.map((draft, i) =>
        i === index
          ? {
              ...draft,
              name: item.name,
              amount: parseCurrencyToNumber(item.amountPerUnit),
              _inventoryItemId: item.id,
              inventoryItemId: item.id,
              _availableQty: item.currentQuantity,
              _showInventoryDropdown: false,
              _inventorySearch: "",
              _errors: {
                ...draft._errors,
                name: "",
                amount: "",
                inventoryItemId: "",
              },
            }
          : draft,
      ),
    );
  };

  const validateDraft = (draft: ItemDraft): Record<string, string> => {
    const errs: Record<string, string> = {};

    if (draft._useInventory && !draft._inventoryItemId) {
      errs.inventoryItemId = "Please select an item from inventory";
    }
    if (!draft.name?.trim()) errs.name = "Item name is required";
    if (!draft.quantity) errs.quantity = "Quantity is required";
    if (
      draft._useInventory &&
      draft._availableQty !== undefined &&
      Number(draft.quantity) > draft._availableQty
    ) {
      errs.quantity = `Only ${draft._availableQty} unit(s) available in inventory`;
    }
    if (!draft.amount) errs.amount = "Unit price is required";

    return errs;
  };

  const addAnotherDraft = () => {
  const current = drafts[expandedIndex];

  if (current) {
    const errs = validateDraft(current);

    if (Object.keys(errs).length > 0) {
      setDrafts((prev) =>
        prev.map((d, i) =>
          i === expandedIndex ? { ...d, _errors: errs } : d,
        ),
      );

      const firstError = Object.values(errs)[0];

      notification({
        title: "Incomplete Item",
        message: String(firstError),
        type: "danger",
      });

      return;
    }
  }

  setDrafts((prev) => [...prev, emptyDraft()]);
  setExpandedIndex(drafts.length);
};

  const removeDraft = (index: number) => {
    if (drafts.length === 1) {
      notification({
        title: "Info",
        message: "At least one item is required.",
        type: "danger",
      });
      return;
    }
    const remaining = drafts.filter((_, i) => i !== index);
    setDrafts(remaining);
    setExpandedIndex(Math.min(expandedIndex, remaining.length - 1));
  };

  const handleSaveItems = () => {
    let hasErrors = false;
    const validated = drafts.map((draft) => {
      const errs = validateDraft(draft);
      if (Object.keys(errs).length > 0) hasErrors = true;
      return { ...draft, _errors: errs };
    });

    if (hasErrors) {
      setDrafts(validated);
      const firstErrorIndex = validated.findIndex(
        (d) => Object.keys(d._errors).length > 0,
      );
      if (firstErrorIndex !== -1) setExpandedIndex(firstErrorIndex);
      notification({
        title: "Form Error",
        message: "Please fill in all required fields",
        type: "danger",
      });
      return;
    }

    drafts.forEach(
      ({
        _errors,
        _useInventory,
        _inventoryItemId,
        _inventorySearch,
        _showInventoryDropdown,
        _availableQty,
        ...draft
      }) => {
        onAdd({
          ...draft,
          id: draft.id || uuidv4(),
          inventoryItemId: _inventoryItemId,
          amount: Number(draft.amount),
          quantity: Number(draft.quantity),
          total: Number(draft.amount) * Number(draft.quantity),
          size: Number(draft.size),
          weight: Number(draft.weight),
        });
      },
    );
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
    return "Fill in details below";
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
                    ? "border-red-400"
                    : isExpanded
                      ? "border-primary"
                      : "border-lightText/20"
                }`}
              >
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
                      <p className="text-xs text-lightText">
                        {getDraftSubtitle(draft)}
                      </p>
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
                    <div className="flex items-center justify-between py-1">
                      <span className="text-sm font-medium text-textColor">
                        Use Inventory Item
                      </span>
                      <ToggleInput
                        label=""
                        value={!!draft._useInventory}
                        onChange={(val: boolean) =>
                          handleToggleInventory(index, val)
                        }
                      />
                    </div>

                    {draft._useInventory ? (
                      <>
                        <div className="relative">
                          <div
                            className={`w-full border rounded-lg px-3 py-2.5 flex items-center justify-between cursor-pointer transition-colors ${
                              draft._errors?.inventoryItemId
                                ? "border-red-400"
                                : "border-lightText/20 hover:border-primary"
                            }`}
                            onClick={() =>
                              setDrafts((prev) =>
                                prev.map((d, i) =>
                                  i === index
                                    ? {
                                        ...d,
                                        _showInventoryDropdown:
                                          !d._showInventoryDropdown,
                                      }
                                    : d,
                                ),
                              )
                            }
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              {draft.name ? (
                                <span className="text-sm text-textColor truncate">
                                  {draft.name}
                                </span>
                              ) : (
                                <span className="text-sm text-lightText">
                                  Select an inventory item
                                </span>
                              )}
                            </div>
                            {draft._showInventoryDropdown ? (
                              <RxChevronUp className="w-4 h-4 text-lightText flex-shrink-0" />
                            ) : (
                              <RxChevronDown className="w-4 h-4 text-lightText flex-shrink-0" />
                            )}
                          </div>

                          {draft._showInventoryDropdown && (
                            <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-white border border-lightText/20 rounded-lg shadow-md overflow-hidden">
                              <div className="p-2 border-b border-lightText/10">
                                <div className="relative">
                                  <RxMagnifyingGlass className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-lightText" />
                                  <input
                                    type="text"
                                    autoFocus
                                    placeholder="Search inventory..."
                                    className="w-full pl-8 pr-3 py-2 text-sm border border-lightText/20 rounded-md outline-none focus:border-primary"
                                    onChange={(e) =>
                                      debouncedInventorySearch(
                                        index,
                                        e.target.value,
                                      )
                                    }
                                  />
                                </div>
                              </div>

                              <div className="max-h-[180px] overflow-y-auto">
                                {inventoryStatus === "loading" && (
                                  <p className="px-3 py-3 text-sm text-lightText">
                                    Searching inventory...
                                  </p>
                                )}

                                {inventoryStatus === "success" &&
                                  (inventoryItems.length > 0 ? (
                                    inventoryItems.map((item) => (
                                      <button
                                        key={item.id}
                                        type="button"
                                        onClick={() =>
                                          handleSelectInventoryItem(index, item)
                                        }
                                        className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-secondary/50 transition-colors text-left"
                                      >
                                        {item.imageUrl ? (
                                          // eslint-disable-next-line @next/next/no-img-element
                                          <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                            className="w-8 h-8 rounded-md object-cover flex-shrink-0 border border-lightText/10"
                                          />
                                        ) : (
                                          <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center flex-shrink-0">
                                            <span className="text-xs text-lightText font-bold uppercase">
                                              {item.name?.charAt(0) || "?"}
                                            </span>
                                          </div>
                                        )}
                                        <div className="min-w-0">
                                          <p className="text-sm font-medium text-textColor truncate">
                                            {item.name}
                                          </p>
                                          <p className="text-xs text-lightText">
                                            {item.amountPerUnit} ·{" "}
                                            {item.currentQuantity} in stock
                                          </p>
                                        </div>
                                      </button>
                                    ))
                                  ) : (
                                    <p className="px-3 py-3 text-sm text-lightText">
                                      No inventory items found
                                    </p>
                                  ))}
                              </div>
                            </div>
                          )}

                          {draft._errors?.inventoryItemId && (
                            <p className="text-xs text-red-500 mt-1">
                              {draft._errors.inventoryItemId}
                            </p>
                          )}
                        </div>
                        <TextInput
                          name="quantity"
                          value={draft.quantity || ""}
                          onChange={(e: any) =>
                            updateDraft(index, "quantity", e.target.value)
                          }
                          label={
                            draft._availableQty !== undefined
                              ? `Quantity (Available: ${draft._availableQty})`
                              : "Quantity"
                          }
                          type="number"
                          minValue={0}
                          className="w-full"
                          placeholder="Quantity*"
                          required
                          error={draft._errors?.quantity}
                          disabled={!draft._inventoryItemId}
                        />
                        <TextInput
                          name="amount"
                          value={draft.amount || ""}
                          label="Price per unit (NGN)"
                          type="number"
                          className="w-full"
                          placeholder="Price per unit*"
                          disabled
                          onChange={() => {}}
                        />
                      </>
                    ) : (
                      <>
                        <TextInput
                          name="name"
                          value={draft.name || ""}
                          onChange={(e: any) =>
                            updateDraft(index, "name", e.target.value)
                          }
                          label="Item Name"
                          className="w-full"
                          placeholder="Item Name*"
                          required
                          error={draft._errors?.name}
                        />
                        <div className="flex gap-3">
                          <TextInput
                            name="quantity"
                            value={draft.quantity || ""}
                            onChange={(e: any) =>
                              updateDraft(index, "quantity", e.target.value)
                            }
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
                            value={draft.amount || ""}
                            onChange={(e: any) =>
                              updateDraft(index, "amount", e.target.value)
                            }
                            label="Price per unit (NGN)"
                            type="number"
                            minValue={0}
                            className="w-full"
                            placeholder="Price per unit*"
                            required
                            error={draft._errors?.amount}
                          />
                        </div>
                      </>
                    )}
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

        {drafts.length > 1 && (
          <div className="flex items-center justify-between px-4 py-3 bg-secondary rounded-lg mb-5 text-sm">
            <span className="text-lightText">{drafts.length} items</span>
            <span className="font-bold text-textColor">
              Total: ₦
              {drafts
                .reduce(
                  (sum, d) =>
                    sum + (Number(d.amount) || 0) * (Number(d.quantity) || 0),
                  0,
                )
                .toLocaleString()}
            </span>
          </div>
        )}

        <div className="w-full flex justify-center">
          <Button
            className="w-full"
            paddingX="px-10"
            paddingY="py-3"
            onClick={handleSaveItems}
          >
            {data?.id
              ? "Update Item"
              : `Submit ${drafts.length > 1 ? `${drafts.length} Items` : "Item"}`}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default AddInvoiceItem;

