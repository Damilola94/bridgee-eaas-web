import React, { useState, useEffect } from 'react';

import { useAccountsContext } from '../../../context/Accounts';

import ToggleInput from '../../inputs/Toggle';

import SetPINModal from './SetPINModal';

function SecurityToggles() {
  const { accounts } = useAccountsContext();

  const [showPinModal, setShowPinModal] = useState(false);
  const [isTransactionPinSet, setIsTransactionPinSet] = useState(false);

  useEffect(() => {
    const { defaultWallets: wallets } = accounts || {};
    setIsTransactionPinSet(wallets?.[0]?.isTransactionPinSet);
  }, [accounts]);

  return (
    <>
      <div className="w-full bg-white rounded-xl px-5 py-7 mb-5 shadow">
        <div className="w-full">
          <div className="flex">
            <div className="relative min-w-max mr-5">
              <ToggleInput value={isTransactionPinSet} onChange={setIsTransactionPinSet} />
              <button
                disabled={isTransactionPinSet}
                className="absolute top-0 right-0 w-[46px] h-[25px] bg-transparent"
                onClick={() => setShowPinModal(true)}
              />
            </div>

            <div className="w-full flex justify-between items-end">
              <div className="">
                <h4 className="text-sm font-bold">Pin Code</h4>
                <p className="text-xs text-lightText">Setup PIN for your transactions</p>
              </div>

              {isTransactionPinSet && (
                <div className="">
                  <button
                    className="text-bold text-primary"
                    onClick={() => setShowPinModal(true)}
                  >
                    Update
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showPinModal && (
        <SetPINModal onClose={() => setShowPinModal(false)} />
      )}
    </>
  );
}

export default SecurityToggles;
