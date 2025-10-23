import React, { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import AsyncSelect from "react-select/async";

// import { FaCheck } from 'react-icons/fa';
import { BiPlus } from "react-icons/bi";

import Image from "next/image";

import { OrderListItemProps } from "../../../types/invoice";

// import MenuOptions from '../../common/MenuOptions';
import NoData from "../../common/NoData";
// import Editor from '../../inputs/Editor';
import Button from "../../inputs/Button";
import { useCreateInvoiceContext } from "../../../context/CreateInvoice";
import { formatCurrency } from "../../../utilities/general";
import notification from "../../../utilities/notification";
import FileInput from "../../inputs/File";

import SelectInput from "../../inputs/Select";
import Select, { StylesConfig } from "react-select";

import TextareaInput from "../../inputs/Textarea";

import Edit from "../../../assets/svgs/edit-order.svg";
import Delete from "../../../assets/svgs/delete.svg";

import AddInvoiceItem from "./AddInvoiceItem";
import {
  getPackageCategories,
  getPackageDimensions,
  getGooglePlacesSuggestions,
} from "../../../services/api/shipbubble";
import {
  ShipBubbleCategory,
  ShipBubbleDimension,
  GooglePlaceSuggestion,
} from "../../../types/shipbubble";
import TextInput from "../../inputs/Text";
import SelectPackageSizeModal from "./SelectPackageSizeModal";
import ShippingRatesModal from "./ShippingRatesModal";

const selectStyles: StylesConfig = {
  control: (base) => ({
    ...base,
    height: "3rem",
    border: "1px solid #CFCFCF",
    borderRadius: "10px",
    backgroundColor: "#F8F8F8",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#CFCFCF",
    },
  }),
};

