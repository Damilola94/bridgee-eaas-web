import type { ReactElement } from "react";
import Head from "next/head";

import Layout from "../../../components/wrappers/Layout";
import ReleaseAuthorizer from "../../../components/pages/settings/ReleaseAuthorizerContainer";

import type { NextPageWithLayout } from "../../_app";

const Home: NextPageWithLayout = () => (
  <>
    <Head>
      <title>UseBridgee Inc. - Settlement Bank</title>
    </Head>

    <ReleaseAuthorizer />
  </>
);

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout pageName="Settings - Release Authorizer">{page}</Layout>;
};

export default Home;

