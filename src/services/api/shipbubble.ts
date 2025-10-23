import { GooglePlacesResponse, ShipBubbleCategoriesResponse, ShipBubbleDimensionsResponse } from '../../types/shipbubble';
import handleFetch from './handleFetch';

export const getPackageCategories = (): Promise<ShipBubbleCategoriesResponse> => {
  return handleFetch({
    service: 'admin-service',
    endpoint: '/api/v1/shipbubble/package-categories',
    method: 'GET',
    auth: true,
  });
};


export const getPackageDimensions = (): Promise<ShipBubbleDimensionsResponse> => {
  return handleFetch({
    service: 'admin-service',
    endpoint: '/api/v1/shipbubble/package-dimensions',
    method: 'GET',
    auth: true,
  });
};

export const getGooglePlacesSuggestions = (input: string): Promise<GooglePlacesResponse> => {
  return handleFetch({
    service: 'admin-service',
    endpoint: `/api/v1/googleplaces/lookup?input=${encodeURIComponent(input)}`,
    method: 'GET',
    auth: true,
  });
};