function OrderDetails({ onNext = () => {} }: { onNext?: () => void }) {
  const { form, setForm } = useCreateInvoiceContext();
  const [show, setShow] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<OrderListItemProps>();

  const [categories, setCategories] = useState<ShipBubbleCategory[]>([]);

  const [dimensions, setDimensions] = useState<ShipBubbleDimension[]>([]);
  const [selectedDimension, setSelectedDimension] =
    useState<ShipBubbleDimension | null>(null);

  const [isPackageSizeModalOpen, setIsPackageSizeModalOpen] = useState(false);

  const [isRatesModalOpen, setIsRatesModalOpen] = useState(false);

  const handleSelectDimension = (dimension: ShipBubbleDimension) => {
    setSelectedDimension(dimension);
  };

  const handleGetShippingRate = () => {
    setIsRatesModalOpen(true);
  };

  // Fetch Categories
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [categoriesResponse, dimensionsResponse] = await Promise.all([
          getPackageCategories(),
          getPackageDimensions(),
        ]);

        if (categoriesResponse.isSuccess) {
          setCategories(categoriesResponse.data.categories);
        }

        if (dimensionsResponse.isSuccess) {
          setDimensions(dimensionsResponse.data.dimensions);
        }
      } catch (error) {
        console.error("Error fetching data:", error);

        notification({
          title: "Error",
          message: "Could not load shipping details.",
          type: "danger",
        });
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load Google Address Suggestions
  const loadSuggestions = (inputValue: string) =>
    new Promise<any[]>((resolve) => {
      if (inputValue.trim().length < 2) {
        resolve([]);
        return;
      }
     
      debouncedLoad(inputValue, resolve);
    });

  const debouncedLoad = useCallback(
    debounce(async (inputValue: string, resolve: (options: any[]) => void) => {
      try {
        const response = await getGooglePlacesSuggestions(inputValue);
        if (response.isSuccess && response.data) {
          const options = response.data.map((suggestion) => ({
            label: suggestion.description,
            value: suggestion.placeId,
          }));
          resolve(options);
        } else {
          resolve([]);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        resolve([]);
      }
    }, 500), // Increased debounce to 500ms for a better experience
    []
  );

  const handleChange = (val: any, inputType = "input", inputName = "") => {
    if (inputType === "input") {
      const { value, name, type, files } = val.target;

      if (type === "file") {
        setForm((state) => ({
          ...state,
          [name]: files?.length > 1 ? Array.from(files) : files?.[0],
        }));
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
    if (form?.escrowItems?.find((item) => item.id === itemPayload.id)) {
      setForm((state) => ({
        ...state,
        escrowItems: state?.escrowItems?.map((item) =>
          item?.id === itemPayload?.id ? itemPayload : item
        ),
      }));
    } else {
      setForm((state) => ({
        ...state,
        escrowItems: [...(state?.escrowItems || []), itemPayload],
      }));
    }
  };

  const handleDeleteItem = (id: string) => {
    const escrowItems =
      form?.escrowItems?.filter((item) => item?.id !== id) || [];
    setForm((state) => ({ ...state, escrowItems }));
  };

  const validateForm = () => {
    if (!form?.escrowItems?.length) return "Your order list must not be empty";
    if (!form?.pickUpZone) {
      return "Pickup Zone is required";
    }
    if (!form?.deliveryZone) {
      return "Delivery Zone is required";
    }
  };

  const handleSubmit = () => {
    const error = validateForm();
    if (error) {
      notification({ title: "Form Error", message: error, type: "danger" });
      return;
    }
    onNext();
  };

  return (
    <div className="w-full bg-white px-10 py-8 rounded-lg shadow-md">
      <div className="w-full mb-10">
        <h3 className="font-bold text-xl ff-bold mb-2">Order Details</h3>
      </div>

      <div className="border-2 border-lightText/20 rounded-lg p-5 mb-10">
        <div className="w-full mb-5 flex justify-between">
          <div className="w-full mb-10">
            <h3 className="font-bold text-lg ff-bold mb-2">Item details</h3>
          </div>
          <div className="w-full mb-10 flex justify-end">
            <Button
              onClick={handleStartAdd}
              iconPosition="left"
              icon={<BiPlus className="mr-1 mb-1" />}
            >
              Add Item
            </Button>
          </div>
        </div>

        <div className="w-full rounded-lg shadow-md mb-5 overflow-x-auto overflow-y-visible ">
          <table className="w-full min-w-max table-auto text-left">
            <thead className="bg-lightText/10">
              <tr className="text-textColor">
                <th className="px-3 py-3 rounded-tl-lg">Item</th>
                <th className="px-3 py-3">No of Items</th>
                <th className="px-3 py-3">Price</th>
                <th className="px-3 py-3">Weight(KG)</th>
                <th className="px-3 py-3">Total Amount</th>
                <th className="px-3 py-3 rounded-tr-lg">{null}</th>
              </tr>
            </thead>
            <tbody className="">
              {form?.escrowItems?.map((item) => (
                <tr className="border-t" key={item?.id}>
                  <td className="px-3 py-3">{item?.name}</td>
                  <td className="px-3 py-3">{item?.quantity}</td>
                  <td className="px-3 py-3">{formatCurrency(item?.amount)}</td>
                  <td className="px-3 py-3">{`${item?.weight || 0}kg`}</td>
                  <td className="px-3 py-3">{formatCurrency(item?.total)}</td>
                  <td className="px-3 py-3 flex justify-end gap-4">
                    <button
                      onClick={() => handleEdit(item)}
                      className="hover:opacity-75 transition"
                    >
                      <Image src={Edit} alt="Edit" className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item?.id || "")}
                      className="hover:opacity-75 transition"
                    >
                      <Image src={Delete} alt="Delete" className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}

              {(form?.escrowItems?.length || 0) < 1 && (
                <tr>
                  <td colSpan={6}>
                    <NoData
                      sm
                      title="No data yet"
                      message={`To add a new item, simply click the "Add new item" button below.`}
                      py="py-5"
                    />
                    <div className="w-full my-10 flex justify-center">
                      <Button
                        onClick={handleStartAdd}
                        iconPosition="left"
                        icon={<BiPlus className="mr-1 mb-1" />}
                      >
                        Add Item
                      </Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {form?.escrowItems && form?.escrowItems?.length > 0 && (
          <div className="w-full mb-10">
            <SelectInput
              className="w-full mb-7"
              onChange={(val) => handleChange(val, "select", "pickUpZone")}
              value={form?.pickUpAddress}
              label="Pickup Zone*"
              options={[
                { label: "Within Ikeja", value: "WithinIkeja" },
                { label: "Victoria Island", value: "VictoriaIsland" },
              ]}
              placeholder="Select a Pickup Zone"
            />
            <SelectInput
              className="w-full mb-7"
              onChange={(val) => handleChange(val, "select", "deliveryZone")}
              value={form?.deliveryAddress}
              label="Delivery Zone*"
              options={[
                { label: "Within Ikeja", value: "WithinIkeja" },
                { label: "Victoria Island", value: "VictoriaIsland" },
              ]}
              placeholder="Select a Delivery Zone"
            />
            <div>
              <p className="text-base mb-1">Add Description</p>
              <TextareaInput
                rows={3}
                name="description"
                className="mb-5"
                value={form?.description}
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <FileInput
                name="contract"
                value={form?.contract}
                onChange={handleChange}
                label="Upload file"
              />
            </div>
          </div>
        )}
      </div>

      <div className="w-full mb-6">
        <label className="text-sm font-bold">Select Category</label>
        <div className="mt-2">
          <Select
            placeholder="Select category that your item falls into"
            options={categories.map((category) => ({
              label: category.category,
              value: category.categoryId,
            }))}
            onChange={() => {
              // Handle category selection
            }}
            styles={selectStyles}
          ></Select>
        </div>
      </div>

      <div className="w-full mb-6">
        <label className="text-sm font-bold">Select Package Size</label>
        <div
          className="w-full mt-2 p-3 border-2 border-dashed bg-[#F8F8F8] rounded-[10px] text-center cursor-pointer hover:bg-gray-50"
          onClick={() => setIsPackageSizeModalOpen(true)}
        >
          {selectedDimension ? (
            <div>
              <p className="font-semibold">{selectedDimension.name}</p>
              <p className="text-sm text-gray-500">{`Max Weight: ${selectedDimension.maxWeight}kg`}</p>
              <p className="text-blue-500 text-sm mt-1">Click to change</p>
            </div>
          ) : (
            <p>Click to select a package size</p>
          )}
        </div>
      </div>

      <div>
        <p className="pb-4 font-bold text-base">Shipping Details</p>

        <div className="md:flex gap-5 justify-between space-y-5 md:space-y-0">
          {/* Pickup Address */}
          <div className="w-full">
            <label className="text-sm font-bold">Pickup Address</label>
            <AsyncSelect
              cacheOptions
              defaultOptions
              loadOptions={loadSuggestions}
              onChange={(option) => {
                // Update your main form state
                handleChange(option, "select", "pickupAddress");
              }}
              placeholder="Enter pickup address"
              className="mt-2"
              styles={selectStyles}
            />
          </div>

          {/* Delivery Address */}
          <div className="w-full">
            <label className="text-sm font-bold">Delivery Address</label>
            <AsyncSelect
              cacheOptions
              defaultOptions
              loadOptions={loadSuggestions}
              onChange={(option) => {
                // Update your main form state
                handleChange(option, "select", "deliveryAddress");
              }}
              placeholder="Enter delivery address"
              className="mt-2"
              styles={selectStyles}
            />
          </div>
        </div>

        <div className="w-full flex justify-end">
          <Button
            paddingY="py-3"
            className="mt-8 md:mt-12 w-full md:w-auto"
            onClick={handleGetShippingRate}
          >
            Get Shipping Rate
          </Button>
        </div>
      </div>

      <div className="w-full mb-3 mt-8">
        <Button paddingY="py-3" className="w-full" onClick={handleSubmit}>
          Next: Recipient Details
        </Button>
      </div>

      {show && (
        <AddInvoiceItem
          data={itemToEdit}
          onAdd={handleAddItem}
          onClose={() => setShow(false)}
        />
      )}

      <SelectPackageSizeModal
        isOpen={isPackageSizeModalOpen}
        onClose={() => setIsPackageSizeModalOpen(false)}
        dimensions={dimensions}
        onSelect={handleSelectDimension}
      />

      <ShippingRatesModal
        isOpen={isRatesModalOpen}
        onClose={() => setIsRatesModalOpen(false)}
      />
    </div>
  );
}

export default OrderDetails;
