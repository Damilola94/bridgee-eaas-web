import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

import { useMutation } from 'react-query';

import { useAccountsContext } from '../../../context/Accounts';

import notification from '../../../utilities/notification';

import handleFetch from '../../../services/api/handleFetch';

import WalletCard from './WalletCard';
import TransactionBanner from './TransactionBanner';
import DisputeHistory from './DisputeHistory';
import SalesHistory from './SalesHistory';
import PurchasesHistory from './PurchasesHistory';
import WalletHistory from './WalletHistory';
// import EscrowInviteReminder from './EscrowInviteReminder';
import EscrowCard from './EscrowCard';
import WithdrawalPinBanner from './CreateWithdrawalPin';
import CreateWithdrawalBank from './CreateWithdrawalBank';
import DisputeModal from './DisputeModal';
import { DisputePayload } from './disputeTypes';

function DashboardContainer() {
  const [cookie] = useCookies(['data']);
  const { accounts } = useAccountsContext();
  const { wallet } = accounts || {};
  const { identity } = accounts || {};
  const [isDisputeModalOpen, setIsDisputeModalOpen] = useState(false);
  const [selectedEscrowId, setSelectedEscrowId] = useState<string>('');

  const [stepDispute, setStepDispute] = useState<'reason' | 'phone' | 'bank' | 'success'>('reason');

  const isBuyer = cookie?.data?.activeRole === 'Buyer';

  const openDisputeModal = (id: string | number) => {
    setSelectedEscrowId(id.toString());
    setStepDispute("reason");
    setIsDisputeModalOpen(true);
  };

  const disputeMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      notification({
        title: "Success",
        message: "Dispute submitted successfully",
        type: "success"
      });
      setIsDisputeModalOpen(false);
      setStepDispute('success');
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Failed to submit dispute",
        type: "danger"
      });
    }
  });

  const handleDispute = (payload: DisputePayload) => {
    disputeMutation.mutate({
      service: "wallet-service/api/v1/",
      endpoint: `disputes`,
      multipart: true,
      method: "POST",
      body: payload
    });
  };
  return (
    <>
      <h3 className="text-lg mb-5">
        Hello&nbsp;
        <span className="font-bold">{identity?.businessDetail?.businessName || `${identity?.personalDetail?.firstName} ${identity?.personalDetail?.lastName}` || 'Guest User'}</span>
      </h3>
      <div className="flex w-[calc(100%+36px)] -m-5">
        <div className="w-full xl:w-[calc(100%-400px)] px-3 pt-3 pb-5">
          <div className="w-full mb-3 space-y-2">
            {!wallet?.hasPin && <WithdrawalPinBanner />}
            {!wallet?.hasWithdrawalBankAccount && <CreateWithdrawalBank />}
          </div>
          <div className="w-full mb-3 sm:flex sm:space-x-3 space-y-3 sm:space-y-0">
            {!isBuyer && <WalletCard />}
            <EscrowCard />
          </div>
          {!isBuyer && (
            <div className="w-full mb-3">
              <TransactionBanner />
            </div>
          )}
          <div className="w-full mb-3">
            {isBuyer ? <PurchasesHistory onOpenDispute={openDisputeModal}/> : <SalesHistory />}
          </div>
          <div className="w-full ">
            <WalletHistory />
          </div>
        </div>

        <div className="hidden xl:block fixed right-0 top-0 h-screen w-[400px] border-l pt-20">
          <div className="h-full flex flex-col">
            <div className="">
              <DisputeHistory />
            </div>
          </div>
        </div>

        <DisputeModal
          isOpen={isDisputeModalOpen}
          onClose={() => setIsDisputeModalOpen(false)}
          step={stepDispute}
          setStep={setStepDispute}
          escrowOrderId={selectedEscrowId}
          onDispute={handleDispute}
          isLoading={disputeMutation.isLoading}
        />
      </div>
    </>
  );
}

export default DashboardContainer;
