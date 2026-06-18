/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import AsyncSelect from "react-select/async";

import { BiPlus } from "react-icons/bi";
import { MapPin } from "lucide-react";

import Image from "next/image";

import Select, { StylesConfig } from "react-select";

import { useAccountsContext } from "../../../context/Accounts";

import { OrderListItemProps } from "../../../types/invoice";

import NoData from "../../common/NoData";
import Button from "../../inputs/Button";
import { useCreateInvoiceContext } from "../../../context/CreateInvoice";
import { formatCurrency } from "../../../utilities/general";
import notification from "../../../utilities/notification";
import FileInput from "../../inputs/File";

import TextareaInput from "../../inputs/Textarea";

import Edit from "../../../assets/svgs/edit-order.svg";
import Delete from "../../../assets/svgs/delete.svg";

import {
  getPackageCategories,
  getPackageDimensions,
  getGooglePlacesSuggestions,
  validateAddress,
  getShippingRates,
} from "../../../services/api/shipbubble";

import {
  LocationSuggestion,
  getLocationSuggestionFromCurrentPosition,
} from "../../../services/api/currentLocation";

import {
  ShipBubbleCategory,
  ShipBubbleDimension,
  ShippingRatesPayload,
  ValidatedAddress,
} from "../../../types/shipbubble";

import TextInput from "../../inputs/Text";

import ToggleInput from "../../inputs/Toggle";

import AddInvoiceItem from "./AddInvoiceItem";

import SelectPackageSizeModal from "./SelectPackageSizeModal";
import ShippingRatesModal, { RatesData } from "./ShippingRatesModal";
import { useRouter } from "next/router";

import { LocationSuggestionModal } from "./CurrentLocationModal";
import handleFetch from "../../../services/api/handleFetch";
import { useMutation } from "react-query";
import useGetQuery from "../../../hooks/useGetQuery";

import { useFormDraft } from "../../../hooks/useFormDraft";
import ResumeDraftModal from "./ResumeDraftModal";

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
      borderColor: "#CFCFCF",
    },
  }),
};

