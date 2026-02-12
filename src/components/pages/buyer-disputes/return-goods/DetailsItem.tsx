/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, {
  useCallback, useEffect, useMemo, useState
} from 'react';

import Select, { StylesConfig } from 'react-select';
import { debounce } from 'lodash';

// import Image from 'next/image';
import AsyncSelect from 'react-select/async';

import Button from '../../../inputs/Button';

import notification from '../../../../utilities/notification';
import {
  getGooglePlacesSuggestions, getPackageCategories, getPackageDimensions, getShippingRates, validateAddress
} from '../../../../services/api/shipbubble';

import TextInput from '../../../inputs/Text';
import { useAccountsContext } from '../../../../context/Accounts';

// import Edit from "../../../../assets/svgs/edit-order.svg";
// import Delete from "../../../../assets/svgs/delete.svg";
import FileInput from '../../../inputs/File';
import { formatCurrency } from '../../../../utilities/general';

import { useReturnGoodsContext } from '../../../../context/ReturnGoods';

import TextareaInput from '../../../inputs/Textarea';

import {
  ShipBubbleCategory, ShipBubbleDimension, ShippingRatesPayload, ValidatedAddress
} from './shipbubble';

import ShippingRatesModal, { RatesData } from "./ShippingRatesModal";
import SelectPackageSizeModal from './SelectPackageSizeModal';

interface SelectAddressOption {
    label: string;
    value: string;
}

const selectStyles: StylesConfig<any, false> = {
  control: (base: any) => ({
    ...base,
    height: "3rem",
    border: "1px solid #CFCFCF",
    borderRadius: "10px",
    backgroundColor: "#F8F8F8",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#CFCFCF"
    }
  })
};

