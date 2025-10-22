import { ShipBubbleCategoriesResponse, ShipBubbleDimensionsResponse } from '../../types/shipbubble';
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