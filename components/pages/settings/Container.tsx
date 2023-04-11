import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import BankAccounts from './BankAccounts';
import BusinessDetails from './BusinessDetails';
import ProfileDetails from './ProfileDetails';
import SecuritySettings from './SecuritySettings';

import Tabs from './Tabs';

const options = [
  { title: 'Personal Details', tab: 'personal-details' },
  { title: 'Business Details', tab: 'business-details' },
  { title: 'Bank Accounts', tab: 'bank-accounts' },
  { title: 'Security Settings', tab: 'security-settings' }
];

function SettingsContainer() {
  const router = useRouter();
  const { tab } = router?.query || {};

  useEffect(() => {
    if (!router?.query?.tab) {
      router.push({ pathname: '/settings', query: { tab: 'personal-details' } });
    }
  }, [router, router?.query?.status]);

  return (
    <div className="w-full">
      <Tabs options={options} pathname="/settings" />

      {tab === 'personal-details' && <ProfileDetails />}
      {tab === 'business-details' && <BusinessDetails />}
      {tab === 'bank-accounts' && <BankAccounts />}
      {tab === 'security-settings' && <SecuritySettings />}
    </div>
  );
}

export default SettingsContainer;
