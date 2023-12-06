import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';

import SuccessSvg from '../../../../assets/svgs/success-tick.svg';
import { useAccountsContext } from '../../../../context/Accounts';
import useGetQuery from '../../../../hooks/useGetQuery';
import handleFetch from '../../../../services/api/handleFetch';
import { FundTransferProps } from '../../../../types/transaction';
import notification from '../../../../utilities/notification';
import Loading from '../../../common/Loading';

import Modal from '../../../common/Modal';
import Button from '../../../inputs/Button';

import AccountEnquiryForm from './AccountEnquiryForm';
import AmountDetails from './AmountDetails';
import PINValidation from './PINValidation';
import TransactionSummary from './TransactionSummary';

type Props = {
  onClose: () => void
};

function Index({ onClose }: Props) {
  const { accounts } = useAccountsContext();
  const [formIndex, setFormIndex] = useState(0);
  const [form, setForm] = useState<FundTransferProps>({});

  const [accountNoToBeVerified, setAccountNoToBeVerified] = useState<string | undefined>(undefined);
  const accountNoIsVerified = useRef(false);

  const { defaultWallets } = accounts || {};

  const { data: banks, status } = useGetQuery({
    endpoint: 'transaction',
    extra: 'banks',
    queryKey: ['get-bank-list']
  });
  const { data: categories, status: categoryStatus } = useGetQuery({
    endpoint: 'category',
    queryKey: ['get-transaction-categories']
  });
  const { data: accountDetails, status: enquiryStatus } = useGetQuery({
    endpoint: 'transaction',
    extra: 'account-name-enquiry',
    pQuery: {
      myDestinationBankCode: form?.bankCode?.value,
      myDestinationAccountNumber: accountNoToBeVerified
    },
    queryKey: ['account-name-enquiry', form?.bankCode?.value, accountNoToBeVerified],
    enabled: !!accountNoToBeVerified && !!form?.bankCode?.value
  });

  useEffect(() => {
    if (accountNoToBeVerified) {
      if (enquiryStatus === 'success') {
        setForm((prev) => ({
          ...prev,
          accountName: accountDetails?.data?.accountName
        }));
        setAccountNoToBeVerified(undefined);
        accountNoIsVerified.current = true;
      } else if (enquiryStatus === 'error') {
        setAccountNoToBeVerified(undefined);
        notification({
          message: 'Account name enquiry failed.',
          type: 'danger'
        });
      }
    }
  }, [accountDetails, accountNoToBeVerified, enquiryStatus]);

  const transferMutation = useMutation(handleFetch, {
    onSuccess: () => {
      setFormIndex(4);
    },
    onError: (err: any) => {
      notification({
        title: 'Error',
        message: err?.toString() || 'Something went wrong.',
        type: 'danger'
      });
    }
  });

  const handleChange = (val: any, type = 'input', inputName = '') => {
    if (type === 'input') {
      const { value, name } = val.target;
      setForm((prev) => ({ ...prev, [name]: value }));

      if (name === 'accountNumber') {
        accountNoIsVerified.current = false;
        setForm((prev) => ({ ...prev, accountName: undefined }));
        if (value?.length === 10 && !accountNoIsVerified.current) {
          setAccountNoToBeVerified(value);
        }
      }
    } else {
      setForm((prev) => ({ ...prev, [inputName]: val }));
    }

    if (inputName === 'bankCode' && form?.accountNumber?.length === 10 && !accountNoIsVerified.current) {
      setAccountNoToBeVerified(form?.accountNumber);
    }
  };

  const processAccountEnquiry = () => {
    let error;
    if (!form?.bankCode?.value) error = 'Please, select a bank';
    if (!form?.accountNumber) error = 'Please, enter a valid account number';
    if (!form?.accountName) error = 'Please, enter a valid account number';

    if (error) {
      notification({ title: 'Form Error', message: error, type: 'danger' });
      return;
    }
    setFormIndex(1);
  };

  const processAmountDetails = () => {
    let error;
    if (!form?.amount) error = 'Please, enter the amount you want to transfer';
    if ((Number(form?.amount) + (form?.processFee || 0)) > defaultWallets?.[0]?.balance) {
      error = 'The sum of the amount and process fee must not be greater than your wallet balance';
    }
    if (!form?.categoryId?.value) error = 'Please, select a category for the transfer';
    if (!form?.narration) error = 'Please, enter a narration/remark for your transfer';

    if (error) {
      notification({ title: 'Form Error', message: error, type: 'danger' });
      return;
    }
    setFormIndex(2);
  };

  const authenticateTransaction = () => {
    if (!form?.pin?.length || form?.pin?.length < 4) {
      notification({
        title: 'Form Error',
        message: 'Please, enter a valid PIN',
        type: 'danger'
      });
      return;
    }

    const body = {
      ...form,
      amount: Number(form?.amount),
      bankCode: form?.bankCode?.value,
      categoryId: form?.categoryId?.value
    };

    delete body.processFee;
    delete body.accountName;

    transferMutation.mutate({
      endpoint: 'transaction', extra: 'interbank-fund-transfer', body, method: 'POST', auth: true
    });
  };

  const { isLoading } = transferMutation;

  return (
    <>
      {(status === 'loading' || categoryStatus === 'loading') && <Loading />}
      {enquiryStatus === 'loading' && <Loading message="Verifying account..." />}
      {isLoading && <Loading message="Processing transfer..." />}

      <Modal isOpen onClose={onClose} maxWidth="max-w-[400px]">
        {formIndex === 0 && (
          <AccountEnquiryForm
            form={form}
            onChange={handleChange}
            banks={banks?.data?.map((item: any) => ({ label: item.name, value: item.code })) || []}
            onNext={processAccountEnquiry}
          />
        )}

        {formIndex === 1 && (
          <AmountDetails
            form={form}
            onChange={handleChange}
            categories={categories?.data?.map((item: any) => ({ label: item.categoryName, value: item.id })) || []}
            onPrev={() => setFormIndex(0)}
            onNext={processAmountDetails}
          />
        )}

        {formIndex === 2 && (
          <TransactionSummary
            form={form}
            onPrev={() => setFormIndex(1)}
            onNext={() => setFormIndex(3)}
          />
        )}

        {formIndex === 3 && (
          <PINValidation
            onChange={handleChange}
            onPrev={() => setFormIndex(2)}
            onSubmit={authenticateTransaction}
          />
        )}

        {formIndex === 4 && (
          <div className="w-full py-5">
            <div className="mb-7">
              <h1 className="w-full pr-10 text-textColor ff-bold text-xl">Transaction has been initiated successfully</h1>
            </div>

            <div className="w-full mb-10">
              <Image src={SuccessSvg} alt="" className="mx-auto" />
            </div>

            <Button
              onClick={onClose}
              paddingX="px-10"
              className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl"
              paddingY="p-2.5"
            >
              Close
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
}

export default Index;
