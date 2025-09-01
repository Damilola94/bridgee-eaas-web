import React from 'react';

import { useAccountsContext } from '../../../context/Accounts';

import WalletCard from './WalletCard';
import TransactionBanner from './TransactionBanner';
import DisputeHistory from './DisputeHistory';
import SalesHistory from './SalesHistory';
import WalletHistory from './WalletHistory';
// import EscrowInviteReminder from './EscrowInviteReminder';
import EscrowCard from './EscrowCard';
import WithdrawalPinBanner from './CreateWithdrawalPin';

function DashboardContainer() {
  const { accounts } = useAccountsContext();
  const { wallet } = accounts || {};
  const { identity } = accounts || {};

  return (
    <>
      {/* <EscrowInviteReminder /> */}
      <h3 className="text-lg mb-5">
        Hello&nbsp;
        <span className="font-bold">{identity?.businessDetail?.businessName || 'Guest User'}</span>
      </h3>
      <div className="flex w-[calc(100%+36px)] -m-5">
        <div className="w-full xl:w-[calc(100%-400px)] px-3 pt-3 pb-5">
          <div className="w-full mb-3">
            {!wallet?.hasPin && <WithdrawalPinBanner />}
          </div>
          <div className="w-full mb-3 sm:flex sm:space-x-3 space-y-3 sm:space-y-0">
            <WalletCard />
            <EscrowCard />
          </div>
          <div className="w-full mb-3">
            <TransactionBanner />
          </div>
          <div className="w-full mb-3">
            <WalletHistory />
          </div>
          <div className="w-full">
            <SalesHistory />
          </div>
        </div>

        <div className="hidden xl:block fixed right-0 top-0 h-screen w-[400px] border-l pt-20">
          <div className="h-full flex flex-col">
            <div className="">
              <DisputeHistory />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardContainer;
