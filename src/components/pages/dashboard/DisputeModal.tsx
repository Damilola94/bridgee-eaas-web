/* eslint-disable no-nested-ternary */
/* eslint-disable no-duplicate-imports */
'use client';

import React, { useState } from 'react';
import { CheckCircle, Upload } from 'lucide-react';
import Select, { SingleValue, StylesConfig } from 'react-select';

import { useMutation, useQuery } from 'react-query';

import Modal from '../../common/Modal';

import Button from '../../inputs/Button';
import TextInput from '../../inputs/Text';
import notification from '../../../utilities/notification';
import { getBanksList, getAccountName } from '../../../services/api/bank';
import useGetQuery from '../../../hooks/useGetQuery';

import { DisputePayload } from './disputeTypes';

interface Bank {
  bankCode: string;
  bankName: string;
}

type DisputeReasonOption = {
  label: string;
  value: string;
  isOther: boolean;
};

type BankOption = {
  label: string;
  value: string;
};

const selectStyles: StylesConfig<BankOption, false> = {
  control: (base) => ({
    ...base,
    height: '3rem',
    borderRadius: '10px',
    borderColor: '#D0D5DD',
    backgroundColor: '#F9FAFB',
    boxShadow: 'none'
  })
};

interface DisputeModalProps {
  isOpen: boolean;
  onClose: () => void;
  step: 'reason' | 'phone' | 'bank' | 'success';
  setStep: React.Dispatch<React.SetStateAction<'reason' | 'phone' | 'bank' | 'success'>>;
  escrowOrderId: string;
  onDispute: (payload: DisputePayload) => void;
  isLoading?: boolean;
}

export default function DisputeModal({
  isOpen,
  onClose,
  escrowOrderId,
  onDispute,
  step,
  setStep,
  isLoading = false
}: DisputeModalProps) {
  const [error, setError] = useState('');

  const [disputeReasonId, setDisputeReasonId] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [isOtherReason, setIsOtherReason] = useState(false);
  const [disputeDescription, setDisputeDescription] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountValidated, setAccountValidated] = useState(false);

  const { data, isLoading: reasonsLoading } = useGetQuery({
    service: "wallet-service/api/v1/",
    endpoint: "disputes",
    extra: "reasons",
    queryKey: ["escrows-reasons"]
  });

  const disputeReasonOptions: DisputeReasonOption[] =
    data?.data
      ?.sort((a: any, b: any) => a.displayOrder - b.displayOrder)
      .map((reason: any) => ({
        label: reason.reason,
        value: reason.id,
        isOther: reason.reason.toLowerCase() === 'others'
      })) || [];

  const { data: bankResponse, isLoading: bankLoading } = useQuery(
    'banks',
    getBanksList
  );

  const banks: Bank[] =
    bankResponse?.data?.map((b: any) => ({
      bankCode: b.bankCode,
      bankName: b.bankName
    })) || [];

  const bankOptions: BankOption[] = banks.map((bank) => ({
    label: bank.bankName,
    value: bank.bankCode
  }));

  const verifyAccount = useMutation(getAccountName, {
    onSuccess: (res: any) => {
      if (res?.isSuccess) {
        setAccountName(res.data);
        setAccountValidated(true);
      }
    },
    onError: () => {
      setAccountName('');
      setAccountValidated(false);
      notification({
        title: 'Account verification failed',
        message: 'Please check your bank details',
        type: 'danger'
      });
    }
  });

  if (!isOpen) {
    return null;
  }

  const handleDisputeReasonSubmit = () => {
    if (!disputeReasonId) {
      setError('Please select a reason for dispute');
      return;
    }
    if (isOtherReason && !customReason.trim()) {
      setError('Please enter your custom reason');
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
    setStep('bank');
  };

  const handleAccountChange = (value: string) => {
    setAccountNumber(value);
    setAccountName('');
    setAccountValidated(false);

    if (value.length === 10 && selectedBank) {
      verifyAccount.mutate({
        bankCode: selectedBank.bankCode,
        accountNumber: value
      });
    }
  };

  const handleSubmitDispute = () => {
    if (verifyAccount.isLoading || !accountValidated) {
      setError('Please wait for account validation to complete');
      return;
    }
    setError('');
    const formData = new FormData();
    formData.append('EscrowOrderId', escrowOrderId);
    formData.append('DisputeReasonId', disputeReasonId);
    formData.append('CustomReason', customReason);
    formData.append('Description', disputeDescription);
    formData.append('ReporterPhone', phoneNumber);
    if (selectedBank) {
      formData.append('BankCode', selectedBank.bankCode);
    }
    formData.append('ReporterAccountNumber', accountNumber);

    uploadedFiles
      .filter((file) => file.type.startsWith('image'))
      .forEach((file) => {
        formData.append('PictureProofs', file);
      });

    uploadedFiles
      .filter((file) => file.type.startsWith('video'))
      .forEach((file) => {
        formData.append('VideoProofs', file);
      });
    onDispute(formData as unknown as DisputePayload);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setUploadedFiles([...uploadedFiles, ...Array.from(files)]);
    }
  };

  const handleCloseModal = () => {
    setStep('reason');
    setDisputeReasonId('');
    setCustomReason('');
    setIsOtherReason(false);
    setDisputeDescription('');
    setPhoneNumber('');
    setUploadedFiles([]);
    setSelectedBank(null);
    setAccountNumber('');
    setAccountName('');
    setAccountValidated(false);
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
                  <Select
                    placeholder="Select dispute reason"
                    options={disputeReasonOptions}
                    isLoading={reasonsLoading}
                    styles={selectStyles}
                    onChange={(val: SingleValue<DisputeReasonOption>) => {
                      setDisputeReasonId(val?.value || '');
                      setIsOtherReason(val?.isOther || false);
                      if (!val?.isOther) {
                        setCustomReason('');
                      }
                    }}
                  />
                </div>
              </div>
              {isOtherReason && (
                <div>
                  <TextInput
                    className="w-full"
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    name="customReason"
                    type="text"
                    label="Custom Reason"
                    placeholder="Enter your reason for dispute"
                  />
                </div>
              )}

              <div>
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

                <div className="space-y-2 mt-3">
                  <h2 className="text-sm font-bold">Upload Evidence</h2>
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

        {step === 'bank' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Bank Details</h2>

            <div>
              <label className="text-sm font-semibold">Select Bank</label>
              <Select
                options={bankOptions}
                isLoading={bankLoading}
                styles={selectStyles}
                placeholder="Select a bank"
                onChange={(val: SingleValue<BankOption>) => {
                  const bank = banks?.find(
                    (b) => b.bankCode === val?.value
                  );
                  setSelectedBank(bank || null);
                }}
              />
            </div>

            <TextInput
              label="Account Number"
              value={accountNumber}
              onChange={(e) => handleAccountChange(e.target.value)} placeholder="Enter account number"
              maxValue={10}
              type="number"
            />

            {verifyAccount.isLoading && (
              <p className="text-sm text-gray-400">Verifying account...</p>
            )}

            {accountName && (
              <p className="text-sm text-gray-600">{accountName}</p>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex gap-3">
              <Button
                onClick={() => setStep('phone')}
                className="bg-transparent border border-success w-full text-success"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmitDispute}
                className="bg-success w-full text-lg font-bold"
                disabled={
                  isLoading ||
                  verifyAccount.isLoading ||
                  !accountValidated
                } >
                {verifyAccount.isLoading
                  ? 'Validating account...'
                  : isLoading
                    ? 'Submitting...'
                    : 'Submit Dispute'}
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