function OrderDetails({ onNext = () => {} }: { onNext?: () => void }) {
  const { accounts } = useAccountsContext();
  const router = useRouter();
  const editId = router.query.id as string | undefined;
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
    null,
  );
  const [deliveryAttempted, setDeliveryAttempted] = useState(false);

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
    houseNo: "",
    streetName: "",
    state: "",
    lga: "",
    landmark: "",
  });
  const [manualDeliveryAddress, setManualDeliveryAddress] = useState({
    houseNo: "",
    streetName: "",
    state: "",
    lga: "",
    landmark: "",
  });
  const [isValidatingPickup, setIsValidatingPickup] = useState(false);
  const [isValidatingDelivery, setIsValidatingDelivery] = useState(false);

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [currentLocationSuggestion, setCurrentLocationSuggestion] =
    useState<LocationSuggestion | null>(null);
  const [isLoadingCurrentLocation, setIsLoadingCurrentLocation] =
    useState(false);
  const [, setLocationError] = useState<string | null>(null);
  const [pickupSelectValue, setPickupSelectValue] =
    useState<SelectAddressOption | null>(null);

  const [showResumeDraftModal, setShowResumeDraftModal] = useState(false);
  const [pendingDraft, setPendingDraft] = useState<any>(null);

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

  const { data: draftData } = useGetQuery({
    service: "wallet-service/api/v1/",
    endpoint: `escrows/orders/${editId}`,
    queryKey: ["escrow-order-draft", editId],
    enabled: !!editId,
  });

  useEffect(() => {
    if (!draftData?.data || !editId) return;

    const d = draftData.data;

    setForm((prev) => ({
      ...prev,
      description: d.description || "",
      recipientDetails: {
        recipientName: d.recipientName || "",
        email: d.recipientEmail || "",
        phoneNumber: d.recipientPhone || "",
        address: d.recipientAddress || "",
      },
      isDeliveryOnUs: d.buyerPaysEscrowFee ?? prev.isDeliveryOnUs,
      escrowItems:
        d.items?.map((item: any, index: number) => {
          const parseAmount = (val: string | number) =>
            typeof val === "string"
              ? parseFloat(val.replace(/[^0-9.]/g, "")) || 0
              : Number(val) || 0;

          const quantity = Number(item.quantity) || 0;
          const unitPrice = parseAmount(item.unitPrice);
          const total = parseAmount(item.total);

          return {
            id: String(index + 1),
            name: item.name || "",
            quantity,
            amount: unitPrice,
            total: total || quantity * unitPrice,
            weight: item.weightKg || 0,
          };
        }) || [],
    }));
  }, [draftData?.data, editId]);

  const parseAmount = (val: string | number) =>
    typeof val === "string"
      ? parseFloat(val.replace(/[^0-9.]/g, "")) || 0
      : Number(val) || 0;

  const applyDraft = useCallback(
    (d: any) => {
      setForm((prev) => ({
        ...prev,
        description: d.description || "",
        recipientDetails: d.recipientDetails || prev.recipientDetails,
        isDeliveryOnUs: d.isDeliveryOnUs ?? prev.isDeliveryOnUs,
        categoryId: d.categoryId || prev.categoryId,
        selectedCourier: d.selectedCourier || prev.selectedCourier,
        escrowItems:
          d.escrowItems?.map((item: any, index: number) => {
            const quantity = Number(item.quantity) || 0;
            const unitPrice = parseAmount(item.amount ?? item.unitPrice);
            const total = parseAmount(item.total);
            return {
              id: item.id || String(index + 1),
              name: item.name || "",
              quantity,
              amount: unitPrice,
              total: total || quantity * unitPrice,
              weight: item.weight || item.weightKg || 0,
            };
          }) || [],
      }));
    },
    [setForm],
  );

 const { deleteDraft } = useFormDraft(
  editId ? null : form,
  (draft: any) => {
    if (editId) return;
    setPendingDraft(draft);
    setShowResumeDraftModal(true);
  },
  (hasDraft: any) => {
    if (!hasDraft) setShowResumeDraftModal(false);
  },
);

  useEffect(() => {
    handleChange(true, "toggle", "isDeliveryOnUs");
    window.scrollTo(0, 0);
  }, []);

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
    [],
  );

  const uploadMutation = useMutation(handleFetch, {
    onError: (err: any) => {
      notification({
        title: "Upload Error",
        message: err?.toString() || "Failed to upload document.",
        type: "danger",
      });
    },
  });

  const handleUseCurrentLocation = async () => {
    setIsLoadingCurrentLocation(true);
    setLocationError(null);

    try {
      const suggestion = await getLocationSuggestionFromCurrentPosition();
      setCurrentLocationSuggestion(suggestion);
      setIsLocationModalOpen(true);
    } catch (error: any) {
      console.error("[OrderDetails] Location error:", error);
      setLocationError(
        error.message || "Unable to fetch your location. Please try again.",
      );
      notification({
        title: "Location Error",
        message:
          error.message || "Unable to fetch your location. Please try again.",
        type: "danger",
      });
    } finally {
      setIsLoadingCurrentLocation(false);
    }
  };

  const handleSelectLocationFromModal = async (
    location: LocationSuggestion,
  ) => {
    setPickupSelectValue({
      label: location.address,
      value: location.address,
    });

    const validationDetails = {
      name:
        `${accounts?.identity?.personalDetail?.firstName || ""} ${accounts?.identity?.personalDetail?.lastName || ""}`.trim() ||
        "",
      email: accounts?.identity?.personalDetail?.email || "",
      phone: accounts?.identity?.personalDetail?.phoneNumber || "",
      address: location.address,
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng,
    };

    try {
      setIsValidatingPickup(true);
      const response = await validateAddress(validationDetails);

      if (response.isSuccess && response.data.isValid) {
        setPickupAddressResponse(response.data);
        setShowManualPickup(false);
        setManualPickupAddress({
          houseNo: "",
          streetName: "",
          state: "",
          lga: "",
          landmark: "",
        });
        notification({
          title: "Success",
          message: "Pickup address has been successfully validated.",
          type: "success",
        });
      } else {
        notification({
          title: "Address Error",
          message: response.message || "The address could not be validated.",
          type: "danger",
        });
      }
    } catch (error) {
      notification({
        title: "API Error",
        message: "An error occurred while validating the address.",
        type: "danger",
      });
    } finally {
      setIsValidatingPickup(false);
    }
  };

  const handleManualAddressValidation = async (
    fieldName: "pickupAddress" | "deliveryAddress",
  ) => {
    const isPickup = fieldName === "pickupAddress";
    const manualAddress = isPickup
      ? manualPickupAddress
      : manualDeliveryAddress;
    const setValidating = isPickup
      ? setIsValidatingPickup
      : setIsValidatingDelivery;

    if (
      !manualAddress.houseNo.trim() ||
      !manualAddress.streetName.trim() ||
      !manualAddress.state.trim() ||
      !manualAddress.lga.trim() ||
      !manualAddress.landmark.trim()
    ) {
      notification({
        title: "Form Error",
        message: "Please fill in all address fields",
        type: "danger",
      });
      return;
    }

    const combinedAddress = `${manualAddress.houseNo}, ${manualAddress.streetName}, ${manualAddress.state}, ${manualAddress.lga}, ${manualAddress.landmark}, Nigeria`;

    setValidating(true);

    const validationDetails = isPickup
      ? {
          name:
            `${accounts?.identity?.personalDetail?.firstName || ""} ${accounts?.identity?.personalDetail?.lastName || ""}`.trim() ||
            "",
          email: accounts?.identity?.personalDetail?.email || "",
          phone: accounts?.identity?.personalDetail?.phoneNumber || "",
          address: combinedAddress,
          latitude: 0,
          longitude: 0,
        }
      : {
          name: form.recipientDetails?.recipientName || "",
          email: form.recipientDetails?.email || "",
          phone: form.recipientDetails?.phoneNumber || "",
          address: combinedAddress,
          latitude: 0,
          longitude: 0,
        };

    try {
      const response = await validateAddress(validationDetails);

      if (response.isSuccess && response.data.isValid) {
        if (isPickup) {
          setPickupAddressResponse(response.data);
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
          message: `${isPickup ? "Pickup" : "Delivery"} address has been successfully validated.`,
          type: "success",
        });
      } else {
        notification({
          title: "Address Error",
          message: response.message || "The address could not be validated.",
          type: "danger",
        });
      }
    } catch (error) {
      notification({
        title: "API Error",
        message: "An error occurred while validating the address.",
        type: "danger",
      });
      // console.error("Manual address validation error:", error);
    } finally {
      setValidating(false);
    }
  };

  const handleAddressValidation = async (
    selectedOption: SelectAddressOption | null,
    fieldName: "pickupAddress" | "deliveryAddress",
  ) => {
    if (!selectedOption) return;

    handleChange(selectedOption, "select", fieldName);

    const isPickupAddress = fieldName === "pickupAddress";

    const validationDetails = isPickupAddress
      ? {
          name:
            `${accounts?.identity?.personalDetail?.firstName || ""} ${accounts?.identity?.personalDetail?.lastName || ""}`.trim() ||
            "",
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
          message: `${fieldName === "pickupAddress" ? "Pickup" : "Delivery"} address has been successfully validated.`,
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

    if (!form?.contract) {
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

    const selectedCategory = categories.find(
      (cat) => cat.categoryId === Number(form.categoryId),
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
    ],
  );

  const handleChange = (val: any, inputType = "input", inputName = "") => {
    if (typeof val === "object" && val.target) {
      const { value, name, type, files } = val.target;

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

      if (type === "file") {
        setForm((state) => ({
          ...state,
          [name]: files?.length > 1 ? Array.from(files) : files?.[0],
        }));
        return;
      }

      setForm((state) => ({ ...state, [name]: value }));
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
    console.log(itemPayload);

    if (form?.escrowItems?.find((item) => item.id === itemPayload.id)) {
      setForm((state) => ({
        ...state,
        escrowItems: state?.escrowItems?.map((item) =>
          item?.id === itemPayload?.id ? itemPayload : item,
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

    if (!form?.recipientDetails?.recipientName?.trim())
      return "Recipient name is required";
    if (!form?.recipientDetails?.email?.trim())
      return "Recipient email is required";
    if (!form?.recipientDetails?.phoneNumber?.trim())
      return "Recipient phone number is required";

    if (form?.isDeliveryOnUs) {
      if (!form?.categoryId) return "Please select a category";
      if (!selectedDimension) return "Please select a package size";

      if (!pickupAddressResponse)
        return "Please select and validate pickup address";
      if (!deliveryAddressResponse)
        return "Please select and validate delivery address";

      if (!form?.selectedCourier) return "Please select a shipping rate";
    }
  };

  const isRecipientDetailsComplete = useMemo(() => {
    const name = form.recipientDetails?.recipientName?.trim() || "";
    const email = form.recipientDetails?.email?.trim() || "";
    const phone = form.recipientDetails?.phoneNumber?.trim() || "";

    return name && name.split(/\s+/).length >= 2 && email && phone;
  }, [form.recipientDetails]);

  const recipientNameInvalid =
    deliveryAttempted &&
    (!form.recipientDetails?.recipientName?.trim() ||
      form.recipientDetails.recipientName.split(/\s+/).length < 2);

  const recipientEmailInvalid =
    deliveryAttempted && !form.recipientDetails?.email?.trim();

  const recipientPhoneInvalid =
    deliveryAttempted && !form.recipientDetails?.phoneNumber?.trim();

  const handleSubmit = () => {
    const error = validateForm();
    if (error) {
      notification({ title: "Form Error", message: error, type: "danger" });
      return;
    }
    deleteDraft();
    onNext();
  };

  let shippingButtonLabel = "Get Shipping Rate";
  if (isLoadingShippingRates) {
    shippingButtonLabel = "Getting Rates...";
  } else if (selectedCourierInfo) {
    shippingButtonLabel = "Change Shipping Rate";
  }

  const saveForLaterMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      notification({
        title: "Saved",
        message: "Your order has been saved for later",
        type: "success",
      });
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Could not save order. Please try again.",
        type: "danger",
      });
    },
  });

  const validateSaveForLater = () => {
    const hasItems = (form?.escrowItems?.length || 0) > 0;
    const hasDescription = !!form?.description?.trim();
    const hasRecipientName = !!form?.recipientDetails?.recipientName?.trim();
    const hasRecipientEmail = !!form?.recipientDetails?.email?.trim();
    const hasRecipientPhone = !!form?.recipientDetails?.phoneNumber?.trim();

    return (
      hasItems ||
      hasDescription ||
      hasRecipientName ||
      hasRecipientEmail ||
      hasRecipientPhone
    );
  };

  const handleSaveForLater = async () => {
    if (!validateSaveForLater()) {
      notification({
        title: "Nothing to Save",
        message: "Please fill in at least one field before saving for later.",
        type: "danger",
      });
      return;
    }
    let photoUrls: string[] = [];

    if (form?.contract) {
      const uploadBody = new FormData();
      const files = Array.isArray(form.contract)
        ? form.contract
        : [form.contract];
      files.forEach((file) => {
        uploadBody.append("images", file);
      });

      try {
        const uploadResponse: any = await uploadMutation.mutateAsync({
          service: "wallet-service",
          endpoint: "upload",
          method: "POST",
          body: uploadBody,
          auth: true,
          multipart: true,
        });

        if (uploadResponse?.data) {
          photoUrls = Array.isArray(uploadResponse.data)
            ? uploadResponse.data
                .map((item: any) => item?.url || item)
                .filter(Boolean)
            : [uploadResponse.data?.url || uploadResponse.data].filter(Boolean);
        }
      } catch (error) {
        return;
      }
    }

    const payload = {
      isSaveAsDraft: true,
      recipient: {
        name: form?.recipientDetails?.recipientName || "",
        email: form?.recipientDetails?.email || "",
        phoneNumber: form?.recipientDetails?.phoneNumber || "",
        address: form?.recipientDetails?.address || "",
      },
      photoUrls: photoUrls,
      buyerPaysEscrowFee: form?.isDeliveryOnUs || false,
      description: form?.description || "",
      deliveryFee: form?.selectedCourier?.total || 0,
      items:
        form?.escrowItems?.map((item) => ({
          name: item.name || "",
          inventoryItemId: item.inventoryItemId,
          quantity: item.quantity || 0,
          unitPrice: item.amount || 0,
          weightKg: item.weight || 0,
        })) || [],
      shipmentMetaData: {
        requestToken: form?.selectedCourier?.requestToken || "",
        serviceCode: form?.selectedCourier?.serviceCode || "",
        courierId: form?.selectedCourier?.courierId || "",
      },
    };
    saveForLaterMutation.mutate({
      service: "wallet-service/api/v1",
      endpoint: "escrows",
      extra: "orders",
      method: "POST",
      body: payload,
      auth: true,
      multipart: false,
    });
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
        <ToggleInput
          label="Delivery by Bridgee"
          value={form?.isDeliveryOnUs}
          onChange={(val) => handleChange(val, "toggle", "isDeliveryOnUs")}
        />
        {form?.escrowItems && form?.escrowItems?.length > 0 && (
          <div className="w-full mt-5">
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
                accept="image/*"
                capture="environment"
                label="Upload Product Image"
                required
              />
            </div>
          </div>
        )}
      </div>

      <div className="border-2 border-lightText/20 rounded-lg p-5 mb-10 mt-5">
        <h3 className="font-bold text-lg ff-bold mb-4">
          Recipient&#39;s Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            name="recipientName"
            value={form.recipientDetails?.recipientName || ""}
            onChange={handleChange}
            label="Recipient’s Name"
            placeholder="Enter name"
            className={`${recipientNameInvalid ? "border border-red-500 bg-red-50" : ""}`}
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
            className={`${recipientEmailInvalid ? "border border-red-500 bg-red-50" : ""}`}
            placeholder="Enter email"
          />
          <TextInput
            name="phoneNumber"
            className={`${recipientPhoneInvalid ? "border border-red-500 bg-red-50" : ""}`}
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

      {form?.isDeliveryOnUs && (
        <div className="w-full mb-6">
          <label className="text-sm font-bold">Select Category</label>
          <div className="mt-2">
            <Select<{ label: string; value: number }, false>
              placeholder="Select category that your item falls into"
              options={categories.map((category) => ({
                label: category.category,
                value: category.categoryId,
              }))}
              onChange={(selectedOption: { value: any }) => {
                if (selectedOption) {
                  handleChange(selectedOption.value, "select", "categoryId");
                }
              }}
              styles={selectStyles}
            />
          </div>
        </div>
      )}

      {form?.isDeliveryOnUs && (
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
      )}

      {form?.isDeliveryOnUs && (
        <div>
          <p className="pb-4 font-bold text-base">Shipping Details</p>
          <div className="md:flex gap-5 justify-between space-y-5 md:space-y-0">
            <div className="w-full">
              <label className="text-sm font-bold">Pickup Address</label>
              {!showManualPickup ? (
                <>
                  <AsyncSelect
                    cacheOptions
                    defaultOptions
                    {...(pickupSelectValue && { value: pickupSelectValue })}
                    loadOptions={loadSuggestions}
                    onChange={(option: SelectAddressOption) => {
                      handleAddressValidation(option, "pickupAddress");
                    }}
                    placeholder="Enter pickup address"
                    className="mt-2"
                    styles={selectStyles}
                  />
                  <div className="mt-3 flex flex-row justify-between items-center sm:flex-col sm:items-start gap-3">
                    <div
                      onClick={handleUseCurrentLocation}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <div className="flex items-center justify-center w-6 h-6 rounded-lg border border-gray-400">
                        <MapPin className="w-4 h-4 text-gray-400" />
                      </div>

                      <span className="text-sm text-primary group-hover:underline whitespace-nowrap">
                        {isLoadingCurrentLocation
                          ? "Getting location..."
                          : "Use your current location"}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setShowManualPickup(true);
                        setPickupAddressResponse(null);
                      }}
                      className="text-sm text-blue-600 hover:text-blue-800 underline whitespace-nowrap"
                    >
                      Can't find address? Click here
                    </button>
                  </div>
                </>
              ) : (
                <div className="mt-2 space-y-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    Manual Address Entry
                  </p>
                  <div className="grid grid-cols-1 gap-3">
                    <TextInput
                      name="pickupHouseNo"
                      value={manualPickupAddress.houseNo}
                      onChange={(e) =>
                        setManualPickupAddress((prev) => ({
                          ...prev,
                          houseNo: e.target.value,
                        }))
                      }
                      label="House No."
                      placeholder="e.g. 12A"
                    />
                    <TextInput
                      name="pickupStreetName"
                      value={manualPickupAddress.streetName}
                      onChange={(e) =>
                        setManualPickupAddress((prev) => ({
                          ...prev,
                          streetName: e.target.value,
                        }))
                      }
                      label="Street Name"
                      placeholder="e.g. Admiralty Way"
                    />
                    <TextInput
                      name="pickupLga"
                      value={manualPickupAddress.lga}
                      onChange={(e) =>
                        setManualPickupAddress((prev) => ({
                          ...prev,
                          lga: e.target.value,
                        }))
                      }
                      label="LGA"
                      placeholder="e.g. Lekki"
                    />
                    <TextInput
                      name="pickupLandmark"
                      value={manualPickupAddress.landmark}
                      onChange={(e) =>
                        setManualPickupAddress((prev) => ({
                          ...prev,
                          landmark: e.target.value,
                        }))
                      }
                      label="Landmark"
                      placeholder="e.g. Near GTBank"
                    />
                    <TextInput
                      name="pickupState"
                      value={manualPickupAddress.state}
                      onChange={(e) =>
                        setManualPickupAddress((prev) => ({
                          ...prev,
                          state: e.target.value,
                        }))
                      }
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
                          houseNo: "",
                          streetName: "",
                          lga: "",
                          state: "",
                          landmark: "",
                        });
                        setPickupAddressResponse(null);
                      }}
                    >
                      Search
                    </Button>
                    <Button
                      className="bg-success w-full text-lg font-bold"
                      onClick={() =>
                        handleManualAddressValidation("pickupAddress")
                      }
                      disabled={isValidatingPickup}
                    >
                      {isValidatingPickup ? "Validating..." : "Verify"}
                    </Button>
                  </div>
                  {pickupAddressResponse && (
                    <p className="text-sm text-green-600 mt-2">
                      Address validated successfully
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Delivery Address */}
            <div className="w-full">
              <label className="text-sm font-bold">Delivery Address</label>
              {!showManualDelivery ? (
                <>
                  {/* <AsyncSelect
                  cacheOptions
                  defaultOptions
                  loadOptions={loadSuggestions}
                  onChange={(option: SelectAddressOption) => {
                    handleAddressValidation(option, "deliveryAddress");
                  }}
                  placeholder="Enter delivery address"
                  className="mt-2"
                  styles={selectStyles}
                /> */}
                  <AsyncSelect
                    cacheOptions
                    defaultOptions
                    loadOptions={loadSuggestions}
                    isDisabled={!isRecipientDetailsComplete}
                    onMenuOpen={() => {
                      if (!isRecipientDetailsComplete) {
                        setDeliveryAttempted(true);
                        notification({
                          title: "Recipient Details Required",
                          message:
                            "Please complete recipient name, email and phone number before selecting delivery address.",
                          type: "danger",
                        });
                      }
                    }}
                    onChange={(option: SelectAddressOption) => {
                      if (!isRecipientDetailsComplete) return;
                      handleAddressValidation(option, "deliveryAddress");
                    }}
                    placeholder={
                      isRecipientDetailsComplete
                        ? "Enter delivery address"
                        : "Fill recipient details first"
                    }
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
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    Manual Address Entry
                  </p>
                  <div className="grid grid-cols-1 gap-3">
                    <TextInput
                      name="deliveryHouseNo"
                      value={manualDeliveryAddress.houseNo}
                      onChange={(e) =>
                        setManualDeliveryAddress((prev) => ({
                          ...prev,
                          houseNo: e.target.value,
                        }))
                      }
                      label="House No."
                      placeholder="e.g. 12A"
                    />
                    <TextInput
                      name="deliveryStreetName"
                      value={manualDeliveryAddress.streetName}
                      onChange={(e) =>
                        setManualDeliveryAddress((prev) => ({
                          ...prev,
                          streetName: e.target.value,
                        }))
                      }
                      label="Street Name"
                      placeholder="e.g. Admiralty Way"
                    />
                    <TextInput
                      name="deliveryLga"
                      value={manualDeliveryAddress.lga}
                      onChange={(e) =>
                        setManualDeliveryAddress((prev) => ({
                          ...prev,
                          lga: e.target.value,
                        }))
                      }
                      label="LGA"
                      placeholder="e.g. Lekki"
                    />
                    <TextInput
                      name="deliveryLandmark"
                      value={manualDeliveryAddress.landmark}
                      onChange={(e) =>
                        setManualDeliveryAddress((prev) => ({
                          ...prev,
                          landmark: e.target.value,
                        }))
                      }
                      label="Landmark"
                      placeholder="e.g. Near GTBank"
                    />
                    <TextInput
                      name="deliveryState"
                      value={manualDeliveryAddress.state}
                      onChange={(e) =>
                        setManualDeliveryAddress((prev) => ({
                          ...prev,
                          state: e.target.value,
                        }))
                      }
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
                          houseNo: "",
                          streetName: "",
                          lga: "",
                          state: "",
                          landmark: "",
                        });
                        setDeliveryAddressResponse(null);
                      }}
                    >
                      Search
                    </Button>
                    <Button
                      className="bg-success w-full text-lg font-bold"
                      onClick={() =>
                        handleManualAddressValidation("deliveryAddress")
                      }
                      disabled={isValidatingDelivery}
                    >
                      {isValidatingDelivery ? "Validating..." : "Verify"}
                    </Button>
                  </div>
                  {deliveryAddressResponse && (
                    <p className="text-sm text-green-600 mt-2">
                      Address validated successfully
                    </p>
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
      )}

      <div className="w-full mb-3 mt-8 space-y-3">
        <Button
          paddingY="py-3"
          className="w-full"
          disabled={!!validateForm()}
          onClick={handleSubmit}
        >
          Next: Invoice Summary
        </Button>

        <Button
          paddingY="py-3"
          className="w-full bg-white border border-primary text-primary hover:bg-primary/5"
          bgColor="bg-white"
          textColor="text-primary"
          disabled={saveForLaterMutation.isLoading || !validateSaveForLater()}
          onClick={handleSaveForLater}
        >
          {uploadMutation.isLoading || saveForLaterMutation.isLoading
            ? "Saving..."
            : "Save for Later"}
        </Button>
      </div>

      {show && (
        <AddInvoiceItem
          data={itemToEdit}
          onAdd={handleAddItem}
          onClose={() => setShow(false)}
        />
      )}

      {showResumeDraftModal && pendingDraft && (
  <ResumeDraftModal
    onResume={() => {
      applyDraft(pendingDraft);
      setPendingDraft(null);
      setShowResumeDraftModal(false);
    }}
    onDiscard={() => {
      deleteDraft();
      setPendingDraft(null);
      setShowResumeDraftModal(false);
    }}
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
      <LocationSuggestionModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSelect={handleSelectLocationFromModal}
        initialLocation={currentLocationSuggestion}
        isLoading={isLoadingCurrentLocation}
      />
    </div>
  );
}

export default OrderDetails;

