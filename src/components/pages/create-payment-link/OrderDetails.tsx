import React, { useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import AsyncSelect from "react-select/async";
import { useAccountsContext } from "../../../context/Accounts";

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
  validateAddress,
  getShippingRates,
} from "../../../services/api/shipbubble";
import {
  ShipBubbleCategory,
  ShipBubbleDimension,
  ValidatedAddress,
  ShippingRatesPayload,
} from "../../../types/shipbubble";
import TextInput from "../../inputs/Text";
import SelectPackageSizeModal from "./SelectPackageSizeModal";
import ShippingRatesModal, { RatesData } from "./ShippingRatesModal";

interface SelectAddressOption {
  label: string;
  value: string;
}

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
  const { accounts } = useAccountsContext();

  const { form, setForm } = useCreateInvoiceContext();
  const [show, setShow] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<OrderListItemProps>();

  const [categories, setCategories] = useState<ShipBubbleCategory[]>([]);

  const [dimensions, setDimensions] = useState<ShipBubbleDimension[]>([]);
  const [selectedDimension, setSelectedDimension] =
    useState<ShipBubbleDimension | null>(null);

  const [isPackageSizeModalOpen, setIsPackageSizeModalOpen] = useState(false);

  const [isLoadingShippingRates, setIsLoadingShippingRates] = useState(false);
  const [isRatesModalOpen, setIsRatesModalOpen] = useState(false);
  const [shippingRatesData, setShippingRatesData] = useState<
    RatesData | undefined
  >(undefined);
  const [selectedCourierInfo, setSelectedCourierInfo] = useState<string | null>(
    null
  );

  const [pickupAddressResponse, setPickupAddressResponse] =
    useState<ValidatedAddress | null>(null);
  const [deliveryAddressResponse, setDeliveryAddressResponse] =
    useState<ValidatedAddress | null>(null);

  const handleSelectDimension = (dimension: ShipBubbleDimension) => {
    setSelectedDimension(dimension);
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
    }, 500),
    []
  );

  const handleAddressValidation = async (
    selectedOption: SelectAddressOption | null,
    fieldName: "pickupAddress" | "deliveryAddress"
  ) => {
    if (!selectedOption) return;

    handleChange(selectedOption, "select", fieldName);

    const isPickupAddress = fieldName === "pickupAddress";

    const validationDetails = isPickupAddress
      ? {
          name:
            `${accounts?.identity?.personalDetail?.firstName || ""} ${
              accounts?.identity?.personalDetail?.lastName || ""
            }`.trim() || "",
          email: accounts?.identity?.personalDetail?.email || "",
          phone: accounts?.identity?.personalDetail?.phoneNumber || "",
          address: selectedOption.label,
          latitude: 0,
          longitude: 0,
        }
      : {
          name: form.recipientDetails?.recipientName || "",
          email: form.recipientDetails?.email || "",
          phone: form.recipientDetails?.phoneNumber || "",
          address: selectedOption.label,
          latitude: 0,
          longitude: 0,
        };

    try {
      const response = await validateAddress(validationDetails);

      if (response.isSuccess && response.data.isValid) {
        if (fieldName === "pickupAddress") {
          setPickupAddressResponse(response.data);
          console.log("Pickup Address Validation Response:", response.data);
        } else {
          setDeliveryAddressResponse(response.data);

          setForm((state) => ({
            ...state,
            recipientDetails: {
              ...state.recipientDetails,
              address: response.data.formattedAddress,
            },
          }));
        }
        notification({
          title: "Success",
          message: `${
            fieldName === "pickupAddress" ? "Pickup" : "Delivery"
          } address has been successfully validated.`,
          type: "success",
        });
      } else {
        notification({
          title: "Address Error",
          message: response.message || `The selected address is not valid.`,
          type: "danger",
        });
      }
    } catch (error) {
      notification({
        title: "API Error",
        message: "An error occurred while validating the address.",
        type: "danger",
      });
      console.error("Address validation error:", error);
    }
  };

  const handleGetShippingRate = async () => {
    if (!form?.description?.trim()) {
      notification({
        title: "Form Error",
        message: "Description is required to get shipping rates.",
        type: "danger",
      });
      return;
    }

    if(!form?.contract) {
      notification({
        title: "Form Error",
        message: "Please upload a product image before getting shipping rates.",
        type: "danger",
      });
      return;
    }

    if (
      !pickupAddressResponse?.addressCode ||
      !deliveryAddressResponse?.addressCode
    ) {
      notification({
        title: "Form Error",
        message:
          "Please select and wait for both pickup and delivery addresses to be validated.",
        type: "danger",
      });
      return;
    }

    if (!selectedDimension) {
      notification({
        title: "Form Error",
        message: "Please select a package size.",
        type: "danger",
      });
      return;
    }

    // Get selected category
    const selectedCategory = categories.find(
      (cat) => cat.categoryId === Number(form.categoryId)
    );

    if (!selectedCategory) {
      notification({
        title: "Form Error",
        message: "Please select a package category.",
        type: "danger",
      });
      return;
    }
    setIsLoadingShippingRates(true);

    try {
      const payload: ShippingRatesPayload = {
        senderAddressCode: parseInt(pickupAddressResponse.addressCode),
        receiverAddressCode: parseInt(deliveryAddressResponse.addressCode),
        pickupDate: new Date().toISOString().split("T")[0],
        categoryId: selectedCategory.categoryId,
        packageItems:
          form.escrowItems?.map((item) => ({
            name: item.name || "",
            description: item.name || "",
            unitWeight: item.weight?.toString() || "0",
            unitAmount: item.amount?.toString() || "0",
            quantity: item.quantity?.toString() || "0",
          })) || [],
        serviceType: "pickup",
        deliveryInstructions: form.description || "",
        packageDimension: {
          length: selectedDimension.length,
          width: selectedDimension.width,
          height: selectedDimension.height,
        },
      };

      const response = await getShippingRates(payload);

      if (response.isSuccess) {
        setShippingRatesData({
          ...response.data,
          requestToken: response.data.requestToken,
        });

        setIsRatesModalOpen(true);
      } else {
        notification({
          title: "Error",
          message: response.message || "Could not fetch shipping rates.",
          type: "danger",
        });
        setIsRatesModalOpen(false);
      }
    } catch (error) {
      notification({
        title: "API Error",
        message: "Could not fetch shipping rates.",
        type: "danger",
      });
      console.error("Shipping rates error:", error);
    } finally {
      setIsLoadingShippingRates(false);
    }
  };

  const isGetShippingRateReadyToCall = useMemo(
    () =>
      !!(
        pickupAddressResponse?.addressCode &&
        deliveryAddressResponse?.addressCode &&
        selectedDimension &&
        categories.find((cat) => cat.categoryId === Number(form.categoryId)) &&
        form?.recipientDetails?.recipientName?.trim() &&
        form.recipientDetails.recipientName.split(/\s+/).length >= 2
      ),
    [
      pickupAddressResponse?.addressCode,
      deliveryAddressResponse?.addressCode,
      selectedDimension,
      categories,
      form.categoryId,
      form.recipientDetails?.recipientName,
    ]
  );

  const handleChange = (val: any, inputType = "input", inputName = "") => {
    if (typeof val === "object" && val.target) {
      const { value, name, type, files } = val.target;

      // Check if this is a recipient field
      if (
        name === "recipientName" ||
        name === "email" ||
        name === "phoneNumber"
      ) {
        setForm((state) => ({
          ...state,
          recipientDetails: {
            ...state.recipientDetails,
            [name]: value,
          },
        }));
        return;
      }

      // Handle file inputs
      if (type === "file") {
        setForm((state) => ({
          ...state,
          [name]: files?.length > 1 ? Array.from(files) : files?.[0],
        }));
        return;
      }

      // Handle regular inputs
      setForm((state) => ({ ...state, [name]: value }));
    } else {
      // Handle select changes and other custom cases
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
    if (!form?.description?.trim()) return "Description is required";
    if (!form?.contract) return "Please upload a product image";

    // Recipient details
    if (!form?.recipientDetails?.recipientName?.trim())
      return "Recipient name is required";
    if (!form?.recipientDetails?.email?.trim())
      return "Recipient email is required";
    if (!form?.recipientDetails?.phoneNumber?.trim())
      return "Recipient phone number is required";

    // Category and package
    if (!form?.categoryId) return "Please select a category";
    if (!selectedDimension) return "Please select a package size";

    // Addresses
    if (!pickupAddressResponse)
      return "Please select and validate pickup address";
    if (!deliveryAddressResponse)
      return "Please select and validate delivery address";

    // Shipping rate
    if (!form?.selectedCourier) return "Please select a shipping rate";
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
            <div>
              <p className="text-base mb-1">
                Add Description{" "}
                <span className="text-red-600 text-sm">(required)</span>
              </p>
              <TextareaInput
                rows={3}
                name="description"
                className="mb-5"
                value={form?.description}
                onChange={handleChange}
                required
                onBlur={() => {
                  if (!form?.description?.trim()) {
                    notification({
                      title: "Form Error",
                      message: "Description is required",
                      type: "danger",
                    });
                  }
                }}
              />
            </div>
            <div className="w-full">
              <FileInput
                name="contract"
                value={form?.contract}
                onChange={handleChange}
                label="Upload Product Image"
                required
              />
            </div>
          </div>
        )}
      </div>

      <div className="border-2 border-lightText/20 rounded-lg p-5 mb-10">
        <h3 className="font-bold text-lg ff-bold mb-4">Recipient's Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            name="recipientName"
            value={form.recipientDetails?.recipientName || ""}
            onChange={handleChange}
            label="Recipient’s Name"
            placeholder="Enter name"
            onBlur={() => {
              const name = form.recipientDetails?.recipientName?.trim() || "";
              const nameParts = name.split(/\s+/);
              if (!name || nameParts.length < 2) {
                notification({
                  title: "Form Error",
                  message:
                    "Recipient name must include both first and last name",
                  type: "danger",
                });
              }
            }}
          />
          <TextInput
            name="email"
            value={form.recipientDetails?.email || ""}
            onChange={handleChange}
            label="Recipient’s Email"
            type="email"
            placeholder="Enter email"
          />
          <TextInput
            name="phoneNumber"
            value={form.recipientDetails?.phoneNumber || ""}
            onChange={(e) =>
              /^\d{0,12}$/g.test(e.target.value) && handleChange(e)
            }
            label="Recipient’s Phone Number"
            type="tel"
            placeholder="Enter phone number"
          />
        </div>
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
            onChange={(
              selectedOption: { label: string; value: number } | null
            ) => {
              if (selectedOption) {
                handleChange(selectedOption.value, "select", "categoryId");
              }
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
              onChange={(option: SelectAddressOption) => {
                handleAddressValidation(option, "pickupAddress");
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
              onChange={(option: SelectAddressOption) => {
                handleAddressValidation(option, "deliveryAddress");
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
            className={`${
              isLoadingShippingRates ? "animate-pulse" : ""
            } mt-8 md:mt-12 w-full md:w-auto`}
            onClick={handleGetShippingRate}
            disabled={isLoadingShippingRates || !isGetShippingRateReadyToCall}
          >
            {isLoadingShippingRates
              ? "Getting Rates..."
              : selectedCourierInfo
              ? "Change Shipping Rate"
              : "Get Shipping Rate"}
          </Button>
        </div>

        {selectedCourierInfo && (
          <div className="mt-4 text-center md:text-right">
            <p className="text-sm font-semibold text-gray-700">
              Selected Courier: &nbsp;
              <span className="text-md text-green-600">
                {selectedCourierInfo}
              </span>
            </p>
          </div>
        )}
      </div>

      <div className="w-full mb-3 mt-8">
        <Button
          paddingY="py-3"
          className="w-full"
          disabled={!!validateForm()}
          onClick={handleSubmit}
        >
          Next: Invoice Summary
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
        ratesData={shippingRatesData}
        isLoading={isLoadingShippingRates}
        onSelectCourier={(courier) => {
          setForm((prev) => ({ ...prev, selectedCourier: courier }));

          setSelectedCourierInfo(`${courier.courierName}`);

          notification({
            title: "Courier Selected",
            message: `${courier.courierName} has been selected.`,
            type: "success",
          });
        }}
      />
    </div>
  );
}

export default OrderDetails;
