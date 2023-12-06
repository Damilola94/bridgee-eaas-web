import { ReactElement } from 'react';
import Head from 'next/head';

import Layout from '../components/wrappers/Layout';
import SettingsContainer from '../components/pages/settings/Container';

import type { NextPageWithLayout } from './_app';

const Settings: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Bridge by ALAT - Settings</title>
    </Head>

    <div className="w-full">
      <h2 className="font-bold ff-bold text-2xl mb-3">Settings</h2>

      <div className="w-full max-w-7xl mt-10">
        <SettingsContainer />
      </div>
    </div>

  </>
);

Settings.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Settings;
