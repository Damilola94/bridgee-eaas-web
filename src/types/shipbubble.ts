export interface ShipBubbleCategory {
  categoryId: number;
  category: string;
}

export interface ShipBubbleCategoriesResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  data: {
    categories: ShipBubbleCategory[];
  };
  metaData: string | null;
}

export interface ShipBubbleDimension {
  boxSizeId: number;
  name: string;
  descriptionImageUrl: string;
  height: number;
  width: number;
  length: number;
  maxWeight: number;
}

export interface ShipBubbleDimensionsResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  data: {
    dimensions: ShipBubbleDimension[];
  };
  metaData: string | null;
}

export interface GooglePlaceSuggestion {
  description: string;
  placeId: string;
}

export interface GooglePlacesResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  data: GooglePlaceSuggestion[];
  metaData: string | null;
}

export interface ValidateAddressPayload {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface ValidatedAddress {
  isValid: boolean;
  addressCode: string;
  formattedAddress: string;
  state: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface ValidateAddressResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  data: ValidatedAddress;
  metaData: string | null;
}

export interface ShippingRatesPackageItem {
  name: string;
  description: string;
  unitWeight: string;
  unitAmount: string;
  quantity: string;
}

export interface ShippingRatesPackageDimension {
  length: number;
  width: number;
  height: number;
}

export interface ShippingRatesPayload {
  senderAddressCode: number;
  receiverAddressCode: number;
  pickupDate: string;
  categoryId: number;
  packageItems: ShippingRatesPackageItem[];
  serviceType: string;
  deliveryInstructions: string;
  packageDimension: ShippingRatesPackageDimension;
}

export interface ShippingRate {
  requestToken?: string;
  courierId: string;
  courierName: string;
  courierImage: string;
  serviceCode: string;
  insurance: {
    code: string;
    fee: number;
  };
  discount: {
    percentage: number;
    symbol: string;
    discounted: number;
  };
  serviceType: string;
  waybill: boolean;
  onDemand: boolean;
  isCodAvailable: boolean;
  codRemitDays: number | null;
  trackingLevel: number;
  ratings: number;
  votes: number;
  connectedAccount: boolean;
  rateCardAmount: number;
  rateCardCurrency: string;
  pickupEta: string;
  pickupEtaTime: string;
  dropoffStation: null;
  pickupStation: null;
  deliveryEta: string;
  deliveryEtaTime: string;
  info: string[] | null;
  currency: string;
  vat: number;
  total: number;
  tracking: {
    bars: number;
    label: string;
  };
}

export interface ShippingRatesResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  data: {
    requestToken: string;
    couriers: ShippingRate[];
    fastestCourier: ShippingRate;
    cheapestCourier: ShippingRate;
    checkoutData: {
      shipFrom: {
        name: string;
        phone: string;
        email: string;
        address: string;
      };
      shipTo: {
        name: string;
        phone: string;
        email: string;
        address: string;
      };
      currency: string;
      packageAmount: number;
      packageWeight: number;
      pickupDate: string;
      isInvoiceRequired: boolean;
      codPolicy: string;
    };
  };
  metaData: string | null;
  method: string;
  status: number;
}
