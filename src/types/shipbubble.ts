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


