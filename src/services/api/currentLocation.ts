/* eslint-disable no-useless-catch */
/**
 * Location Service
 * Handles geolocation and API calls to fetch location suggestions
 */

import handleFetch from './handleFetch';

export interface LocationCoordinates {
  lat: number;
  lng: number;
}

export interface GooglePlacesLocationApiResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  data: {
    formattedAddress: string;
    placeId: string;
    lat: number;
    lng: number;
  };
  metaData: any;
}

export interface LocationSuggestion {
  address: string;
  formattedAddress?: string;
  coordinates: LocationCoordinates;
}

export interface GeolocationError {
  code: number;
  message: string;
}

/**
 * Get user's current location using the Geolocation API
 */
export const getCurrentLocation = (): Promise<LocationCoordinates> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject({
        code: 0,
        message: 'Geolocation is not supported by this browser'
      } as GeolocationError);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        let message = 'Unable to retrieve your location';

        if (error.code === error.PERMISSION_DENIED) {
          message =
            'Location permission denied. Please enable location access in your browser settings.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          message = 'Location information is unavailable.';
        } else if (error.code === error.TIMEOUT) {
          message = 'Location request timed out. Please try again.';
        }

        reject({
          code: error.code,
          message
        } as GeolocationError);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
};

/**
 * Fetch location suggestion using coordinates (Bridgee GooglePlaces endpoint)
 */
export const fetchLocationSuggestions = (
  coordinates: LocationCoordinates
): Promise<GooglePlacesLocationApiResponse> => {
  return handleFetch({
    service: 'admin-service',
    endpoint: `/api/v1/googleplaces/location?lat=${coordinates.lat}&lng=${coordinates.lng}`,
    method: 'GET',
    auth: true
  });
};

/**
 * Main function to get current location and fetch suggestion
 */
export const getLocationSuggestionFromCurrentPosition =
  async (): Promise<LocationSuggestion> => {
    try {
      const coordinates = await getCurrentLocation();
      const response = await fetchLocationSuggestions(coordinates);
      return {
        address: response.data.formattedAddress,
        formattedAddress: response.data.formattedAddress,
        coordinates: {
          lat: response.data.lat,
          lng: response.data.lng
        }
      };
    } catch (error) {
      throw error;
    }
  };

