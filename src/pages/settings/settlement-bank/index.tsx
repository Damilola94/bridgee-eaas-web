import type { ReactElement } from "react";
import Head from "next/head";

import Layout from "../../../components/wrappers/Layout";
import SettlementBankContainer from "../../../components/pages/settings/SettlementBankContainer";

import type { NextPageWithLayout } from "../../_app";

const Home: NextPageWithLayout = () => (
  <>
    <Head>
      <title>UseBridgee Inc. - Settlement Bank</title>
    </Head>

    <SettlementBankContainer />
  </>
);

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout pageName="Settings - Settlement Bank">{page}</Layout>;
};

export default Home;

