/* eslint-disable no-duplicate-imports */
'use client';

import React, { useState } from 'react';
import { CheckCircle, Upload } from 'lucide-react';

// import type { SelectOptionType } from "../../inputs/Select";

import Modal from '../../common/Modal';

import Button from '../../inputs/Button';
// import SelectInput from '../../inputs/Select';
import TextInput from '../../inputs/Text';

interface DisputeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDispute: (reason: string | undefined, phone: string, evidence: File[]) => void;
    isLoading?: boolean;
}

export default function DisputeModal({
  isOpen,
  onClose,
  onDispute,
  isLoading = false
}: DisputeModalProps) {
  const [step, setStep] = useState<'reason' | 'phone' | 'evidence' | 'success'>('reason');
  //   const [disputeReason, setDisputeReason] =
  //   useState<SelectOptionType | null>(null);
  const [disputeReason, setDisputeReason] = useState('');
  const [disputeDescription, setDisputeDescription] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [error, setError] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleDisputeReasonSubmit = () => {
    if (!disputeReason) {
      setError('Please select a reason for dispute');
      return;
    }
    setError('');
    setStep('phone');
  };

  const handleDisputePhoneSubmit = () => {
    if (!phoneNumber || phoneNumber.trim().length === 0) {
      setError('Please enter a phone number');
      return;
    }
    setError('');
    onDispute(disputeReason, phoneNumber, uploadedFiles);
    setStep('success');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setUploadedFiles([...uploadedFiles, ...Array.from(files)]);
    }
  };

  const handleCloseModal = () => {
    setStep('reason');
    setDisputeReason('');
    setDisputeDescription('');
    setPhoneNumber('');
    setUploadedFiles([]);
    setError('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      maxWidth="max-w-[400px]"
    >
      <div className="space-y-6">
        {step === 'reason' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Open Dispute</h2>
            <div className="space-y-4">
              <div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Reason for dispute
                  </label>
                  <select
                    value={disputeReason}
                    onChange={(e) => setDisputeReason(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="">Select Reason</option>
                    <option value="item_not_received">Item Not Received</option>
                    <option value="item_damaged">Item Damaged</option>
                    <option value="item_not_as_described">Item Not As Described</option>
                    <option value="poor_quality">Poor Quality</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                {/* <SelectInput
  label="Reason for dispute"
  value={disputeReason}
  onChange={(val) => {
    if (!Array.isArray(val)) {
      setDisputeReason(val);
    }
  }}
  options={[
    { label: "Item Not Received", value: "item_not_received" },
    { label: "Item Damaged", value: "item_damaged" },
    { label: "Item Not As Described", value: "item_not_as_described" },
    { label: "Poor Quality", value: "poor_quality" },
    { label: "Other", value: "other" },
  ]}
/> */}

              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Short description
                </label>
                <textarea
                  value={disputeDescription}
                  onChange={(e) => setDisputeDescription(e.target.value)}
                  placeholder="Type a short description"
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold">Upload Evidence</h2>
                <p className="text-gray-600 text-sm">
                                    Please upload evidence to support your dispute (photos, videos, or documents)
                </p>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <label className="flex flex-col items-center cursor-pointer">
                    <Upload className="w-10 h-10 text-gray-400 mb-2" />
                    <span className="text-sm font-semibold text-gray-700">Click to upload</span>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      accept="image/*,video/*,.pdf,.doc,.docx"
                    />
                  </label>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-700">
                                            Uploaded files ({uploadedFiles.length}):
                    </p>
                    {uploadedFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm"
                      >
                        <span className="truncate">{file.name}</span>
                        <button
                          onClick={() =>
                            setUploadedFiles(uploadedFiles.filter((_, i) => i !== idx))
                          }
                          className="text-red-600 hover:text-red-700 ml-2"
                        >
                                                    Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded text-sm">
                    {error}
                  </div>
                )}
              </div>
            </div>

            <div className="space-x-3 flex justify-between">
              <Button
                onClick={handleCloseModal}
                textColor="text-primary"
                bgColor="bg-primary/0"
                className="bg-transparent border border-success py-2 w-full text-success"
                paddingY="p-2"
              >
                                Cancel
              </Button>
              <Button
                onClick={handleDisputeReasonSubmit}
                className="bg-success py-2 w-full text-lg font-bold"
                paddingY="p-2"
              >
                                Proceed
              </Button>
            </div>
          </div>
        )}

        {step === 'phone' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Confirm Phone Number</h2>
            <p>Kindly confirm your phone number to proceed</p>
            <p className="text-gray-600 text-sm">
                            NOTE: You’ll be contacted through this number
            </p>

            <div>
              <TextInput
                className="w-full mb-5"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                name="email"
                maxValue={11}
                type="number"
                label="Phone Number" placeholder="Enter Phone Number"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded text-sm">
                {error}
              </div>
            )}

            <div className="space-x-3 flex justify-between">
              <Button
                onClick={() => setStep('reason')}
                textColor="text-primary"
                bgColor="bg-primary/0"
                className="bg-transparent border border-success py-2 w-full text-success"
                paddingY="p-2"
              >
                                Back
              </Button>
              <Button
                onClick={handleDisputePhoneSubmit}
                className="bg-success py-2 w-full text-lg font-bold"
                paddingY="p-2"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Proceed'}
              </Button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-success" />
            </div>
            <h2 className="text-xl font-bold">Evidence Uploaded Successfully</h2>
            <p className="text-gray-600 text-sm">
                            Your evidence have been uploaded successfully, the bridgee escrow specialist will review and you will be updated on the status of the transaction.
            </p>
            <Button
              onClick={handleCloseModal}
              className="w-full text-lg font-bold ff-bold !rounded-md mdx2:!rounded-xl"
              paddingY="p-2"
            >
                            Go back to order screen
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
