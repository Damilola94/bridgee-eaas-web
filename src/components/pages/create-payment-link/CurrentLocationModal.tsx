'use client';

import { useEffect, useState } from 'react';

import Modal from '../../common/Modal';
import Button from '../../inputs/Button';
import TextInput from '../../inputs/Text';

import { LocationSuggestion } from "../../../services/api/currentLocation";

interface LocationSuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (location: LocationSuggestion) => void;
  initialLocation: LocationSuggestion | null;
  isLoading?: boolean;
}

export const LocationSuggestionModal = ({
  isOpen,
  onClose,
  onSelect,
  initialLocation,
  isLoading = false
}: LocationSuggestionModalProps) => {
  const [editedAddress, setEditedAddress] = useState('');

  useEffect(() => {
    if (initialLocation?.address) {
      setEditedAddress(initialLocation.address);
    }
  }, [initialLocation]);

  const handleSelect = () => {
    if (initialLocation) {
      onSelect({
        ...initialLocation,
        address: editedAddress
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-[400px]"
    >
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Choose delivery location</h2>
        <TextInput
          value={editedAddress}
          onChange={(e) => setEditedAddress(e.target.value)}
          name="location"
          type="text"
          placeholder="Search apartments, streets, places"
          disabled={isLoading}
        />
        {initialLocation && (
          <div
            className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setEditedAddress(initialLocation.address)}
          >
            <p className="font-semibold text-gray-900">
              {editedAddress}
            </p>
            {initialLocation.formattedAddress && (
              <p className="text-sm text-gray-500 mt-1">
                {initialLocation.formattedAddress}
              </p>
            )}

          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="text-center text-gray-500 text-sm">
            Fetching your location...
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={onClose}
            className="bg-transparent border border-success w-full text-success"
          >
            Cancel
          </Button>

          <Button
            onClick={handleSelect}
            disabled={!editedAddress.trim() || isLoading}
            className="bg-success w-full text-lg font-bold"
          >
            Select Location
          </Button>
        </div>
      </div>
    </Modal>
  );
};