export default function ReturnDetailsPage() {
  const { invoice, setInvoice } = useReturnGoodsContext();
  const { accounts } = useAccountsContext();

  //   const [show, setShow] = useState(false);
  //   const [itemToEdit, setItemToEdit] = useState<OrderListItemProps | null>(null);

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

  const [showManualPickup, setShowManualPickup] = useState(false);
  const [showManualDelivery, setShowManualDelivery] = useState(false);
  const [manualPickupAddress, setManualPickupAddress] = useState({
    houseNo: '',
    streetName: '',
    state: '',
    lga: '',
    landmark: ''
  });
  const [manualDeliveryAddress, setManualDeliveryAddress] = useState({
    houseNo: '',
    streetName: '',
    state: '',
    lga: '',
    landmark: ''
  });
  const [isValidatingPickup, setIsValidatingPickup] = useState(false);
  const [isValidatingDelivery, setIsValidatingDelivery] = useState(false);

  // const handleDeleteItem = (id: string) => {
  //   const escrowItems =
  //           invoice?.escrowItems?.filter((item: any) => item?.id !== id) || [];
  //   setInvoice((state) => ({ ...state, escrowItems }));
  // };

  // const handleEdit = (data: any) => {
  //   // setItemToEdit(data);
  //   // setShow(true);
  // };

  // Fetch Categories
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [categoriesResponse, dimensionsResponse] = await Promise.all([
          getPackageCategories(),
          getPackageDimensions()
        ]);

        if (categoriesResponse.isSuccess) {
          setCategories(categoriesResponse.data.categories);
        }

        if (dimensionsResponse.isSuccess) {
          setDimensions(dimensionsResponse.data.dimensions);
        }
      } catch (error) {
        // console.error("Error fetching data:", error);
        notification({
          title: "Error",
          message: "Could not load shipping details.",
          type: "danger"
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
            value: suggestion.placeId
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

  const handleManualAddressValidation = async (
    fieldName: "pickupAddress" | "deliveryAddress"
  ) => {
    const isPickup = fieldName === "pickupAddress";
    const manualAddress = isPickup ? manualPickupAddress : manualDeliveryAddress;
    const setValidating = isPickup ? setIsValidatingPickup : setIsValidatingDelivery;

    if (!manualAddress.houseNo.trim() || !manualAddress.streetName.trim() ||
            !manualAddress.state.trim() ||
            !manualAddress.lga.trim() ||
            !manualAddress.landmark.trim()) {
      notification({
        title: "Form Error",
        message: "Please fill in all address fields",
        type: "danger"
      });
      return;
    }

    const combinedAddress = `${manualAddress.houseNo}, ${manualAddress.streetName}, ${manualAddress.state}, ${manualAddress.lga}, ${manualAddress.landmark}, Nigeria`;

    setValidating(true);

    const validationDetails = isPickup
      ? {
        name: `${accounts?.identity?.personalDetail?.firstName || ""} ${accounts?.identity?.personalDetail?.lastName || ""}`.trim() || "",
        email: accounts?.identity?.personalDetail?.email || "",
        phone: accounts?.identity?.personalDetail?.phoneNumber || "",
        address: combinedAddress,
        latitude: 0,
        longitude: 0
      }
      : {
        name: invoice.businessName || "",
        email: invoice.businessEmail || "",
        phone: invoice.businessPhone || "",
        address: combinedAddress,
        latitude: 0,
        longitude: 0
      };

    try {
      const response = await validateAddress(validationDetails);

      if (response.isSuccess && response.data.isValid) {
        if (isPickup) {
          setPickupAddressResponse(response.data);
        } else {
          setDeliveryAddressResponse(response.data);
          setInvoice((state) => ({
            ...state,
            recipientDetails: {
              ...state.recipientDetails,
              address: response.data.formattedAddress
            }
          }));
        }
        notification({
          title: "Success",
          message: `${isPickup ? "Pickup" : "Delivery"} address has been successfully validated.`,
          type: "success"
        });
      } else {
        notification({
          title: "Address Error",
          message: response.message || "The address could not be validated.",
          type: "danger"
        });
      }
    } catch (error) {
      notification({
        title: "API Error",
        message: "An error occurred while validating the address.",
        type: "danger"
      });
      // console.error("Manual address validation error:", error);
    } finally {
      setValidating(false);
    }
  };

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
                    `${accounts?.identity?.personalDetail?.firstName || ""} ${accounts?.identity?.personalDetail?.lastName || ""
                    }`.trim() || "",
        email: accounts?.identity?.personalDetail?.email || "",
        phone: accounts?.identity?.personalDetail?.phoneNumber || "",
        address: selectedOption.label,
        latitude: 0,
        longitude: 0
      }
      : {
        name: invoice.businessName || "",
        email: invoice.businessEmail || "",
        phone: invoice.businessPhone || "",
        address: selectedOption.label,
        latitude: 0,
        longitude: 0
      };

    try {
      const response = await validateAddress(validationDetails);

      if (response.isSuccess && response.data.isValid) {
        if (fieldName === "pickupAddress") {
          setPickupAddressResponse(response.data);
          console.log("Pickup Address Validation Response:", response.data);
        } else {
          setDeliveryAddressResponse(response.data);

          setInvoice((state) => ({
            ...state,
            recipientDetails: {
              ...state.recipientDetails,
              address: response.data.formattedAddress
            }
          }));
        }
        notification({
          title: "Success",
          message: `${fieldName === "pickupAddress" ? "Pickup" : "Delivery"
          } address has been successfully validated.`,
          type: "success"
        });
      } else {
        notification({
          title: "Address Error",
          message: response.message || `The selected address is not valid.`,
          type: "danger"
        });
      }
    } catch (error) {
      notification({
        title: "API Error",
        message: "An error occurred while validating the address.",
        type: "danger"
      });
      console.error("Address validation error:", error);
    }
  };

  const handleGetShippingRate = async () => {
    if (!invoice?.description?.trim()) {
      notification({
        title: "Form Error",
        message: "Description is required to get shipping rates.",
        type: "danger"
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
        type: "danger"
      });
      return;
    }

    if (!selectedDimension) {
      notification({
        title: "Form Error",
        message: "Please select a package size.",
        type: "danger"
      });
      return;
    }

    // Get selected category
    const selectedCategory = categories.find(
      (cat) => cat.categoryId === Number(invoice.categoryId)
    );

    if (!selectedCategory) {
      notification({
        title: "Form Error",
        message: "Please select a package category.",
        type: "danger"
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
                    invoice.items?.map((item: any) => ({
                      name: item.name || "",
                      description: item.name || "",
                      unitWeight: item.weightKg?.toString() || "0",
                      unitAmount: item.unitPrice?.toString() || "0",
                      quantity: item.quantity?.toString() || "0"
                    })) || [],
        serviceType: "pickup",
        deliveryInstructions: invoice.description || "",
        packageDimension: {
          length: selectedDimension.length,
          width: selectedDimension.width,
          height: selectedDimension.height
        }
      };

      const response = await getShippingRates(payload);

      if (response.isSuccess) {
        setShippingRatesData({
          ...response.data,
          requestToken: response.data.requestToken
        });

        setIsRatesModalOpen(true);
      } else {
        notification({
          title: "Error",
          message: response.message || "Could not fetch shipping rates.",
          type: "danger"
        });
        setIsRatesModalOpen(false);
      }
    } catch (error) {
      notification({
        title: "API Error",
        message: "Could not fetch shipping rates.",
        type: "danger"
      });
      // console.error("Shipping rates error:", error);
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
                categories.find((cat) => cat.categoryId === Number(invoice.categoryId)) &&
                invoice?.businessName?.trim() &&
                invoice.businessEmail?.trim() &&
                invoice.businessPhone?.trim()
      ),
    [pickupAddressResponse?.addressCode, deliveryAddressResponse?.addressCode, selectedDimension, categories, invoice?.businessName, invoice.businessEmail, invoice.businessPhone, invoice.categoryId]
  );

  const handleChange = (val: any, inputType = "input", inputName = "") => {
    if (typeof val === "object" && val.target) {
      const {
        value, name, type, files
      } = val.target;

      // Check if this is a recipient field
      if (
        name === "recipientName" ||
                name === "email" ||
                name === "phoneNumber"
      ) {
        setInvoice((state) => ({
          ...state,
          recipientDetails: {
            ...state.recipientDetails,
            [name]: value
          }
        }));
        return;
      }

      // Handle file inputs
      if (type === "file") {
        setInvoice((state) => ({
          ...state,
          [name]: files?.length > 1 ? Array.from(files) : files?.[0]
        }));
        return;
      }

      // Handle regular inputs
      setInvoice((state) => ({ ...state, [name]: value }));
    } else {
      // Handle select changes and other custom cases
      setInvoice((state) => ({ ...state, [inputName]: val }));
    }
  };

  let shippingButtonLabel = "Get Shipping Rate";
  if (isLoadingShippingRates) {
    shippingButtonLabel = "Getting Rates...";
  } else if (selectedCourierInfo) {
    shippingButtonLabel = "Change Shipping Rate";
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 rounded-lg shadow-md">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-lg font-bold text-gray-900">Return Details</h1>
        </div>

        <div className="">
          <div className="">
            <div className="w-full rounded-lg mb-5 overflow-x-auto overflow-y-visible ">
              <table className="w-full min-w-max table-auto text-left">
                <thead className="bg-lightText/10">
                  <tr className="text-textColor">
                    <th className="px-3 py-3 rounded-tl-lg">Item</th>
                    <th className="px-3 py-3">No of Items</th>
                    <th className="px-3 py-3">Price</th>
                    <th className="px-3 py-3">Weight(KG)</th>
                    <th className="px-3 py-3">Total Amount</th>
                    {/* <th className="px-3 py-3 rounded-tr-lg">{null}</th> */}
                  </tr>
                </thead>
                <tbody className="">
                  {invoice?.items?.map((item: any) => (
                    <tr className="border-t" key={item?.id}>
                      <td className="px-3 py-3">{item?.name}</td>
                      <td className="px-3 py-3">{item?.quantity}</td>
                      <td className="px-3 py-3">{formatCurrency(item?.unitPrice)}</td>
                      <td className="px-3 py-3">{`${item?.weight || 0}kg`}</td>
                      <td className="px-3 py-3">{formatCurrency(item?.total)}</td>
                      {/* <td className="px-3 py-3 flex justify-end gap-4">
                        <button
                          onClick={() => handleEdit(item)}
                          disabled={true}
                          className="hover:opacity-75 transition"
                        >
                          <Image src={Edit} alt="Edit" className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item?.id || "")}
                          disabled={true}
                          className="hover:opacity-75 transition"
                        >
                          <Image src={Delete} alt="Delete" className="w-5 h-5" />
                        </button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="w-full mb-6">
              <label className="text-sm">Select Category</label>
              <div className="mt-2">
                <Select<{ label: string; value: number }, false>
                  placeholder="Select category that your item falls into"
                  options={categories.map((category) => ({
                    label: category.category,
                    value: category.categoryId
                  }))}
                  onChange={(selectedOption: { value: any; }) => {
                    if (selectedOption) {
                      handleChange(selectedOption.value, "select", "categoryId");
                    }
                  }}
                  styles={selectStyles}
                />
              </div>
            </div>

            <div className="w-full mb-6">
              <label className="text-sm ">Select Package Size</label>
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
            <div className="mb-8">
              <p className="text-base mb-1">
                Add Description{" "}
                <span className="text-red-600 text-sm">(required)</span>
              </p>
              <TextareaInput
                rows={3}
                name="description"
                className="mb-5"
                value={invoice?.description}
                onChange={handleChange}
                required
                onBlur={() => {
                  if (!invoice?.description?.trim()) {
                    notification({
                      title: "Form Error",
                      message: "Description is required",
                      type: "danger"
                    });
                  }
                }}
              />
            </div>
            <div className="w-full mb-10">
              <FileInput
                name="contract"
                value={invoice?.contract}
                onChange={handleChange}
                label="Upload Product Image"
                required
              />
            </div>
            <div className=''>
              <p className="pb-4 font-bold text-base">Shipping Details</p>

              <div className="md:flex gap-5 justify-between space-y-5 md:space-y-0">
                <div className="w-full">
                  <label className="text-sm font-bold">Pickup Address</label>
                  {!showManualPickup ? (
                    <>
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
                      <button
                        type="button"
                        onClick={() => {
                          setShowManualPickup(true);
                          setPickupAddressResponse(null);
                        }}
                        className="text-sm text-blue-600 hover:text-blue-800 mt-2 underline"
                      >
                        {"Can't find address? Click here"}
                      </button>
                    </>
                  ) : (
                    <div className="mt-2 space-y-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Manual Address Entry</p>
                      <div className="grid grid-cols-1 gap-3">
                        <TextInput
                          name="pickupHouseNo"
                          value={manualPickupAddress.houseNo}
                          onChange={(e) => setManualPickupAddress((prev) => ({ ...prev, houseNo: e.target.value }))}
                          label="House No."
                          placeholder="e.g. 12A"
                        />
                        <TextInput
                          name="pickupStreetName"
                          value={manualPickupAddress.streetName}
                          onChange={(e) => setManualPickupAddress((prev) => ({ ...prev, streetName: e.target.value }))}
                          label="Street Name"
                          placeholder="e.g. Admiralty Way"
                        />
                        <TextInput
                          name="pickupLga"
                          value={manualPickupAddress.lga}
                          onChange={(e) => setManualPickupAddress((prev) => ({ ...prev, lga: e.target.value }))}
                          label="LGA"
                          placeholder="e.g. Lekki"
                        />
                        <TextInput
                          name="pickupLandmark"
                          value={manualPickupAddress.landmark}
                          onChange={(e) => setManualPickupAddress((prev) => ({ ...prev, landmark: e.target.value }))}
                          label="Landmark"
                          placeholder="e.g. Near GTBank"
                        />
                        <TextInput
                          name="pickupState"
                          value={manualPickupAddress.state}
                          onChange={(e) => setManualPickupAddress((prev) => ({ ...prev, state: e.target.value }))}
                          label="State"
                          placeholder="e.g. Lagos"
                        />
                      </div>
                      <div className="mt-3 flex space-x-2">
                        <Button
                          textColor="text-primary"
                          bgColor="bg-primary/0"
                          className="bg-transparent border border-success w-full text-success"
                          onClick={() => {
                            setShowManualPickup(false);
                            setManualPickupAddress({
                              houseNo: '',
                              streetName: '',
                              lga: '',
                              state: '',
                              landmark: ''
                            });
                            setPickupAddressResponse(null);
                          }}
                        >
                                                    Search
                        </Button>
                        <Button
                          className="bg-success w-full text-lg font-bold"
                          onClick={() => handleManualAddressValidation("pickupAddress")}
                          disabled={isValidatingPickup}
                        >
                          {isValidatingPickup ? "Validating..." : "Verify"}
                        </Button>

                      </div>
                      {pickupAddressResponse && (
                        <p className="text-sm text-green-600 mt-2">Address validated successfully</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="w-full">
                  <label className="text-sm font-bold">Delivery Address</label>
                  {!showManualDelivery ? (
                    <>
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
                      <button
                        type="button"
                        onClick={() => {
                          setShowManualDelivery(true);
                          setDeliveryAddressResponse(null);
                        }}
                        className="text-sm text-blue-600 hover:text-blue-800 mt-2 underline"
                      >
                        {"Can't find address? Click here"}
                      </button>
                    </>
                  ) : (
                    <div className="mt-2 space-y-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Manual Address Entry</p>
                      <div className="grid grid-cols-1 gap-3">
                        <TextInput
                          name="deliveryHouseNo"
                          value={manualDeliveryAddress.houseNo}
                          onChange={(e) => setManualDeliveryAddress((prev) => ({ ...prev, houseNo: e.target.value }))}
                          label="House No."
                          placeholder="e.g. 12A"
                        />
                        <TextInput
                          name="deliveryStreetName"
                          value={manualDeliveryAddress.streetName}
                          onChange={(e) => setManualDeliveryAddress((prev) => ({ ...prev, streetName: e.target.value }))}
                          label="Street Name"
                          placeholder="e.g. Admiralty Way"
                        />
                        <TextInput
                          name="deliveryLga"
                          value={manualDeliveryAddress.lga}
                          onChange={(e) => setManualDeliveryAddress((prev) => ({ ...prev, lga: e.target.value }))}
                          label="LGA"
                          placeholder="e.g. Lekki"
                        />
                        <TextInput
                          name="deliveryLandmark"
                          value={manualDeliveryAddress.landmark}
                          onChange={(e) => setManualDeliveryAddress((prev) => ({ ...prev, landmark: e.target.value }))}
                          label="Landmark"
                          placeholder="e.g. Near GTBank"
                        />
                        <TextInput
                          name="deliveryState"
                          value={manualDeliveryAddress.state}
                          onChange={(e) => setManualDeliveryAddress((prev) => ({ ...prev, state: e.target.value }))}
                          label="State"
                          placeholder="e.g. Lagos"
                        />
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button
                          textColor="text-primary"
                          bgColor="bg-primary/0"
                          className="bg-transparent border border-success w-full text-success"
                          onClick={() => {
                            setShowManualDelivery(false);
                            setManualDeliveryAddress({
                              houseNo: '',
                              streetName: '',
                              lga: '',
                              state: '',
                              landmark: ''
                            });
                            setDeliveryAddressResponse(null);
                          }}
                        >
                                                    Search
                        </Button>
                        <Button
                          className="bg-success w-full text-lg font-bold"
                          onClick={() => handleManualAddressValidation("deliveryAddress")}
                          disabled={isValidatingDelivery}
                        >
                          {isValidatingDelivery ? "Validating..." : "Verify"}
                        </Button>

                      </div>
                      {deliveryAddressResponse && (
                        <p className="text-sm text-green-600 mt-2">Address validated successfully</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full flex justify-end mt-5">
                <Button
                  disabled={isLoadingShippingRates || !isGetShippingRateReadyToCall}
                  onClick={handleGetShippingRate}
                >
                  {shippingButtonLabel}
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

          </div>
        </div>
      </div>
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
          setInvoice((prev) => ({ ...prev, selectedCourier: courier }));

          setSelectedCourierInfo(`${courier.courierName}`);

          notification({
            title: "Courier Selected",
            message: `${courier.courierName} has been selected.`,
            type: "success"
          });
        }}
      />
    </div>
  );
}
